import React, { useState, useMemo } from "react";
import LoanAmountSelector from "./components/LoanAmountSelector";
import Timeline from "./components/Timeline";
import { numberToKorean } from "./utils/numberToKorean";

const RATE = 0.053;
const START_DATE = new Date(2024, 9, 1); // 2024년 10월
const GREEN_END = new Date(2027, 5, 30);
const RED_END = new Date(2032, 11, 31);

export default function App() {
  const [amount, setAmount] = useState({ eok: 0, cheon: 0, baek: 0 });
  const [timeline, setTimeline] = useState([]);

  const principal = useMemo(() => {
    return (
      amount.eok * 100000000 + amount.cheon * 10000000 + amount.baek * 1000000
    );
  }, [amount]);

  const handleCalculate = () => {
    if (principal <= 0) {
      alert("대출 금액을 선택하세요.");
      return;
    }

    const today = new Date();
    const totalMonths =
      (RED_END.getFullYear() - START_DATE.getFullYear()) * 12 +
      (RED_END.getMonth() - START_DATE.getMonth()) +
      1;

    const monthlyInterest = principal * (RATE / 12);
    const data = [];

    for (let i = 0; i < totalMonths; i++) {
      const current = new Date(START_DATE);
      current.setMonth(START_DATE.getMonth() + i);

      let color = "gray";
      if (current > today && current <= GREEN_END) color = "green";
      else if (current > GREEN_END) color = "red";

      const label = `${current.getFullYear()}년 ${current.getMonth() + 1}월`;
      const cumulative = monthlyInterest * (i + 1);

      data.push({
        date: current,
        label,
        interest: monthlyInterest,
        cumulative,
        korean: numberToKorean(cumulative),
        color,
        isFuture: current > today,
      });
    }

    setTimeline(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-emerald-700 mb-6">
          💰 마천4구역 조합원 대출 이자 타임라인
        </h1>

        <LoanAmountSelector setAmount={setAmount} />

        <div className="text-center mt-4">
          <button
            onClick={handleCalculate}
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-6 py-3 rounded-xl font-semibold transition-all"
          >
            계산하기
          </button>
        </div>

        {timeline.length > 0 && (
          <div className="mt-10">
            <Timeline data={timeline} />
          </div>
        )}
      </div>
    </div>
  );
}
