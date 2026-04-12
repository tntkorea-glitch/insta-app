"use client";

import { useState } from "react";

const followerTrend = [
  { date: "4/6", followers: 12102, gained: 45, lost: 12 },
  { date: "4/7", followers: 12235, gained: 78, lost: 23 },
  { date: "4/8", followers: 12389, gained: 92, lost: 15 },
  { date: "4/9", followers: 12510, gained: 65, lost: 18 },
  { date: "4/10", followers: 12623, gained: 83, lost: 21 },
  { date: "4/11", followers: 12741, gained: 71, lost: 14 },
  { date: "4/12", followers: 12847, gained: 89, lost: 17 },
];

const topHashtags = [
  { tag: "#맞팔", posts: 156, engagement: 4.2 },
  { tag: "#소통", posts: 143, engagement: 3.8 },
  { tag: "#선팔", posts: 128, engagement: 3.5 },
  { tag: "#뷰티", posts: 97, engagement: 5.1 },
  { tag: "#데일리", posts: 89, engagement: 2.9 },
  { tag: "#셀피", posts: 76, engagement: 4.7 },
  { tag: "#맛집", posts: 68, engagement: 3.2 },
  { tag: "#카페", posts: 54, engagement: 3.9 },
  { tag: "#ootd", posts: 48, engagement: 4.5 },
  { tag: "#일상", posts: 42, engagement: 2.4 },
];

const bestTimes = [
  { hour: "07-09", score: 35 },
  { hour: "09-11", score: 62 },
  { hour: "11-13", score: 78 },
  { hour: "13-15", score: 55 },
  { hour: "15-17", score: 48 },
  { hour: "17-19", score: 72 },
  { hour: "19-21", score: 95 },
  { hour: "21-23", score: 88 },
  { hour: "23-01", score: 42 },
];

const accountPerformance = [
  {
    name: "@beauty_shop_kr",
    followers: 5243,
    followRate: 82,
    likeRate: 95,
    commentRate: 71,
    growth: "+3.2%",
  },
  {
    name: "@daily_fashion_2024",
    followers: 4102,
    followRate: 76,
    likeRate: 88,
    commentRate: 65,
    growth: "+2.8%",
  },
  {
    name: "@food_lover_seoul",
    followers: 3502,
    followRate: 45,
    likeRate: 60,
    commentRate: 38,
    growth: "+1.1%",
  },
];

const likeCommentStats = [
  { date: "4/6", likes: 280, comments: 42 },
  { date: "4/7", likes: 315, comments: 48 },
  { date: "4/8", likes: 298, comments: 55 },
  { date: "4/9", likes: 340, comments: 38 },
  { date: "4/10", likes: 305, comments: 61 },
  { date: "4/11", likes: 362, comments: 52 },
  { date: "4/12", likes: 342, comments: 56 },
];

