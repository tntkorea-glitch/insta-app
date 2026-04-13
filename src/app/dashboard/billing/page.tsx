"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const plans = [
  {
    key: "FREE",
    name: "Free",
    price: "0",
    period: "",
    description: "시작하기에 딱 좋은 무료 플랜",
    features: ["계정 1개", "일일 100회 제한", "기본 분석"],
    cta: "현재 플랜",
    popular: false,
  },
  {
    key: "STARTER",
    name: "Starter",
    price: "19,900",
    period: "/월",
    description: "성장하는 크리에이터를 위한 플랜",
    features: ["계정 3개", "일일 500회 제한", "상세 분석", "스케줄 관리"],
    cta: "업그레이드",
    popular: false,
  },
  {
    key: "PRO",
    name: "Pro",
    price: "49,900",
    period: "/월",
    description: "전문가를 위한 올인원 솔루션",
    features: ["계정 10개", "일일 2,000회 제한", "프리미엄 분석", "우선 지원", "AI 댓글"],
    cta: "업그레이드",
    popular: true,
  },
  {
    key: "ENTERPRISE",
    name: "Enterprise",
    price: "99,900",
    period: "/월",
    description: "대규모 운영을 위한 엔터프라이즈",
    features: ["무제한 계정", "무제한 작업", "전용 프록시", "1:1 전담 지원", "커스텀 기능"],
    cta: "업그레이드",
    popular: false,
  },
];

export default function BillingPage() {
  const searchParams = useSearchParams();
  const [currentPlan, setCurrentPlan] = useState("FREE");
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (searchParams.get("success")) {
      setMessage("결제가 완료되었습니다! 플랜이 업그레이드되었습니다.");
    }
    if (searchParams.get("canceled")) {
      setMessage("결제가 취소되었습니다.");
    }

    // Fetch current plan
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        if (data.plan) setCurrentPlan(data.plan);
      })
      .catch(console.error);
  }, [searchParams]);

  const handleUpgrade = async (planKey: string) => {
    if (planKey === "FREE" || planKey === currentPlan) return;
    setLoading(planKey);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error("결제 오류:", e);
    } finally {
      setLoading(null);
    }
  };

  const handleManage = async () => {
    setLoading("manage");
    try {
      const res = await fetch("/api/billing/portal", {
        method: "POST",
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error("포탈 오류:", e);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">요금제</h1>
          <p className="text-sm text-gray-400 mt-1">
            필요에 맞는 플랜을 선택하세요
          </p>
        </div>
        {currentPlan !== "FREE" && (
          <button
            onClick={handleManage}
            disabled={loading === "manage"}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {loading === "manage" ? "로딩..." : "구독 관리"}
          </button>
        )}
      </div>

      {/* Message */}
      {message && (
        <div className={`border rounded-xl p-4 text-sm ${
          message.includes("완료")
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
            : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
        }`}>
          {message}
        </div>
      )}

      {/* Current Plan Info */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-400">현재 플랜</p>
            <p className="text-lg font-bold text-white">
              {plans.find((p) => p.key === currentPlan)?.name || currentPlan}
            </p>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => {
          const isCurrent = plan.key === currentPlan;
          return (
            <div
              key={plan.key}
              className={`relative bg-gray-800/50 border rounded-xl p-6 transition-all ${
                plan.popular
                  ? "border-indigo-500/50 ring-1 ring-indigo-500/20"
                  : "border-gray-700/50 hover:border-gray-600"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    인기
                  </span>
                </div>
              )}

              <h3 className="text-lg font-bold text-white">{plan.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{plan.description}</p>

              <div className="mt-4 mb-6">
                <span className="text-3xl font-bold text-white">{plan.price === "0" ? "무료" : `₩${plan.price}`}</span>
                {plan.period && <span className="text-sm text-gray-400">{plan.period}</span>}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.key)}
                disabled={isCurrent || loading === plan.key || plan.key === "FREE"}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isCurrent
                    ? "bg-gray-700 text-gray-400 cursor-default"
                    : plan.popular
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                } disabled:opacity-50`}
              >
                {loading === plan.key
                  ? "처리 중..."
                  : isCurrent
                  ? "현재 플랜"
                  : plan.key === "FREE"
                  ? "무료"
                  : plan.cta}
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">자주 묻는 질문</h2>
        <div className="space-y-4">
          {[
            { q: "언제든 플랜을 변경할 수 있나요?", a: "네, 언제든 업그레이드하거나 다운그레이드할 수 있습니다. 업그레이드 시 차액만 결제됩니다." },
            { q: "환불 정책은 어떻게 되나요?", a: "구독 시작 후 7일 이내 전액 환불이 가능합니다. 구독 관리에서 취소하실 수 있습니다." },
            { q: "결제 수단은 무엇이 있나요?", a: "신용카드, 체크카드를 지원합니다. Stripe을 통해 안전하게 처리됩니다." },
          ].map((item) => (
            <div key={item.q} className="border-b border-gray-700/50 pb-4 last:border-0 last:pb-0">
              <h3 className="text-sm font-medium text-white mb-1">{item.q}</h3>
              <p className="text-xs text-gray-400">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
