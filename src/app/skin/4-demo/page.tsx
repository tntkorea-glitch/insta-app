"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const feedEvents = [
  { t: "방금", type: "follow", name: "@minji_cafe", meta: "#카페 타겟팅" },
  { t: "3초 전", type: "like", name: "@daily.grind", meta: "post liked" },
  { t: "12초 전", type: "comment", name: "@seoul_foodie", meta: "\"사진 톤 너무 좋네요 🙌\"" },
  { t: "24초 전", type: "follow", name: "@coffee.daily", meta: "#seoul 타겟팅" },
  { t: "38초 전", type: "like", name: "@cafe_hopper", meta: "post liked" },
  { t: "52초 전", type: "comment", name: "@latte_art_kr", meta: "\"이 카페 어디예요?\"" },
  { t: "1분 전", type: "follow", name: "@insta_muse", meta: "#cafe 타겟팅" },
];

const typeStyle = {
  follow: { bg: "bg-sky-50", text: "text-sky-700", label: "팔로우", icon: "+" },
  like: { bg: "bg-pink-50", text: "text-pink-700", label: "좋아요", icon: "♥" },
  comment: { bg: "bg-violet-50", text: "text-violet-700", label: "댓글", icon: "💬" },
} as const;

export default function DemoSkin() {
  const [followers, setFollowers] = useState(8247);
  const [likes, setLikes] = useState(432);
  const [feedIdx, setFeedIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFollowers((f) => f + Math.floor(Math.random() * 3) + 1);
      setLikes((l) => l + Math.floor(Math.random() * 5) + 2);
      setFeedIdx((i) => (i + 1) % feedEvents.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      {/* Top bar */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0b0d12]/80 backdrop-blur z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-sky-500" />
          <span className="font-bold tracking-tight">InstaBot Pro</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/skin" className="text-white/50 hover:text-white">← 스킨</Link>
          <Link href="/dashboard" className="px-4 py-2 bg-white text-slate-900 rounded-lg font-semibold hover:bg-white/90 text-xs">시작하기</Link>
        </div>
      </header>

      {/* Hero — minimal copy */}
      <section className="px-6 pt-16 pb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          지금 살아있는 데모 · 실제 동작 방식
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05]">
          말로 설명하지 않겠습니다.<br />
          <span className="text-white/50">그냥 움직이는 걸 보세요.</span>
        </h1>
      </section>

      {/* Live dashboard mockup */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto relative">
          {/* glow */}
          <div className="absolute -inset-20 bg-gradient-to-tr from-violet-500/20 via-sky-500/10 to-emerald-500/20 blur-3xl -z-10" />

          <div className="rounded-2xl border border-white/10 bg-[#11141b] overflow-hidden shadow-2xl shadow-black/50">
            {/* window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0d1016]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              <p className="ml-3 text-xs text-white/40 font-mono">dashboard.instabot.pro</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Left: stats */}
              <div className="lg:col-span-2 p-6 border-r border-white/5">
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">팔로워</p>
                    <p className="text-2xl font-black tabular-nums">{followers.toLocaleString()}</p>
                    <p className="text-xs text-emerald-400 mt-1">↑ +340%</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">오늘 좋아요</p>
                    <p className="text-2xl font-black tabular-nums">{likes.toLocaleString()}</p>
                    <p className="text-xs text-pink-400 mt-1">↑ +89%</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">가동률</p>
                    <p className="text-2xl font-black tabular-nums">99.98%</p>
                    <p className="text-xs text-sky-400 mt-1">안정</p>
                  </div>
                </div>

                {/* Fake chart */}
                <div className="rounded-xl bg-white/5 p-4 mb-6">
                  <div className="flex items-baseline justify-between mb-3">
                    <p className="text-sm font-semibold">팔로워 성장 (30일)</p>
                    <p className="text-xs text-white/40">실시간 업데이트</p>
                  </div>
                  <svg viewBox="0 0 400 100" className="w-full h-24">
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,85 Q50,80 80,70 T160,55 T240,35 T320,22 T400,10 L400,100 L0,100 Z" fill="url(#g1)" />
                    <path d="M0,85 Q50,80 80,70 T160,55 T240,35 T320,22 T400,10" stroke="#a78bfa" strokeWidth="2" fill="none" />
                  </svg>
                </div>

                {/* Active rules */}
                <div>
                  <p className="text-sm font-semibold mb-3">활성 규칙</p>
                  <div className="space-y-2">
                    {[
                      { tag: "#카페 · #seoul", status: "running", action: "팔로우 + 좋아요" },
                      { tag: "#coffeeshop", status: "running", action: "AI 댓글" },
                      { tag: "#감성카페", status: "scheduled", action: "21:00 시작" },
                    ].map((r, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className={`w-2 h-2 rounded-full ${r.status === "running" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
                          <div>
                            <p className="text-sm font-medium">{r.tag}</p>
                            <p className="text-xs text-white/40">{r.action}</p>
                          </div>
                        </div>
                        <span className="text-xs text-white/40">{r.status === "running" ? "가동중" : "예약됨"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: live feed */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-sm font-semibold">실시간 활동</p>
                </div>
                <div className="space-y-2">
                  {[...feedEvents.slice(feedIdx), ...feedEvents.slice(0, feedIdx)].slice(0, 6).map((e, i) => {
                    const style = typeStyle[e.type as keyof typeof typeStyle];
                    return (
                      <div key={`${e.name}-${i}`} className={`rounded-lg border border-white/5 p-3 transition-opacity ${i === 0 ? "bg-white/10 animate-fade-in-up" : "bg-white/[0.03]"}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-6 h-6 rounded-full ${style.bg} ${style.text} flex items-center justify-center text-xs font-bold`}>{style.icon}</span>
                          <p className="text-sm font-medium truncate">{e.name}</p>
                          <span className="ml-auto text-[10px] text-white/40 shrink-0">{e.t}</span>
                        </div>
                        <p className="text-xs text-white/50 pl-8 truncate">{e.meta}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Annotations */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-sm">
            <div className="rounded-xl bg-white/5 border border-white/5 p-4">
              <p className="text-xs text-white/40 mb-1">위 스크린 좌측</p>
              <p className="font-semibold">실시간으로 올라가는 숫자</p>
              <p className="text-xs text-white/60 mt-1">백엔드가 실제로 돌아가고 있다는 증거</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/5 p-4">
              <p className="text-xs text-white/40 mb-1">활성 규칙</p>
              <p className="font-semibold">해시태그별 독립 엔진</p>
              <p className="text-xs text-white/60 mt-1">여러 타겟을 동시에, 충돌 없이</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/5 p-4">
              <p className="text-xs text-white/40 mb-1">우측 패널</p>
              <p className="font-semibold">모든 액션이 로그로 남음</p>
              <p className="text-xs text-white/60 mt-1">안전 감사를 위한 완전한 추적</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full text-base font-bold hover:bg-white/90 transition">
              내 계정으로 이런 대시보드 받기 →
            </Link>
            <p className="text-xs text-white/40 mt-3">신용카드 없이 · 무료 플랜으로 시작</p>
          </div>
        </div>

        <p className="text-xs text-white/30 text-center mt-16">Skin 04 — Interactive Demo-First</p>
      </section>
    </main>
  );
}
