import Link from "next/link";

const footerLinks = {
  서비스: [
    { label: "기능 소개", href: "#features" },
    { label: "요금제", href: "#pricing" },
    { label: "자주 묻는 질문", href: "#faq" },
    { label: "업데이트 노트", href: "/updates" },
  ],
  고객지원: [
    { label: "카카오톡 상담", href: "https://pf.kakao.com/_instabotpro" },
    { label: "이메일 문의", href: "mailto:support@instabotpro.com" },
    { label: "사용 가이드", href: "/guide" },
    { label: "API 문서", href: "/docs" },
  ],
  법적고지: [
    { label: "이용약관", href: "/terms" },
    { label: "개인정보처리방침", href: "/privacy" },
    { label: "환불 정책", href: "/refund" },
    { label: "서비스 수준 계약", href: "/sla" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#2a0f2d] text-white relative overflow-hidden">
      {/* Top gradient bar */}
      <div className="h-1 insta-gradient" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl insta-gradient flex items-center justify-center shadow-md shadow-pink-500/40">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2.2" />
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2.2" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">
                InstaBot <span className="insta-gradient-text">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              인스타그램 성장을 자동화하는
              <br />
              가장 스마트한 방법
            </p>
            {/* SNS Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://pf.kakao.com/_instabotpro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-[#feda75] hover:to-[#fa7e1e] flex items-center justify-center text-white transition-all hover:scale-110"
                aria-label="카카오톡"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67l-.96 3.56c-.08.31.27.56.54.38l4.24-2.82c.49.05 1 .08 1.52.08 5.52 0 10-3.58 10-7.87S17.52 3 12 3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/instabotpro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:insta-gradient flex items-center justify-center text-white transition-all hover:scale-110"
                aria-label="인스타그램"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@instabotpro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 flex items-center justify-center text-white transition-all hover:scale-110"
                aria-label="유튜브"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.58 7.19a2.51 2.51 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42A2.51 2.51 0 0 0 2.42 7.19 26.38 26.38 0 0 0 2 12a26.38 26.38 0 0 0 .42 4.81 2.51 2.51 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.51 2.51 0 0 0 1.77-1.77A26.38 26.38 0 0 0 22 12a26.38 26.38 0 0 0-.42-4.81zM10 15V9l5.2 3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-[#feda75] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} InstaBot Pro. All rights reserved.
          </p>
          <p className="text-xs text-white/50">
            인스타봇 프로는 Instagram과 제휴 관계가 아닙니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
