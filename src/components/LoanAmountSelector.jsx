import React from "react";

export default function LoanAmountSelector({ setAmount }) {
  const handleChange = (key, value) =>
    setAmount((prev) => ({ ...prev, [key]: Number(value) }));

  const range = (n) => [...Array(n).keys()];

  return (
    <div className="flex flex-wrap gap-6 justify-center mb-8 text-2xl font-bold text-emerald-900">
      <select
        onChange={(e) => handleChange("eok", e.target.value)}
        className="border-4 border-emerald-300 rounded-2xl px-6 py-4 bg-white shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-400 text-emerald-900"
      >
        <option value="0">0억</option>
        {range(10).map((i) => (
          <option key={i} value={i + 1}>
            {i + 1}억
          </option>
        ))}
      </select>

      <select
        onChange={(e) => handleChange("cheon", e.target.value)}
        className="border-4 border-emerald-300 rounded-2xl px-6 py-4 bg-white shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-400 text-emerald-900"
      >
        <option value="0">0천</option>
        {range(10).map((i) => (
          <option key={i} value={i + 1}>
            {i + 1}천
          </option>
        ))}
      </select>

      <select
        onChange={(e) => handleChange("baek", e.target.value)}
        className="border-4 border-emerald-300 rounded-2xl px-6 py-4 bg-white shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-400 text-emerald-900"
      >
        <option value="0">0백</option>
        {range(10).map((i) => (
          <option key={i} value={i + 1}>
            {i + 1}백
          </option>
        ))}
      </select>
    </div>
  );
}
