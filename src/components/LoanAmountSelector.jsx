import React from "react";

export default function LoanAmountSelector({ setAmount }) {
  const handleChange = (key, value) =>
    setAmount((prev) => ({ ...prev, [key]: Number(value) }));

  const range = (n) => [...Array(n).keys()];

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-4 text-lg font-medium text-gray-700">
      <select
        onChange={(e) => handleChange("eok", e.target.value)}
        className="border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-emerald-300"
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
        className="border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-emerald-300"
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
        className="border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-emerald-300"
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
