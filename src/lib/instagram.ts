import { IgApiClient, IgLoginTwoFactorRequiredError } from "instagram-private-api";

export interface InstaCredentials {
  username: string;
  password: string;
  proxy?: string;
}

export interface ActionResult {
  success: boolean;
  target: string;
  message?: string;
}

export class TwoFactorRequiredError extends Error {
  constructor(
    public readonly twoFactorIdentifier: string,
    public readonly totpOn: boolean
  ) {
    super("2FA required");
    this.name = "TwoFactorRequiredError";
  }
}

// Session cache to avoid re-login
const sessionCache = new Map<string, { client: IgApiClient; expiresAt: number }>();

// Pending 2FA challenges (short-lived, 10min)
const pendingTwoFactor = new Map<
  string,
  { client: IgApiClient; identifier: string; expiresAt: number }
>();

function getClient(proxy?: string): IgApiClient {
  const ig = new IgApiClient();
  if (proxy) {
    ig.state.proxyUrl = proxy;
  }
  return ig;
}

export async function login(creds: InstaCredentials): Promise<IgApiClient> {
  const cached = sessionCache.get(creds.username);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.client;
  }

  const ig = getClient(creds.proxy);
  ig.state.generateDevice(creds.username);

  try {
    await ig.account.login(creds.username, creds.password);
  } catch (e) {
    if (e instanceof IgLoginTwoFactorRequiredError) {
      const info = e.response.body.two_factor_info;
      pendingTwoFactor.set(creds.username, {
        client: ig,
        identifier: info.two_factor_identifier,
        expiresAt: Date.now() + 10 * 60 * 1000,
      });
      throw new TwoFactorRequiredError(
        info.two_factor_identifier,
        Boolean(info.totp_two_factor_on)
      );
    }
    throw e;
  }

  sessionCache.set(creds.username, {
    client: ig,
    expiresAt: Date.now() + 30 * 60 * 1000,
  });

  return ig;
}

export async function completeTwoFactorLogin(
  username: string,
  code: string
): Promise<IgApiClient> {
  const pending = pendingTwoFactor.get(username);
  if (!pending || pending.expiresAt < Date.now()) {
    pendingTwoFactor.delete(username);
    throw new Error("2FA 세션이 만료되었습니다. 다시 시도하세요.");
  }

  await pending.client.account.twoFactorLogin({
    username,
    verificationCode: code,
    twoFactorIdentifier: pending.identifier,
    verificationMethod: "1", // SMS by default; TOTP uses '0'
    trustThisDevice: "1",
  });

  pendingTwoFactor.delete(username);
  sessionCache.set(username, {
    client: pending.client,
    expiresAt: Date.now() + 30 * 60 * 1000,
  });
  return pending.client;
}

export async function followUser(ig: IgApiClient, targetUsername: string): Promise<ActionResult> {
  try {
    const userId = await ig.user.searchExact(targetUsername);
    await ig.friendship.create(userId.pk);
    return { success: true, target: targetUsername, message: "팔로우 성공" };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown error";
    return { success: false, target: targetUsername, message: msg };
  }
}

export async function unfollowUser(ig: IgApiClient, targetUsername: string): Promise<ActionResult> {
  try {
    const userId = await ig.user.searchExact(targetUsername);
    await ig.friendship.destroy(userId.pk);
    return { success: true, target: targetUsername, message: "언팔로우 성공" };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown error";
    return { success: false, target: targetUsername, message: msg };
  }
}

export async function likePost(ig: IgApiClient, mediaId: string): Promise<ActionResult> {
  try {
    await ig.media.like({ mediaId, moduleInfo: { module_name: "feed_timeline" } as never, d: 0 });
    return { success: true, target: mediaId, message: "좋아요 성공" };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown error";
    return { success: false, target: mediaId, message: msg };
  }
}

export async function commentPost(ig: IgApiClient, mediaId: string, text: string): Promise<ActionResult> {
  try {
    await ig.media.comment({ mediaId, text });
    return { success: true, target: mediaId, message: "댓글 성공" };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown error";
    return { success: false, target: mediaId, message: msg };
  }
}

export async function getFollowers(ig: IgApiClient, username: string, limit = 100): Promise<string[]> {
  const userId = await ig.user.searchExact(username);
  const followersFeed = ig.feed.accountFollowers(userId.pk);
  const followers: string[] = [];

  while (followers.length < limit) {
    const items = await followersFeed.items();
    for (const item of items) {
      followers.push(item.username);
      if (followers.length >= limit) break;
    }
    if (!followersFeed.isMoreAvailable()) break;
  }

  return followers;
}

export async function getHashtagFeed(ig: IgApiClient, hashtag: string, limit = 20) {
  const feed = ig.feed.tags(hashtag, "recent");
  const posts: { mediaId: string; username: string }[] = [];

  const items = await feed.items();
  for (const item of items) {
    posts.push({
      mediaId: item.id,
      username: item.user.username,
    });
    if (posts.length >= limit) break;
  }

  return posts;
}

export async function getAccountInfo(ig: IgApiClient, username: string) {
  const user = await ig.user.searchExact(username);
  const info = await ig.user.info(user.pk);
  return {
    followers: info.follower_count,
    following: info.following_count,
    posts: info.media_count,
  };
}

export function clearSession(username: string) {
  sessionCache.delete(username);
}
