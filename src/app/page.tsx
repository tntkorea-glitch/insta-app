"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ─── SVG Icon Components ─── */
function IconFollow() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M19 8v6m3-3h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconComment() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 9h8M8 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconMulti() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconSchedule() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="10" fill="#d62976" fillOpacity="0.12" />
      <path d="M8 12l3 3 5-5" stroke="#d62976" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="10" fill="#2a0f2d" fillOpacity="0.08" />
      <path d="M9 9l6 6M15 9l-6 6" stroke="#7b5d6a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={`text-[#d62976] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Data ─── */
const features = [
  {
    icon: <IconFollow />,
    title: "자동 팔로우/언팔",
    desc: "타겟 해시태그 기반 자동 팔로우, 스마트 언팔로 최적의 팔로잉 비율을 유지합니다.",
    tint: "from-[#feda75] to-[#fa7e1e]",
  },
  {
    icon: <IconHeart />,
    title: "자동 좋아요",
    desc: "관심 태그 게시물에 자동으로 좋아요를 보내 자연스러운 노출을 확보합니다.",
    tint: "from-[#fa7e1e] to-[#d62976]",
  },
  {
    icon: <IconComment />,
    title: "자동 댓글",
    desc: "AI 기반 자연스러운 댓글을 자동 작성하여 진정성 있는 소통을 만들어냅니다.",
    tint: "from-[#d62976] to-[#962fbf]",
  },
  {
    icon: <IconMulti />,
    title: "다중 계정 관리",
    desc: "여러 인스타그램 계정을 하나의 대시보드에서 통합 관리할 수 있습니다.",
    tint: "from-[#962fbf] to-[#4f5bd5]",
  },
  {
    icon: <IconSchedule />,
    title: "스케줄링",
    desc: "시간대별 자동 실행과 랜덤 딜레이로 자연스러운 활동 패턴을 구현합니다.",
    tint: "from-[#4f5bd5] to-[#d62976]",
  },
  {
    icon: <IconChart />,
    title: "실시간 분석",
    desc: "팔로워 증감, 좋아요 통계 등을 실시간 대시보드에서 한눈에 확인합니다.",
    tint: "from-[#feda75] via-[#d62976] to-[#962fbf]",
  },
];

const comparisonRows = [
  "웹/모바일 지원",
  "AI 댓글",
  "실시간 대시보드",
  "멀티 디바이스",
  "자동 업데이트",
  "안전한 암호화",
];

const plans = [
  {
    name: "Basic",
    price: "무료",
    period: "",
    desc: "시작하기 좋은 무료 플랜",
    features: ["1개 계정", "일 50 좋아요", "일 20 팔로우", "기본 분석"],
    cta: "무료로 시작하기",
    popular: false,
  },
  {
    name: "Pro",
    price: "₩49,000",
    period: "/월",
    desc: "성장을 가속하는 프로 플랜",
    features: [
      "3개 계정",
      "무제한 좋아요",
      "무제한 팔로우",
      "자동 댓글",
      "스케줄링",
      "우선 지원",
    ],
    cta: "Pro 시작하기",
    popular: true,
  },
  {
    name: "Business",
    price: "₩99,000",
    period: "/월",
    desc: "대규모 운영을 위한 비즈니스 플랜",
    features: [
      "10개 계정",
      "모든 Pro 기능",
      "분석 대시보드",
      "전담 매니저",
      "API 접근",
      "우선 지원",
    ],
    cta: "Business 시작하기",
    popular: false,
  },
];

const faqs = [
  {
    q: "계정이 차단되지 않나요?",
    a: "InstaBot Pro는 인간과 유사한 활동 패턴과 안전한 속도 제한을 적용합니다. 랜덤 딜레이와 자연스러운 행동 시뮬레이션으로 계정 안전을 최우선으로 보장합니다.",
  },
  {
    q: "어떤 기기에서 사용할 수 있나요?",
    a: "웹 기반 서비스이므로 PC, 태블릿, 스마트폰 등 인터넷 브라우저가 있는 모든 기기에서 이용할 수 있습니다. 별도 프로그램 설치가 필요 없습니다.",
  },
  {
    q: "환불이 가능한가요?",
    a: "모든 유료 플랜은 7일 무료 체험이 포함되어 있습니다. 체험 기간 내 언제든 해지할 수 있으며, 결제 후에도 7일 이내 환불을 보장합니다.",
  },
];

