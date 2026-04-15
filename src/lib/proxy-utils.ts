export interface ProxyRecord {
  protocol: string;
  host: string;
  port: number;
  username: string | null;
  password: string | null;
}

export function buildProxyUrl(p: ProxyRecord): string {
  const auth = p.username
    ? `${encodeURIComponent(p.username)}${p.password ? `:${encodeURIComponent(p.password)}` : ""}@`
    : "";
  return `${p.protocol}://${auth}${p.host}:${p.port}`;
}
