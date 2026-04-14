import Link from "next/link";

export default function BentoSkin() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 text-slate-900 p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center text-white font-bold">I</div>
            <span className="font-bold tracking-tight">InstaBot Pro</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/skin" className="text-xs text-slate-500 hover:text-slate-900">← 스킨 비교</Link>
            <Link href="/dashboard" className="text-sm font-semibold px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-700">시작하기</Link>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[180px] gap-4">
          {/* Hero 2x2 */}
          <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-gradient-to-br from-pink-500 to-violet-600 opacity-40 blur-3xl" />
            <p className="text-xs uppercase tracking-widest text-slate-400 relative">Instagram Growth, Automated</p>
            <div className="relative">
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] mb-4">
                수동 작업은<br />끝났습니다.
              </h1>
              <p className="text-sm text-slate-300 mb-6 max-w-sm">팔로우·좋아요·댓글을 AI가 24시간 관리합니다.</p>
              <Link href="/dashboard" className="inline-flex items-center gap-2 px-5 py-3 bg-white text-slate-900 rounded-full text-sm font-bold hover:bg-slate-100">
                무료로 시작하기 →
              </Link>
            </div>
          </div>

          {/* Stat tile */}
          <div className="rounded-3xl bg-gradient-to-br from-pink-500 to-rose-500 text-white p-6 flex flex-col justify-between">
            <p className="text-xs uppercase tracking-wider opacity-80">평균 팔로워 증가</p>
            <p className="text-5xl font-black tracking-tight">+340%</p>
            <p className="text-xs opacity-80">30일 기준</p>
          </div>

          {/* Feature: Auto Follow */}
          <div className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between">
            <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 font-bold">F</div>
            <div>
              <p className="font-bold">자동 팔로우</p>
              <p className="text-xs text-slate-500">해시태그 타겟팅</p>
            </div>
          </div>

          {/* Feature: Auto Like */}
          <div className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between">
            <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">♥</div>
            <div>
              <p className="font-bold">자동 좋아요</p>
              <p className="text-xs text-slate-500">스마트 한도 제어</p>
            </div>
          </div>

          {/* AI Comment 2x1 */}
          <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/50 p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs uppercase tracking-wider text-emerald-700 font-bold">AI Comment · Live</p>
            </div>
            <p className="font-bold mb-2">진짜 사람이 쓴 것 같은 댓글</p>
            <div className="space-y-1.5 text-xs font-mono text-slate-600">
              <p>→ &quot;사진 톤 너무 좋네요 🙌&quot;</p>
              <p>→ &quot;이 카페 어디인가요? 가보고 싶어요&quot;</p>
              <p>→ &quot;피드 전체가 작품이에요 ✨&quot;</p>
            </div>
          </div>

          {/* Users tile */}
          <div className="rounded-3xl bg-slate-900 text-white p-6 flex flex-col justify-between">
            <div className="flex -space-x-2">
              {["#fda4af", "#c4b5fd", "#6ee7b7", "#fcd34d", "#93c5fd"].map((c) => (
                <div key={c} className="w-8 h-8 rounded-full border-2 border-slate-900" style={{ background: c }} />
              ))}
            </div>
            <div>
              <p className="text-2xl font-black">1,200+</p>
              <p className="text-xs text-slate-400">활성 사용자</p>
            </div>
          </div>

          {/* Pricing teaser 1x2 */}
          <div className="md:row-span-2 rounded-3xl bg-gradient-to-b from-violet-600 to-violet-800 text-white p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Pro Plan</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">₩49,000</span>
                <span className="text-xs opacity-70">/월</span>
              </div>
              <p className="text-xs opacity-80 mt-2">7일 무료 체험</p>
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>✓ 3개 계정</li>
              <li>✓ 무제한 좋아요</li>
              <li>✓ AI 댓글</li>
              <li>✓ 스케줄링</li>
            </ul>
            <Link href="/dashboard" className="block text-center text-sm font-bold bg-white text-violet-700 py-2.5 rounded-full hover:bg-violet-50">
              선택하기
            </Link>
          </div>

          {/* Schedule */}
          <div className="rounded-3xl bg-amber-50 border border-amber-200/50 p-6 flex flex-col justify-between">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">⏱</div>
            <div>
              <p className="font-bold">스케줄링</p>
              <p className="text-xs text-slate-500">시간대별 자동 실행</p>
            </div>
          </div>

          {/* Safety */}
          <div className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between">
            <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">🛡</div>
            <div>
              <p className="font-bold">안전 보장</p>
              <p className="text-xs text-slate-500">차단 없는 딜레이 알고리즘</p>
            </div>
          </div>

          {/* CTA 2x1 */}
          <div className="md:col-span-2 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white p-8 flex items-center justify-between">
            <div>
              <p className="text-2xl font-black tracking-tight">지금 시작하세요</p>
              <p className="text-xs opacity-90 mt-1">신용카드 없이, 무료 플랜으로</p>
            </div>
            <Link href="/dashboard" className="px-6 py-3 bg-white text-rose-600 rounded-full text-sm font-bold hover:bg-rose-50 shrink-0">
              시작 →
            </Link>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-6 text-center">Skin 01 — Bento Grid</p>
      </div>
    </main>
  );
}
