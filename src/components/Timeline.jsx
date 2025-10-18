import React, { useEffect, useRef, useState } from "react";

export default function Timeline({ data }) {
  const [, setActiveIndex] = useState(null);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = parseInt(visible[0].target.dataset.index, 10);
          setActiveIndex(idx);
        }
      },
      { root: null, threshold: 0.5 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-12 pl-0 w-full relative">
      {data.map((d, i) => {
        // 라인 색상 분기
        const accentClasses =
          d.color === "gray"
            ? "border-slate-400 bg-slate-50 text-slate-900"
            : d.color === "green"
            ? "border-emerald-500 bg-emerald-50 text-emerald-900"
            : "border-rose-500 bg-rose-50 text-rose-900";

        const headlineColor =
          d.color === "green"
            ? "text-emerald-900"
            : d.color === "red"
            ? "text-rose-900"
            : "text-slate-900";

        return (
          <div
            key={i}
            ref={(el) => (refs.current[i] = el)}
            data-index={i}
            className="relative "
          >
            {/* 오른쪽 내용 */}
            <div
              className={`ml-2 rounded-3xl px-8 py-6 shadow-lg border-l-8 ${accentClasses}`}
            >
              <h3 className={`font-extrabold text-3xl ${headlineColor}`}>
                {d.label}
              </h3>
              {d.isFuture && d.relativeLabel && (
                <p className="text-xl text-slate-600 font-semibold mt-2">
                  {d.relativeLabel}
                </p>
              )}
              <p
                className={`text-2xl font-bold mt-4 ${
                  d.color === "green"
                    ? "text-emerald-700"
                    : d.color === "red"
                    ? "text-rose-700"
                    : "text-slate-700"
                }`}
              >
                누적 이자{" "}
                <span className="text-slate-900">
                  {d.cumulative.toLocaleString("ko-KR")}원
                </span>{" "}
                <span className="text-slate-1200 text-lg font-medium font-bold">
                  ({d.korean})
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
