import React from "react";
import TimelineItem from "./TimelineItem";

// props: startDate (loan start), today (Date), ranges: {greenEnd, redStart}
export default function Timeline({ startDate, today }) {
  // fixed range targets per spec
  const greenEnd = new Date(2027, 5, 30); // 2027-06-30 (month is 0-indexed)
  const finalEnd = new Date(2032, 11, 31); // end of 2032

  // Build events: Ordered, Shipped, Out for delivery, Delivered (from attached design)
  // But adapt labels to loan timeline: Start, Today, 2027-06, 2032-end
  const events = [
    {
      key: "start",
      date: startDate,
      label: "대출 실행일",
      sub: startDate.toLocaleDateString(),
    },
    {
      key: "today",
      date: today,
      label: "오늘",
      sub: today.toLocaleDateString(),
    },
    {
      key: "greenEnd",
      date: greenEnd,
      label: "2027년 6월",
      sub: greenEnd.toLocaleDateString(),
    },
    {
      key: "final",
      date: finalEnd,
      label: "2032년",
      sub: finalEnd.toLocaleDateString(),
    },
  ];

  // Determine color for each segment (dot + connecting line below it)
  const getColorFor = (d) => {
    if (d < today) return "gray";
    if (d >= today && d <= greenEnd) return "green";
    return "red";
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-start gap-6">
        <div className="w-16 text-sm text-slate-500">타임라인</div>
        <div className="flex-1">
          <div className="flex flex-col gap-6">
            {events.map((e, idx) => (
              <TimelineItem
                key={e.key}
                label={e.label}
                sub={e.sub}
                color={getColorFor(e.date)}
                isLast={idx === events.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
