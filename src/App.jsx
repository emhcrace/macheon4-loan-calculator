import React, { useState, useMemo } from "react";
import "./App.css";
import Timeline from "./components/Timeline";

/*
  Macheon4 Loan Interest Calculator
  - Inputs: address(번지), loan amount
  - Rate: 5.3% fixed, start date = 1 year ago today
  - Outputs: 1~15 years annual interest and horizontal timeline
  - Pure Tailwind UI components only
*/

/* ---------- Helpers ---------- */
const RATE = 0.053;
const YEARS = 15;

const formatCurrency = (n) =>
  Number(n || 0).toLocaleString("ko-KR", {
    style: "currency",
    currency: "KRW",
  });

const oneYearAgo = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d;
};

/* ---------- Layout ---------- */
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">
              마천4구역 조합원 대출 이자 계산기
            </h1>
          </div>
          <div className="text-sm text-slate-500">
            이자:{" "}
            <span className="font-medium">{(RATE * 100).toFixed(2)}%</span>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-6 text-xs text-slate-400">
          Start date is one year ago from today:{" "}
          {oneYearAgo().toLocaleDateString()}
        </footer>
      </div>
    </div>
  );
}

/* ---------- InputForm ---------- */
function InputForm({ address, setAddress, amount, setAmount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <label className="col-span-1 md:col-span-2">
        <div className="text-sm text-slate-600 mb-1">주소(번지)</div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="예: 마천동 123-4"
          className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </label>

      <label>
        <div className="text-sm text-slate-600 mb-1">대출금액 (원)</div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="10000000"
          className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </label>
    </div>
  );
}


/* ---------- Main App ---------- */
function App() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(); // default 10,000,000

  const principal = useMemo(() => {
    const n = Number(amount);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [amount]);

  // per user spec, loan execution date is 2024-10-01
  const start = useMemo(() => new Date(2024, 9, 1), []); // month is 0-indexed
  const today = useMemo(() => new Date(), []);

  // yearly data for 1..15
  const data = useMemo(() => {
    const arr = [];
    for (let y = 1; y <= YEARS; y++) {
      const yearDate = new Date(start);
      yearDate.setFullYear(start.getFullYear() + y);
      const label = `${yearDate.getFullYear()}년 (${y}년차)`;
      const interest = principal * RATE; // simple yearly interest (interest-only)
      const cumulative = interest * y;
      arr.push({ year: y, label, interest, cumulative, date: yearDate });
    }
    return arr;
  }, [principal, start]);

  return (
    <Layout>
      <section className="mb-6">
        <InputForm
          address={address}
          setAddress={setAddress}
          amount={amount}
          setAmount={setAmount}
        />
      </section>

      <section className="mb-6">
        <div className="bg-slate-50 p-4 rounded-md border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium">연도별 이자 (1~15년)</h2>
            <div className="text-sm text-slate-600">
              주소: <span className="font-medium">{address || "-"}</span>
            </div>
          </div>

          {/* <TimelineChart data={data} /> */}

          <div className="mt-6">
            <Timeline startDate={start} today={today} />
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2 pr-4">연도</th>
                  <th className="py-2 pr-4">기한(연)</th>
                  <th className="py-2 pr-4">해당연도 이자</th>
                  <th className="py-2 pr-4">누적 이자</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.year} className="border-t">
                    <td className="py-2 pr-4">{d.label}</td>
                    <td className="py-2 pr-4">{d.year}년차</td>
                    <td className="py-2 pr-4">{formatCurrency(d.interest)}</td>
                    <td className="py-2 pr-4">
                      {formatCurrency(d.cumulative)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default App;
