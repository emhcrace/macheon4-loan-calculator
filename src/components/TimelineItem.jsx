import React from "react";

export default function TimelineItem({ label, sub, color = "gray", isLast }) {
  const colorMap = {
    gray: {
      dot: "bg-slate-200 ring-slate-400",
      line: "bg-slate-200",
      text: "text-slate-500",
    },
    green: {
      dot: "bg-emerald-500 ring-emerald-300",
      line: "bg-emerald-400",
      text: "text-emerald-700",
    },
    red: {
      dot: "bg-red-500 ring-red-300",
      line: "bg-red-400",
      text: "text-red-700",
    },
  };

  const styles = colorMap[color] || colorMap.gray;

  return (
    <div className="relative flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`w-5 h-5 rounded-full ring-4 ring-white shadow-sm ${styles.dot}`}
        />
        {!isLast && <div className={`w-0.5 flex-1 mt-1 ${styles.line}`} />}
      </div>

      <div className="pt-0.5">
        <div className={`font-medium ${styles.text}`}>{label}</div>
        {sub && <div className="text-xs text-slate-400">{sub}</div>}
      </div>
    </div>
  );
}
