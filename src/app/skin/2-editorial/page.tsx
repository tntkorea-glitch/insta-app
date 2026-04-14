import Link from "next/link";

const articles = [
  {
    n: "01",
    label: "GROWTH",
    title: "알고리즘이 좋아하는 계정",
    body: "해시태그 타겟팅과 인간적인 행동 패턴을 결합해, 팔로워 증가율을 평균 3.4배로 끌어올립니다. 인스타그램이 '진짜 사용자'로 인식하는 자연스러운 활동만을 수행합니다.",
  },
  {
    n: "02",
    label: "AUTOMATION",
    title: "잠자는 동안에도 성장",
    body: "자동 팔로우·언팔·좋아요·AI 댓글. 네 가지 엔진이 24시간 맞물려 돌아갑니다. 당신이 해야 할 일은 타겟 해시태그를 입력하는 것뿐입니다.",
  },
  {
    n: "03",
    label: "INTELLIGENCE",
    title: "진짜 사람 같은 댓글",
    body: "GPT 기반 문맥 이해로 게시물 내용에 어울리는 댓글을 생성합니다. 복붙 스팸이 아닌, 진정성 있는 참여의 기록이 남습니다.",
  },
  {
    n: "04",
    label: "SAFETY",
    title: "차단 없는 작동 원칙",
    body: "랜덤 딜레이, 시간대별 활동 제한, 계정별 격리된 세션. 인스타그램의 스팸 감지 로직을 역분석해 만든 안전 프로파일로 계정을 보호합니다.",
  },
];

export default function EditorialSkin() {
  return (
    <main className="min-h-screen bg-[#faf7f2] text-stone-900" style={{ fontFamily: '"Noto Serif KR", "Apple SD Gothic Neo", serif' }}>
      {/* Masthead */}
      <header className="border-b-[3px] border-stone-900">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-xs tracking-[0.3em] text-stone-600">VOL. 01 · 2026 SPRING EDITION</p>
          <div className="flex items-center gap-4">
            <Link href="/skin" className="text-xs tracking-widest text-stone-600 hover:text-stone-900">← BACK</Link>
            <Link href="/dashboard" className="text-xs tracking-widest border-b-2 border-stone-900 pb-0.5">SUBSCRIBE</Link>
          </div>
        </div>
      </header>

      {/* Title block */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 border-b border-stone-300">
        <p className="text-xs tracking-[0.3em] text-stone-500 mb-4">A GUIDE TO</p>
        <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tight leading-[0.9] mb-8">
          Instagram,<br />
          <em className="italic text-red-700">automated.</em>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          <p className="md:col-span-2 text-lg text-stone-700 leading-relaxed max-w-2xl" style={{ columns: "2", columnGap: "2rem" }}>
            <span className="float-left text-6xl font-black leading-none mr-2 mt-1">팔</span>
            로우, 좋아요, 댓글. 인스타그램 성장을 위해 필요한 모든 반복 작업을 한 플랫폼이 대신합니다. 이 글은 왜 당신이 여전히 수동으로 하고 있는지에 대한 이야기입니다.
          </p>
          <div className="text-right">
            <Link href="/dashboard" className="inline-block text-sm tracking-widest border-2 border-stone-900 px-6 py-3 hover:bg-stone-900 hover:text-[#faf7f2] transition-colors">
              START READING →
            </Link>
          </div>
        </div>
      </section>

      {/* Numbered articles */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {articles.map((a, i) => (
          <article key={a.n} className={`grid grid-cols-1 md:grid-cols-12 gap-8 py-12 ${i !== 0 ? "border-t border-stone-300" : ""}`}>
            <div className="md:col-span-3">
              <p className="text-6xl font-black text-red-700 leading-none">{a.n}</p>
              <p className="text-xs tracking-[0.3em] text-stone-500 mt-3">{a.label}</p>
            </div>
            <div className="md:col-span-9">
              <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-4 max-w-2xl">{a.title}</h2>
              <p className="text-base text-stone-700 leading-relaxed max-w-2xl">{a.body}</p>
              <div className="mt-4 h-[3px] w-16 bg-red-700" />
            </div>
          </article>
        ))}
      </section>

      {/* Pricing as a table */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t-[3px] border-stone-900">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">Pricing.</h2>
          <p className="text-xs tracking-[0.3em] text-stone-500">CHOOSE YOUR EDITION</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-y-2 border-stone-900">
          {[
            { name: "Basic", price: "FREE", desc: "입문자를 위한 무료 에디션" },
            { name: "Pro", price: "₩49K", desc: "본격 성장을 위한 에디션", featured: true },
            { name: "Business", price: "₩99K", desc: "전문가를 위한 에디션" },
          ].map((p, i) => (
            <div key={p.name} className={`p-8 ${i !== 0 ? "md:border-l-2 border-stone-900" : ""} ${p.featured ? "bg-stone-900 text-[#faf7f2]" : ""}`}>
              <p className="text-xs tracking-[0.3em] opacity-60 mb-2">0{i + 1}</p>
              <h3 className="text-2xl font-black mb-1">{p.name}</h3>
              <p className="text-xs mb-6 opacity-70">{p.desc}</p>
              <p className="text-5xl font-black mb-6">{p.price}</p>
              <Link href="/dashboard" className={`block text-center text-sm tracking-widest border-2 py-3 transition-colors ${p.featured ? "border-[#faf7f2] hover:bg-[#faf7f2] hover:text-stone-900" : "border-stone-900 hover:bg-stone-900 hover:text-[#faf7f2]"}`}>
                SELECT →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Colophon / footer */}
      <footer className="border-t-[3px] border-stone-900 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs tracking-[0.3em] text-stone-500">INSTABOT PRO · VOL. 01 · PRINTED 2026</p>
          <p className="text-xs tracking-[0.3em] text-stone-500">Skin 02 — Editorial Magazine</p>
        </div>
      </footer>
    </main>
  );
}
