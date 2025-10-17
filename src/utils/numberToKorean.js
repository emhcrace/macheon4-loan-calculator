export function numberToKorean(number) {
  if (!number) return "영원";

  // 1️⃣ 표현 단위 선택 (1천만원 이하는 십만원 단위 유지)
  const roundingUnit = number <= 10_000_000 ? 100_000 : 1_000_000;
  number = Math.floor(number / roundingUnit) * roundingUnit;

  // 2️⃣ 억, 천만, 백만까지만 처리
  const units = ["", "만", "억", "조", "경"];
  const nums = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
  const digitUnits = ["", "십", "백", "천"];

  let result = "";
  let unitIndex = 0;

  while (number > 0) {
    const chunk = number % 10000;
    if (chunk > 0) {
      let chunkStr = "";
      const digits = String(chunk).padStart(4, "0").split("");
      digits.forEach((n, i) => {
        const num = parseInt(n);
        if (num > 0) chunkStr += nums[num] + digitUnits[3 - i];
      });
      result = chunkStr + units[unitIndex] + result;
    }
    number = Math.floor(number / 10000);
    unitIndex++;
  }

  // 3️⃣ ‘십만, 만, 천원’ 이하 단위 제거 (단, 1천만원 이하는 유지)
  if (roundingUnit > 100_000) {
    result = result
      .replace(/십만.*$/, "만원") // 10만 이하 제거
      .replace(/만$/, "만원");
  } else {
    result = result.replace(/만$/, "만원");
  }

  // 4️⃣ 중복 제거 및 단위 보정
  result = result.replace(/만원만원$/, "만원").replace(/원$/, "");

  // 5️⃣ 최종 결과 반환
  return result + "원";
}
