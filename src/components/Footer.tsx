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
    <footer className="bg-[#060609] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                InstaBot Pro
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed mb-6">
              인스타그램 성장을 자동화하는
              <br />
              가장 스마트한 방법
            </p>
            {/* SNS Links */}
            <div className="flex items-center gap-3">
              {/* Kakao */}
              <a
                href="https://pf.kakao.com/_instabotpro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-yellow-400 transition-colors"
                aria-label="카카오톡"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67l-.96 3.56c-.08.31.27.56.54.38l4.24-2.82c.49.05 1 .08 1.52.08 5.52 0 10-3.58 10-7.87S17.52 3 12 3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/instabotpro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-pink-400 transition-colors"
                aria-label="인스타그램"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com/@instabotpro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-red-400 transition-colors"
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
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
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
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} InstaBot Pro. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            인스타봇 프로는 Instagram과 제휴 관계가 아닙니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
