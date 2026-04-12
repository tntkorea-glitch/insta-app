"use client";

import { useState } from "react";

const days = ["월", "화", "수", "목", "금", "토", "일"];
const hours = Array.from({ length: 24 }, (_, i) => i);

// Pre-defined schedule: true = active
const initialSchedule: Record<string, Record<number, boolean>> = {
  월: { 9: true, 10: true, 11: true, 12: true, 14: true, 15: true, 16: true, 18: true, 19: true, 20: true, 21: true },
  화: { 9: true, 10: true, 11: true, 13: true, 14: true, 15: true, 18: true, 19: true, 20: true },
  수: { 10: true, 11: true, 12: true, 14: true, 15: true, 16: true, 17: true, 19: true, 20: true, 21: true },
  목: { 9: true, 10: true, 11: true, 12: true, 14: true, 15: true, 18: true, 19: true, 20: true },
  금: { 10: true, 11: true, 12: true, 13: true, 14: true, 15: true, 16: true, 19: true, 20: true, 21: true },
  토: { 11: true, 12: true, 13: true, 14: true, 15: true, 16: true, 17: true, 18: true, 19: true, 20: true, 21: true, 22: true },
  일: { 12: true, 13: true, 14: true, 15: true, 16: true, 17: true, 18: true, 19: true, 20: true },
};

const taskIntervals = [
  { id: "follow", label: "팔로우", interval: 30, unit: "초", color: "bg-blue-500" },
  { id: "unfollow", label: "언팔로우", interval: 45, unit: "초", color: "bg-orange-500" },
  { id: "like", label: "좋아요", interval: 15, unit: "초", color: "bg-pink-500" },
  { id: "comment", label: "댓글", interval: 60, unit: "초", color: "bg-emerald-500" },
];

export default function SchedulePage() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [intervals, setIntervals] = useState(taskIntervals);

  const toggleCell = (day: string, hour: number) => {
    setSchedule((prev) => {
      const daySchedule = { ...prev[day] };
      if (daySchedule[hour]) {
        delete daySchedule[hour];
      } else {
        daySchedule[hour] = true;
      }
      return { ...prev, [day]: daySchedule };
    });
  };

  const updateInterval = (id: string, value: number) => {
    setIntervals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, interval: value } : item))
    );
  };

  const activeHoursCount = Object.values(schedule).reduce(
    (acc, daySchedule) => acc + Object.keys(daySchedule).length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">스케줄 관리</h1>
          <p className="text-sm text-gray-400 mt-1">
            자동화 작업이 실행될 시간대를 설정하세요
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
          스케줄 저장
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <p className="text-sm text-gray-400">활성 시간대</p>
          <p className="text-2xl font-bold text-indigo-400 mt-1">{activeHoursCount}시간</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <p className="text-sm text-gray-400">일 평균 작업시간</p>
          <p className="text-2xl font-bold text-white mt-1">{Math.round(activeHoursCount / 7)}시간</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <p className="text-sm text-gray-400">다음 작업 시작</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">09:00</p>
        </div>
      </div>

      {/* Weekly Schedule Grid */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 overflow-x-auto">
        <h2 className="text-lg font-semibold text-white mb-4">주간 스케줄</h2>
        <div className="min-w-[800px]">
          {/* Header row */}
          <div className="flex gap-1 mb-1">
            <div className="w-10 shrink-0" />
            {hours.map((h) => (
              <div key={h} className="flex-1 text-center text-[10px] text-gray-500">
                {h.toString().padStart(2, "0")}
              </div>
            ))}
          </div>

          {/* Grid rows */}
          {days.map((day) => (
            <div key={day} className="flex gap-1 mb-1">
              <div className="w-10 shrink-0 flex items-center justify-center text-xs font-medium text-gray-400">
                {day}
              </div>
              {hours.map((h) => {
                const isActive = schedule[day]?.[h] || false;
                return (
                  <button
                    key={h}
                    onClick={() => toggleCell(day, h)}
                    className={`flex-1 h-8 rounded transition-all ${
                      isActive
                        ? "bg-indigo-600/60 hover:bg-indigo-600/80 border border-indigo-500/30"
                        : "bg-gray-900/50 hover:bg-gray-700/50 border border-gray-700/30"
                    }`}
                    title={`${day} ${h.toString().padStart(2, "0")}:00 - ${(h + 1).toString().padStart(2, "0")}:00`}
                  />
                );
              })}
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-700/50">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-indigo-600/60 border border-indigo-500/30" />
              <span className="text-xs text-gray-400">활성</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-900/50 border border-gray-700/30" />
              <span className="text-xs text-gray-400">비활성</span>
            </div>
            <span className="text-xs text-gray-500 ml-auto">
              셀을 클릭하여 활성/비활성을 전환하세요
            </span>
          </div>
        </div>
      </div>

      {/* Task Intervals */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-white mb-4">작업 주기 설정</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {intervals.map((task) => (
            <div
              key={task.id}
              className="bg-gray-900/50 border border-gray-700/30 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2.5 h-2.5 rounded-full ${task.color}`} />
                <span className="text-sm font-medium text-white">{task.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={5}
                  max={120}
                  value={task.interval}
                  onChange={(e) => updateInterval(task.id, Number(e.target.value))}
                  className="flex-1 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((task.interval - 5) / 115) * 100}%, #374151 ${((task.interval - 5) / 115) * 100}%, #374151 100%)`,
                  }}
                />
                <span className="text-sm font-medium text-indigo-400 w-12 text-right">
                  {task.interval}{task.unit}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                약 {Math.round(3600 / task.interval)}회/시간
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick presets */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-white mb-4">빠른 프리셋</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button className="bg-gray-900/50 border border-gray-700/30 hover:border-indigo-500/30 rounded-xl p-4 text-left transition-all">
            <h3 className="text-sm font-semibold text-white mb-1">주간 근무형</h3>
            <p className="text-xs text-gray-500">월~금 09:00-18:00</p>
          </button>
          <button className="bg-gray-900/50 border border-gray-700/30 hover:border-indigo-500/30 rounded-xl p-4 text-left transition-all">
            <h3 className="text-sm font-semibold text-white mb-1">저녁 집중형</h3>
            <p className="text-xs text-gray-500">매일 18:00-23:00</p>
          </button>
          <button className="bg-gray-900/50 border border-gray-700/30 hover:border-indigo-500/30 rounded-xl p-4 text-left transition-all">
            <h3 className="text-sm font-semibold text-white mb-1">24시간 자동</h3>
            <p className="text-xs text-gray-500">매일 전 시간대 (권장하지 않음)</p>
          </button>
        </div>
      </div>
    </div>
  );
}