export default function AnalyticsPage() {
  const [period] = useState("7일");
  const maxFollower = Math.max(...followerTrend.map((d) => d.followers));
  const minFollower = Math.min(...followerTrend.map((d) => d.followers));
  const maxLikeComment = Math.max(
    ...likeCommentStats.map((d) => Math.max(d.likes, d.comments))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">분석</h1>
          <p className="text-sm text-gray-400 mt-1">
            자동화 성과를 분석하고 최적화하세요
          </p>
        </div>
        <div className="flex items-center gap-2">
          {["7일", "30일", "90일"].map((p) => (
            <button
              key={p}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                period === p
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <p className="text-xs text-gray-400">주간 팔로워 증가</p>
          <p className="text-xl font-bold text-emerald-400 mt-1">+745</p>
          <p className="text-xs text-gray-500 mt-1">일 평균 +106</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <p className="text-xs text-gray-400">주간 좋아요</p>
          <p className="text-xl font-bold text-pink-400 mt-1">2,242</p>
          <p className="text-xs text-gray-500 mt-1">일 평균 320</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <p className="text-xs text-gray-400">주간 댓글</p>
          <p className="text-xl font-bold text-indigo-400 mt-1">352</p>
          <p className="text-xs text-gray-500 mt-1">일 평균 50</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <p className="text-xs text-gray-400">팔로우백 비율</p>
          <p className="text-xl font-bold text-purple-400 mt-1">68%</p>
          <p className="text-xs text-gray-500 mt-1">업계 평균 대비 +15%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Follower Trend */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">팔로워 증감 추이</h2>
          <div className="flex items-end gap-2 h-48">
            {followerTrend.map((d) => {
              const height = ((d.followers - minFollower) / (maxFollower - minFollower)) * 80 + 20;
              return (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-emerald-400">+{d.gained}</span>
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-lg transition-all hover:from-indigo-500 hover:to-purple-400 relative group"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 px-2 py-1 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {d.followers.toLocaleString()}
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500">{d.date}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Like/Comment Stats */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">좋아요 / 댓글 통계</h2>
          <div className="flex items-end gap-2 h-48">
            {likeCommentStats.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5 items-end" style={{ height: "100%" }}>
                  <div
                    className="flex-1 bg-gradient-to-t from-pink-600 to-pink-400 rounded-t-sm"
                    style={{ height: `${(d.likes / maxLikeComment) * 100}%` }}
                  />
                  <div
                    className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm"
                    style={{ height: `${(d.comments / maxLikeComment) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-500">{d.date}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-700/50">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-pink-500" />
              <span className="text-xs text-gray-400">좋아요</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
              <span className="text-xs text-gray-400">댓글</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Hashtags */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">최고 성과 해시태그 TOP 10</h2>
          <div className="space-y-3">
            {topHashtags.map((h, i) => (
              <div key={h.tag} className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    i < 3
                      ? "bg-indigo-600/30 text-indigo-400"
                      : "bg-gray-700/50 text-gray-500"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-sm text-white font-medium w-24">{h.tag}</span>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${(h.posts / topHashtags[0].posts) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-16 text-right">{h.posts}회</span>
                <span className="text-xs text-emerald-400 w-12 text-right">{h.engagement}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Times */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">최적 활동 시간대</h2>
          <div className="space-y-3">
            {bestTimes.map((t) => (
              <div key={t.hour} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-14">{t.hour}</span>
                <div className="flex-1 bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      t.score >= 80
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                        : t.score >= 60
                        ? "bg-gradient-to-r from-indigo-500 to-indigo-400"
                        : t.score >= 40
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                        : "bg-gradient-to-r from-gray-600 to-gray-500"
                    }`}
                    style={{ width: `${t.score}%` }}
                  />
                </div>
                <span
                  className={`text-xs font-medium w-8 text-right ${
                    t.score >= 80
                      ? "text-emerald-400"
                      : t.score >= 60
                      ? "text-indigo-400"
                      : "text-gray-400"
                  }`}
                >
                  {t.score}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-700/50">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-gray-400">최적</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-indigo-500" />
              <span className="text-xs text-gray-400">좋음</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-xs text-gray-400">보통</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-gray-600" />
              <span className="text-xs text-gray-400">낮음</span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Performance Comparison */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-white mb-4">계정별 성과 비교</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-700">
                <th className="pb-3 pr-4">계정</th>
                <th className="pb-3 pr-4">팔로워</th>
                <th className="pb-3 pr-4">팔로우 성공률</th>
                <th className="pb-3 pr-4">좋아요 성공률</th>
                <th className="pb-3 pr-4">댓글 성공률</th>
                <th className="pb-3">주간 성장</th>
              </tr>
            </thead>
            <tbody>
              {accountPerformance.map((acc) => (
                <tr key={acc.name} className="border-b border-gray-700/50">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                        {acc.name.charAt(1).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-white">{acc.name}</span>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-sm text-gray-300">
                    {acc.followers.toLocaleString()}
                  </td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${acc.followRate}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{acc.followRate}%</span>
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-pink-500 h-1.5 rounded-full"
                          style={{ width: `${acc.likeRate}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{acc.likeRate}%</span>
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full"
                          style={{ width: `${acc.commentRate}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{acc.commentRate}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-sm font-medium text-emerald-400">{acc.growth}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