/* ─── FAQ Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-2 border-[#2a0f2d]/8 rounded-2xl overflow-hidden bg-white hover:border-[#d62976]/40 hover:shadow-lg hover:shadow-pink-500/10 transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-base font-semibold text-[#2a0f2d] pr-4">{q}</span>
        <IconChevron open={open} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-6 pb-5 text-sm text-[#5a3b52] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* ━━━ Hero ━━━ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Warm background blobs */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#fff7ee] via-[#ffe9d6] to-[#ffd9e8]" />
          <div className="absolute top-[20%] left-[15%] w-[520px] h-[520px] rounded-full blur-[120px] opacity-60"
               style={{ background: "radial-gradient(circle, #feda75 0%, transparent 70%)" }} />
          <div className="absolute top-[30%] right-[10%] w-[480px] h-[480px] rounded-full blur-[130px] opacity-50"
               style={{ background: "radial-gradient(circle, #d62976 0%, transparent 70%)" }} />
          <div className="absolute bottom-[10%] left-[40%] w-[420px] h-[420px] rounded-full blur-[110px] opacity-40"
               style={{ background: "radial-gradient(circle, #962fbf 0%, transparent 70%)" }} />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-32">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur border border-[#d62976]/20 text-xs font-medium text-[#2a0f2d] mb-8 animate-fade-in-up shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#fa7e1e] to-[#d62976] animate-pulse" />
              현재 1,200+ 사용자가 성장 중
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 animate-fade-in-up">
              <span className="text-[#2a0f2d]">인스타그램 성장을</span>
              <br />
              <span className="insta-gradient-animated bg-clip-text text-transparent">
                자동화하세요
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#5a3b52] max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up">
              팔로우, 좋아요, 댓글을 AI가 자동으로 관리합니다.
              <br className="hidden sm:block" />
              더 이상 수동으로 시간을 낭비하지 마세요.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white insta-gradient rounded-full transition-all shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/50 hover:-translate-y-0.5"
              >
                무료로 시작하기
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href="#pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[#2a0f2d] bg-white hover:bg-white/80 border-2 border-[#2a0f2d]/10 hover:border-[#d62976]/40 rounded-full transition-all shadow-sm"
              >
                요금제 보기
              </a>
            </div>
          </div>
        </section>

        {/* ━━━ Features ━━━ */}
        <section id="features" className="py-24 sm:py-32 relative bg-[#fff7ee]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-bold insta-gradient-text tracking-widest uppercase mb-3">
                Features
              </p>
              <h2 className="text-3xl sm:text-5xl font-black text-[#2a0f2d] mb-4 tracking-tight">
                강력한 자동화 기능
              </h2>
              <p className="text-[#5a3b52] max-w-xl mx-auto text-lg">
                인스타그램 성장에 필요한 모든 것을 하나의 플랫폼에서 제공합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group relative p-7 rounded-3xl bg-white border-2 border-[#2a0f2d]/8 hover:border-[#d62976]/30 hover:shadow-xl hover:shadow-pink-500/15 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.tint} flex items-center justify-center mb-5 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#2a0f2d] mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[#5a3b52] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ Comparison ━━━ */}
        <section className="py-24 sm:py-32 relative overflow-hidden bg-gradient-to-b from-[#fff7ee] via-[#ffe9d6]/60 to-[#fff7ee]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <p className="text-sm font-bold insta-gradient-text tracking-widest uppercase mb-3">
                Comparison
              </p>
              <h2 className="text-3xl sm:text-5xl font-black text-[#2a0f2d] mb-4 tracking-tight">
                왜 InstaBot Pro인가요?
              </h2>
              <p className="text-[#5a3b52] max-w-xl mx-auto text-lg">
                경쟁사 대비 확실한 차별점을 확인하세요.
              </p>
            </div>

            <div className="rounded-3xl border-2 border-[#2a0f2d]/8 overflow-hidden bg-white shadow-xl shadow-pink-500/10">
              {/* Table header */}
              <div className="grid grid-cols-3 bg-[#fff7ee] border-b-2 border-[#2a0f2d]/8">
                <div className="px-6 py-4 text-sm font-bold text-[#2a0f2d]">
                  기능
                </div>
                <div className="px-6 py-4 text-sm font-bold text-[#7b5d6a] text-center">
                  경쟁사
                </div>
                <div className="px-6 py-4 text-sm font-bold text-center">
                  <span className="insta-gradient-text">InstaBot Pro</span>
                </div>
              </div>
              {/* Rows */}
              {comparisonRows.map((row, i) => (
                <div
                  key={row}
                  className={`grid grid-cols-3 ${
                    i !== comparisonRows.length - 1 ? "border-b border-[#2a0f2d]/8" : ""
                  }`}
                >
                  <div className="px-6 py-4 text-sm font-medium text-[#2a0f2d]">{row}</div>
                  <div className="px-6 py-4 flex items-center justify-center">
                    <IconX />
                  </div>
                  <div className="px-6 py-4 flex items-center justify-center">
                    <IconCheck />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ Pricing ━━━ */}
        <section id="pricing" className="py-24 sm:py-32 bg-[#fff7ee]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-bold insta-gradient-text tracking-widest uppercase mb-3">
                Pricing
              </p>
              <h2 className="text-3xl sm:text-5xl font-black text-[#2a0f2d] mb-4 tracking-tight">
                합리적인 요금제
              </h2>
              <p className="text-[#5a3b52] max-w-xl mx-auto text-lg">
                필요에 맞는 플랜을 선택하세요. 모든 유료 플랜은 7일 무료 체험이 포함됩니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl p-8 transition-all duration-300 ${
                    plan.popular
                      ? "bg-white border-[3px] border-transparent shadow-2xl shadow-pink-500/25 scale-[1.03] lg:scale-105"
                      : "bg-white border-2 border-[#2a0f2d]/8 hover:border-[#d62976]/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/10"
                  }`}
                  style={
                    plan.popular
                      ? {
                          backgroundImage:
                            "linear-gradient(white, white), linear-gradient(90deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
                          backgroundOrigin: "border-box",
                          backgroundClip: "padding-box, border-box",
                        }
                      : undefined
                  }
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full insta-gradient text-xs font-bold text-white shadow-md shadow-pink-500/40">
                      ✨ 가장 인기
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-[#2a0f2d] mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-[#7b5d6a] mb-6">{plan.desc}</p>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span className={`text-5xl font-black ${plan.popular ? "insta-gradient-text" : "text-[#2a0f2d]"}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-[#7b5d6a] font-medium">{plan.period}</span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5">
                        <IconCheck />
                        <span className="text-sm text-[#2a0f2d] font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/dashboard"
                    className={`block text-center py-3.5 rounded-full text-sm font-bold transition-all ${
                      plan.popular
                        ? "insta-gradient text-white shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/50 hover:-translate-y-0.5"
                        : "bg-[#fff7ee] text-[#2a0f2d] hover:bg-[#ffe9d6] border-2 border-[#2a0f2d]/10 hover:border-[#d62976]/30"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ FAQ ━━━ */}
        <section id="faq" className="py-24 sm:py-32 bg-gradient-to-b from-[#fff7ee] via-[#ffd9e8]/40 to-[#fff7ee]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-bold insta-gradient-text tracking-widest uppercase mb-3">
                FAQ
              </p>
              <h2 className="text-3xl sm:text-5xl font-black text-[#2a0f2d] mb-4 tracking-tight">
                자주 묻는 질문
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ CTA Bottom ━━━ */}
        <section id="contact" className="py-24 sm:py-32 bg-[#fff7ee]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative p-10 sm:p-16 rounded-[2.5rem] overflow-hidden insta-gradient-animated">
              <div className="absolute inset-[3px] rounded-[2.3rem] bg-white" />
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-5xl font-black text-[#2a0f2d] mb-4 tracking-tight">
                  지금 바로 <span className="insta-gradient-text">시작</span>하세요
                </h2>
                <p className="text-[#5a3b52] mb-8 max-w-lg mx-auto text-lg">
                  무료 플랜으로 InstaBot Pro의 모든 핵심 기능을 체험해보세요.
                  <br />
                  신용카드 없이 시작할 수 있습니다.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white insta-gradient rounded-full transition-all shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/50 hover:-translate-y-0.5"
                  >
                    무료로 시작하기
                  </Link>
                  <a
                    href="https://pf.kakao.com/_instabotpro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-[#2a0f2d] bg-[#fff7ee] hover:bg-[#ffe9d6] border-2 border-[#2a0f2d]/10 hover:border-[#d62976]/30 rounded-full transition-all"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#fa7e1e]">
                      <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67l-.96 3.56c-.08.31.27.56.54.38l4.24-2.82c.49.05 1 .08 1.52.08 5.52 0 10-3.58 10-7.87S17.52 3 12 3z" />
                    </svg>
                    카카오톡 상담
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
