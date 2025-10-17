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
    <div className="relative flex justify-center py-10 w-full max-w-4xl mx-auto">
      {/* 수직 라인 */}
      <div className="absolute left-[1.6rem] top-0 bottom-0 w-[5px] bg-emerald-200"></div>

      {/* 타임라인 아이템들 */}
      <div className="flex flex-col gap-10 pl-14 w-full relative">
        {data.map((d, i) => {
          // 라인 색상 분기
          const lineColor =
            d.color === "gray"
              ? "border-gray-300"
              : d.color === "green"
              ? "border-emerald-500"
              : "border-rose-500";

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

          const isLast = i === data.length - 1;

          return (
            <div
              key={i}
              ref={(el) => (refs.current[i] = el)}
              data-index={i}
              className="relative flex items-start"
            >
              {/* 왼쪽 타임라인 */}
              <div className="relative flex flex-col items-center mr-6">
                {/* 위쪽 라인 */}
                {i > 0 && (
                  <div
                    className={`absolute top-0 w-[5px] ${
                      d.color === "gray"
                        ? "bg-slate-300"
                        : d.color === "green"
                        ? "bg-emerald-500"
                        : "bg-rose-500"
                    }`}
                    style={{ height: "50%" }}
                  ></div>
                )}

                {/* 점 */}
                <div
                  className={`relative z-10 w-7 h-7 rounded-full border-[6px] ${lineColor} ${
                    d.color === "gray"
                      ? "bg-slate-300"
                      : d.color === "green"
                      ? "bg-emerald-500"
                      : "bg-rose-500"
                  } shadow-xl`}
                ></div>

                {/* 아래쪽 라인 */}
                {!isLast && (
                  <div
                    className={`absolute bottom-0 w-[5px] ${
                      d.color === "red"
                        ? "bg-rose-500"
                        : d.color === "green"
                        ? "bg-emerald-500"
                        : "border-l-2 border-dotted border-gray-300"
                    }`}
                    style={{ height: "50%" }}
                  ></div>
                )}
              </div>

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
                  <span className="text-slate-500 text-lg font-medium">
                    ({d.korean})
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
