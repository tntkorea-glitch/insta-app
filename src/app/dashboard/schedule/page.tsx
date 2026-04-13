"use client";

import { useState, useEffect, useCallback } from "react";

const days = ["월", "화", "수", "목", "금", "토", "일"];
const dayKeys = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const hours = Array.from({ length: 24 }, (_, i) => i);

const defaultSchedule: Record<string, Record<number, boolean>> = {
  월: {}, 화: {}, 수: {}, 목: {}, 금: {}, 토: {}, 일: {},
};

const defaultIntervals = [
  { id: "follow", label: "팔로우", interval: 30, unit: "초", color: "bg-blue-500" },
  { id: "unfollow", label: "언팔로우", interval: 45, unit: "초", color: "bg-orange-500" },
  { id: "like", label: "좋아요", interval: 15, unit: "초", color: "bg-pink-500" },
  { id: "comment", label: "댓글", interval: 60, unit: "초", color: "bg-emerald-500" },
];

// API 형식(mon: [0,1,0...]) → UI 형식(월: {9: true, ...})
function apiToUi(apiSchedule: Record<string, number[]>): Record<string, Record<number, boolean>> {
  const result: Record<string, Record<number, boolean>> = {};
  dayKeys.forEach((key, i) => {
    const arr = apiSchedule[key] || Array(24).fill(0);
    const dayMap: Record<number, boolean> = {};
    arr.forEach((v, h) => { if (v) dayMap[h] = true; });
    result[days[i]] = dayMap;
  });
  return result;
}

// UI 형식 → API 형식
function uiToApi(uiSchedule: Record<string, Record<number, boolean>>): Record<string, number[]> {
  const result: Record<string, number[]> = {};
  days.forEach((day, i) => {
    result[dayKeys[i]] = hours.map((h) => (uiSchedule[day]?.[h] ? 1 : 0));
  });
  return result;
}

export default function SchedulePage() {
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [intervals, setIntervals] = useState(defaultIntervals);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchSchedule = useCallback(async () => {
    try {
      const res = await fetch("/api/schedule");
      if (res.ok) {
        const data = await res.json();
        if (data.schedule) setSchedule(apiToUi(data.schedule));
        if (data.tasks && Array.isArray(data.tasks) && data.tasks.length > 0) {
          setIntervals(data.tasks);
        }
      }
    } catch (e) {
      console.error("스케줄 로드 실패:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSchedule(); }, [fetchSchedule]);

  const saveSchedule = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/schedule", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schedule: uiToApi(schedule),
          tasks: intervals,
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (e) {
      console.error("스케줄 저장 실패:", e);
    } finally {
      setSaving(false);
    }
  };

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

  const applyPreset = (preset: "weekday" | "evening" | "allday") => {
    const newSchedule: Record<string, Record<number, boolean>> = {};
    days.forEach((day, i) => {
      const map: Record<number, boolean> = {};
      if (preset === "weekday" && i < 5) {
        for (let h = 9; h <= 17; h++) map[h] = true;
      } else if (preset === "evening") {
        for (let h = 18; h <= 22; h++) map[h] = true;
      } else if (preset === "allday") {
        for (let h = 0; h < 24; h++) map[h] = true;
      }
      newSchedule[day] = map;
    });
    setSchedule(newSchedule);
  };

  const activeHoursCount = Object.values(schedule).reduce(
    (acc, daySchedule) => acc + Object.keys(daySchedule).length,
    0
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
        <button
          onClick={saveSchedule}
          disabled={saving}
          className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            saved
              ? "bg-emerald-600 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          } disabled:opacity-50`}
        >
          {saving ? "저장 중..." : saved ? "저장 완료!" : "스케줄 저장"}
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
          <button
            onClick={() => applyPreset("weekday")}
            className="bg-gray-900/50 border border-gray-700/30 hover:border-indigo-500/30 rounded-xl p-4 text-left transition-all"
          >
            <h3 className="text-sm font-semibold text-white mb-1">주간 근무형</h3>
            <p className="text-xs text-gray-500">월~금 09:00-18:00</p>
          </button>
          <button
            onClick={() => applyPreset("evening")}
            className="bg-gray-900/50 border border-gray-700/30 hover:border-indigo-500/30 rounded-xl p-4 text-left transition-all"
          >
            <h3 className="text-sm font-semibold text-white mb-1">저녁 집중형</h3>
            <p className="text-xs text-gray-500">매일 18:00-23:00</p>
          </button>
          <button
            onClick={() => applyPreset("allday")}
            className="bg-gray-900/50 border border-gray-700/30 hover:border-indigo-500/30 rounded-xl p-4 text-left transition-all"
          >
            <h3 className="text-sm font-semibold text-white mb-1">24시간 자동</h3>
            <p className="text-xs text-gray-500">매일 전 시간대 (권장하지 않음)</p>
          </button>
        </div>
      </div>
    </div>
  );
}
