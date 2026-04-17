"use client";

import { useState, useEffect, useCallback } from "react";

interface Proxy {
  id: string;
  label: string;
  protocol: string;
  host: string;
  port: number;
  username: string | null;
  active: boolean;
  accounts: { id: string; username: string }[];
}

interface NotificationPref {
  emailEnabled: boolean;
  notifyOnError: boolean;
  notifyOnSuccess: boolean;
  notifyDailyReport: boolean;
}

export default function SettingsPage() {
  const [proxies, setProxies] = useState<Proxy[]>([]);
  const [pref, setPref] = useState<NotificationPref | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    label: "",
    protocol: "http",
    host: "",
    port: "",
    username: "",
    password: "",
  });
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [testingProxyId, setTestingProxyId] = useState<string | null>(null);
  const [proxyTestResults, setProxyTestResults] = useState<Record<string, { ok: boolean; text: string }>>({});

  const fetchAll = useCallback(async () => {
    try {
      const [pRes, nRes] = await Promise.all([
        fetch("/api/proxies"),
        fetch("/api/notifications"),
      ]);
      if (pRes.ok) setProxies(await pRes.json());
      if (nRes.ok) setPref(await nRes.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const resetForm = () => {
    setForm({ label: "", protocol: "http", host: "", port: "", username: "", password: "" });
    setEditingId(null);
    setError("");
  };

  const openAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (p: Proxy) => {
    setForm({
      label: p.label,
      protocol: p.protocol,
      host: p.host,
      port: String(p.port),
      username: p.username || "",
      password: "",
    });
    setEditingId(p.id);
    setError("");
    setShowModal(true);
  };

  const saveProxy = async () => {
    if (!form.label || !form.host || !form.port) {
      setError("이름, 호스트, 포트는 필수입니다");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { id: editingId, ...form, port: Number(form.port) } : { ...form, port: Number(form.port) };
      const res = await fetch("/api/proxies", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "저장 실패");
        return;
      }
      setShowModal(false);
      resetForm();
      await fetchAll();
    } finally {
      setSaving(false);
    }
  };

  const deleteProxy = async (id: string) => {
    if (!confirm("이 프록시를 삭제하시겠습니까?")) return;
    await fetch(`/api/proxies?id=${id}`, { method: "DELETE" });
    setProxies((prev) => prev.filter((p) => p.id !== id));
  };

  const testProxy = async (p: Proxy) => {
    setTestingProxyId(p.id);
    setProxyTestResults((prev) => {
      const next = { ...prev };
      delete next[p.id];
      return next;
    });
    try {
      const res = await fetch(`/api/proxies/${p.id}/test`, { method: "POST" });
      const data = await res.json();
      setProxyTestResults((prev) => ({
        ...prev,
        [p.id]: { ok: !!data.success, text: data.message || (data.success ? "성공" : "실패") },
      }));
    } catch (e) {
      setProxyTestResults((prev) => ({
        ...prev,
        [p.id]: { ok: false, text: e instanceof Error ? e.message : "요청 실패" },
      }));
    } finally {
      setTestingProxyId(null);
    }
  };

  const toggleProxy = async (p: Proxy) => {
    await fetch("/api/proxies", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: p.id, active: !p.active }),
    });
    setProxies((prev) => prev.map((x) => (x.id === p.id ? { ...x, active: !x.active } : x)));
  };

  const updatePref = async (updates: Partial<NotificationPref>) => {
    if (!pref) return;
    const next = { ...pref, ...updates };
    setPref(next);
    await fetch("/api/notifications", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
  };

  const sendTest = async () => {
    setTesting(true);
    setMessage("");
    try {
      const res = await fetch("/api/notifications", { method: "POST" });
      const data = await res.json();
      if (res.ok) setMessage("테스트 이메일을 전송했습니다");
      else setMessage(`전송 실패: ${data.error}`);
    } finally {
      setTesting(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">설정</h1>
        <p className="text-sm text-gray-400 mt-1">프록시, 알림 등 고급 설정을 관리하세요</p>
      </div>

      {/* Proxy Management */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">프록시</h2>
            <p className="text-xs text-gray-400 mt-1">
              계정별로 프록시를 지정하여 IP 분산과 차단 회피를 할 수 있습니다
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            프록시 추가
          </button>
        </div>

        {proxies.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-sm">
            등록된 프록시가 없습니다
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-700">
                  <th className="pb-3 pr-4">이름</th>
                  <th className="pb-3 pr-4">주소</th>
                  <th className="pb-3 pr-4">프로토콜</th>
                  <th className="pb-3 pr-4">연결된 계정</th>
                  <th className="pb-3 pr-4">활성</th>
                  <th className="pb-3">액션</th>
                </tr>
              </thead>
              <tbody>
                {proxies.map((p) => (
                  <tr key={p.id} className="border-b border-gray-700/50">
                    <td className="py-3 pr-4 text-sm text-white">{p.label}</td>
                    <td className="py-3 pr-4 text-sm text-gray-300 font-mono text-xs">
                      {p.host}:{p.port}
                      {p.username && <span className="text-gray-500"> ({p.username})</span>}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-xs px-2 py-0.5 bg-gray-700 rounded text-gray-300 uppercase">
                        {p.protocol}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-xs text-gray-400">
                      {p.accounts.length > 0
                        ? p.accounts.map((a) => `@${a.username}`).join(", ")
                        : "없음"}
                    </td>
                    <td className="py-3 pr-4">
                      <button
                        onClick={() => toggleProxy(p)}
                        className={`relative w-10 h-5 rounded-full transition-colors ${
                          p.active ? "bg-indigo-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                            p.active ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-1 items-center">
                        <button
                          onClick={() => testProxy(p)}
                          disabled={testingProxyId === p.id}
                          className="text-xs px-2 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-gray-200"
                          title="연결 테스트"
                        >
                          {testingProxyId === p.id ? "테스트 중..." : "테스트"}
                        </button>
                        {proxyTestResults[p.id] && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded ${
                              proxyTestResults[p.id].ok
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                            }`}
                            title={proxyTestResults[p.id].text}
                          >
                            {proxyTestResults[p.id].ok ? "OK" : "FAIL"}
                          </span>
                        )}
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white"
                          title="편집"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteProxy(p.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400"
                          title="삭제"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9M18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79M19.228 5.79a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m11 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      {pref && (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">이메일 알림</h2>
              <p className="text-xs text-gray-400 mt-1">중요 이벤트 발생 시 이메일을 받습니다</p>
            </div>
            <button
              onClick={sendTest}
              disabled={testing || !pref.emailEnabled}
              className="text-xs bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-gray-200 px-3 py-1.5 rounded-lg"
            >
              {testing ? "전송 중..." : "테스트 전송"}
            </button>
          </div>

          {message && (
            <div className="mb-4 bg-indigo-500/20 border border-indigo-500/50 rounded-lg px-3 py-2 text-xs text-indigo-200">
              {message}
            </div>
          )}

          <div className="space-y-3">
            {[
              { key: "emailEnabled", label: "이메일 알림 전체 활성화", desc: "꺼두면 아래 설정과 무관하게 이메일이 전송되지 않습니다" },
              { key: "notifyOnError", label: "오류 알림", desc: "자동화 로그인/실행 실패 시" },
              { key: "notifyOnSuccess", label: "성공 알림", desc: "자동화 사이클 완료 시 (권장: 꺼둠)" },
              { key: "notifyDailyReport", label: "일일 리포트", desc: "매일 자동화 성과 요약" },
            ].map((row) => (
              <div
                key={row.key}
                className="flex items-center justify-between py-2 border-b border-gray-700/30 last:border-b-0"
              >
                <div>
                  <p className="text-sm text-white">{row.label}</p>
                  <p className="text-xs text-gray-500">{row.desc}</p>
                </div>
                <button
                  onClick={() =>
                    updatePref({
                      [row.key]: !pref[row.key as keyof NotificationPref],
                    } as Partial<NotificationPref>)
                  }
                  className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${
                    pref[row.key as keyof NotificationPref] ? "bg-indigo-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      pref[row.key as keyof NotificationPref] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
            <p className="text-xs text-yellow-400">
              이메일 전송을 위해 서버에 <code className="font-mono">RESEND_API_KEY</code> 또는 <code className="font-mono">SMTP_*</code> 환경변수가 설정되어야 합니다.
            </p>
          </div>
        </div>
      )}

      {/* Proxy Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">
                {editingId ? "프록시 편집" : "프록시 추가"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="p-1 rounded-lg hover:bg-gray-700 text-gray-400"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm mb-4">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">이름 (별명)</label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="예: 한국 프록시 1"
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">프로토콜</label>
                  <select
                    value={form.protocol}
                    onChange={(e) => setForm({ ...form, protocol: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-2 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="http">HTTP</option>
                    <option value="https">HTTPS</option>
                    <option value="socks5">SOCKS5</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-300 mb-1">호스트</label>
                  <input
                    type="text"
                    value={form.host}
                    onChange={(e) => setForm({ ...form, host: e.target.value })}
                    placeholder="proxy.example.com"
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">포트</label>
                <input
                  type="number"
                  value={form.port}
                  onChange={(e) => setForm({ ...form, port: e.target.value })}
                  placeholder="8080"
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">사용자명 (선택)</label>
                  <input
                    type="text"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    비밀번호 {editingId && <span className="text-gray-500">(빈칸=유지)</span>}
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 py-2.5 rounded-lg text-sm font-medium"
              >
                취소
              </button>
              <button
                onClick={saveProxy}
                disabled={saving}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg text-sm font-medium disabled:opacity-50"
              >
                {saving ? "저장 중..." : "저장"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
