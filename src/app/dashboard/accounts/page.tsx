"use client";

import { useState } from "react";

interface Account {
  id: string;
  username: string;
  followers: number;
  following: number;
  active: boolean;
  lastActivity: string;
  status: string;
}

const initialAccounts: Account[] = [
  {
    id: "1",
    username: "@beauty_shop_kr",
    followers: 5243,
    following: 1832,
    active: true,
    lastActivity: "2분 전",
    status: "자동화 실행 중",
  },
  {
    id: "2",
    username: "@daily_fashion_2024",
    followers: 4102,
    following: 2105,
    active: true,
    lastActivity: "5분 전",
    status: "자동화 실행 중",
  },
  {
    id: "3",
    username: "@food_lover_seoul",
    followers: 3502,
    following: 987,
    active: false,
    lastActivity: "2시간 전",
    status: "일시정지",
  },
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [showModal, setShowModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const toggleAccount = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id
          ? {
              ...acc,
              active: !acc.active,
              status: !acc.active ? "자동화 실행 중" : "일시정지",
            }
          : acc
      )
    );
  };

  const deleteAccount = (id: string) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
  };

  const addAccount = () => {
    if (!newUsername) return;
    const newAcc: Account = {
      id: Date.now().toString(),
      username: newUsername.startsWith("@") ? newUsername : `@${newUsername}`,
      followers: 0,
      following: 0,
      active: false,
      lastActivity: "방금",
      status: "연결 대기",
    };
    setAccounts((prev) => [...prev, newAcc]);
    setNewUsername("");
    setNewPassword("");
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">계정관리</h1>
          <p className="text-sm text-gray-400 mt-1">
            인스타그램 계정을 추가하고 관리하세요
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          계정 추가
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <p className="text-sm text-gray-400">전체 계정</p>
          <p className="text-2xl font-bold text-white mt-1">{accounts.length}</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <p className="text-sm text-gray-400">활성 계정</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {accounts.filter((a) => a.active).length}
          </p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
          <p className="text-sm text-gray-400">총 팔로워</p>
          <p className="text-2xl font-bold text-indigo-400 mt-1">
            {accounts.reduce((a, b) => a + b.followers, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-700 bg-gray-800/50">
                <th className="px-5 py-3">계정</th>
                <th className="px-5 py-3">상태</th>
                <th className="px-5 py-3">팔로워</th>
                <th className="px-5 py-3">팔로잉</th>
                <th className="px-5 py-3">마지막 활동</th>
                <th className="px-5 py-3">활성화</th>
                <th className="px-5 py-3">액션</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr
                  key={account.id}
                  className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                        {account.username.charAt(1).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{account.username}</p>
                        <p className="text-xs text-gray-500">{account.status}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        account.active
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-gray-600/30 text-gray-400"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          account.active ? "bg-emerald-400 animate-pulse" : "bg-gray-500"
                        }`}
                      />
                      {account.active ? "활성" : "비활성"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-300">
                    {account.followers.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-300">
                    {account.following.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-400">{account.lastActivity}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleAccount(account.id)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        account.active ? "bg-indigo-600" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          account.active ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteAccount(account.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">계정 추가</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg hover:bg-gray-700 text-gray-400"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  인스타그램 아이디
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="@username"
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  비밀번호
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                <p className="text-xs text-yellow-400">
                  계정 정보는 암호화되어 안전하게 저장됩니다. 2단계 인증이 설정된 경우 추가 인증이 필요할 수 있습니다.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                취소
              </button>
              <button
                onClick={addAccount}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                추가하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
