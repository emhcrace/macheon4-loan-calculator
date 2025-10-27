import React, { useState, useMemo } from "react";
import LoanAmountSelector from "./components/LoanAmountSelector";
import Timeline from "./components/Timeline";
import { numberToKorean } from "./utils/numberToKorean";

const RATE_OPTIONS = [
  { id: "base-30", label: "기본이주비 대출 3.0%", value: 0.03 },
  { id: "base-33", label: "기본이주비 대출 3.3%", value: 0.033 },
  { id: "extra-45", label: "추가이주비 대출 4.5%", value: 0.045 },
];
const START_DATE = new Date(2024, 9, 23); // 2024년 10월
const GREEN_END = new Date(2027, 5, 30);
const RED_END = new Date(2032, 11, 31);

const getRelativeTimeText = (fromDate, toDate) => {
  const base = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1);
  const target = new Date(toDate.getFullYear(), toDate.getMonth(), 1);

  const diffMonths =
    (target.getFullYear() - base.getFullYear()) * 12 +
    (target.getMonth() - base.getMonth());

  if (diffMonths <= 0) return "";

  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  const monthsText = `${diffMonths}개월 후`;

  if (years === 0) {
    return `(${monthsText})`;
  }

  const parts = [];
  if (years > 0) parts.push(`${years}년`);
  if (months > 0) parts.push(`${months}개월`);
  const yearsText = `${parts.join(" ")} 후`;

  return `(${monthsText}, ${yearsText})`;
};

export default function App() {
  const [amount, setAmount] = useState({ eok: 0, cheon: 0, baek: 0 });
  const [timeline, setTimeline] = useState([]);
  const [selectedRate, setSelectedRate] = useState(RATE_OPTIONS[0]);

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

    const monthlyInterest = principal * (selectedRate.value / 12);
    const data = [];

    for (let i = 0; i < totalMonths; i++) {
      const current = new Date(START_DATE);
      current.setMonth(START_DATE.getMonth() + i);

      let color = "gray";
      if (current > today && current <= GREEN_END) color = "green";
      else if (current > GREEN_END) color = "red";

      const label = `${current.getFullYear()}년 ${current.getMonth() + 1}월`;
      const cumulative = monthlyInterest * (i + 1);

      const relativeLabel =
        current > today ? getRelativeTimeText(today, current) : "";

      data.push({
        date: current,
        label,
        interest: monthlyInterest,
        cumulative,
        korean: numberToKorean(cumulative),
        color,
        isFuture: current > today,
        relativeLabel,
        rateLabel: selectedRate.label,
      });
    }

    setTimeline(data);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl p-12 border-4 border-emerald-200">
      <div>
        <h1 className="text-4xl md:text-4xl font-black text-center text-emerald-800 tracking-tight mb-12 mt-12">
          💰 마천4구역 조합원 대출 이자 계산기
        </h1>

        <LoanAmountSelector setAmount={setAmount} />

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {RATE_OPTIONS.map((option) => {
            const isActive = option.id === selectedRate.id;
            const baseClasses =
              "px-6 py-3 rounded-2xl text-xl font-semibold transition-all border-4";
            const activeClasses =
              "bg-emerald-600 text-white border-emerald-500 shadow-lg";
            const inactiveClasses =
              "bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50";

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedRate(option)}
                className={`${baseClasses} ${
                  isActive ? activeClasses : inactiveClasses
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="text-center mt-4">
          <button
            onClick={handleCalculate}
            className="bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-4 focus-visible:ring-emerald-300 text-white text-2xl px-10 py-4 rounded-2xl font-bold transition-all shadow-lg"
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
