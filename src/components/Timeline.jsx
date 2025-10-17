import React, { useEffect, useRef, useState } from "react";
import TimelineItem from "./TimelineItem";

export default function Timeline({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);
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
    <div className="relative flex justify-center py-8 w-full max-w-3xl mx-auto">
      {/* 수직 라인 */}
      <div className="absolute left-[1.5rem] top-0 bottom-0 w-[3px] bg-gray-200"></div>

      {/* 타임라인 아이템들 */}
      <div className="flex flex-col gap-8 pl-10 w-full relative">
        {data.map((d, i) => {
          // 라인 색상 분기
          const lineColor =
            d.color === "gray"
              ? "border-gray-300"
              : d.color === "green"
              ? "border-emerald-500"
              : "border-rose-500";

          const isLast = i === data.length - 1;

          return (
            <div
              key={i}
              ref={(el) => (refs.current[i] = el)}
              data-index={i}
              className="relative flex items-start"
            >
              {/* 왼쪽 타임라인 */}
              <div className="relative flex flex-col items-center mr-4">
                {/* 위쪽 라인 */}
                {i > 0 && (
                  <div
                    className={`absolute top-0 w-[3px] ${
                      d.color === "gray"
                        ? "bg-gray-300"
                        : d.color === "green"
                        ? "bg-emerald-500"
                        : "bg-rose-500"
                    }`}
                    style={{ height: "50%" }}
                  ></div>
                )}

                {/* 점 */}
                <div
                  className={`relative z-10 w-5 h-5 rounded-full border-4 ${lineColor} ${
                    d.color === "gray"
                      ? "bg-gray-300"
                      : d.color === "green"
                      ? "bg-emerald-500"
                      : "bg-rose-500"
                  } shadow-md`}
                ></div>

                {/* 아래쪽 라인 */}
                {!isLast && (
                  <div
                    className={`absolute bottom-0 w-[3px] ${
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
              <div className="ml-2">
                <h3 className="font-semibold text-gray-900 text-xl">
                  {d.label}
                </h3>
                <p className="text-sm text-gray-500 mb-3"></p>
                <p
                  className={`text-base font-semibold ${
                    d.color === "green"
                      ? "text-emerald-700"
                      : d.color === "red"
                      ? "text-rose-700"
                      : "text-gray-700"
                  }`}
                >
                  누적 이자{" "}
                  <span className="text-gray-800">
                    {d.cumulative.toLocaleString("ko-KR")}원
                  </span>{" "}
                  <span className="text-gray-400 text-sm">({d.korean})</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
