// import { useMemo } from "react";
import { eachDayOfInterval, format, subDays } from "date-fns";
import type { PostProps } from "../components/utils/common-interfaces";

export default function ContributionGraph({ posts }: { posts: PostProps[] }) {
  const ITScale = ["#a8d2ed", "#90cdf4", "#4299e1", "#064fc4"]; // 파랑 계열
  const JPScale = ["#eda6a6", "#fc8181", "#e53e3e", "#db1212"]; // 빨강 계열
  const BothScale = ["#d6bcfa", "#b794f4", "#6b46c1", "#6513c2"]; // 보라 계열

  // 날짜별 count 집계 (github 방식)
  //   const postCountByDate = useMemo(() => {
  //     const counts: Record<string, number> = {};
  //     posts.forEach(post => {
  //       const data = format(new Date(post.createdAt), "yyyy-MM-dd");
  //       counts[data] = (counts[data] || 0) + 1;
  //     });
  //     return counts;
  //   }, [posts]);

  // 날짜별 카테고리 카운트 맵
  const contributionMap = posts.reduce(
    (map, post) => {
      const day = format(new Date(post.createdAt), "yyyy-MM-dd");

      if (!map[day]) {
        map[day] = { it: 0, jp: 0 };
      }

      if (post.parentCategoryId === 1) {
        map[day].it += 1;
      } else if (post.parentCategoryId === 2) {
        map[day].jp += 1;
      }
      return map;
    },
    {} as Record<string, { it: number; jp: number }>
  );

  // 1년치 날짜 생성
  const today = new Date();
  const days = eachDayOfInterval({
    start: subDays(today, 365),
    end: today,
  });

  // 색상 혼합
  function mixColors(itCount: number, jpCount: number) {
    if (itCount >= 8 && jpCount >= 8) return BothScale[3];
    if (itCount >= 5 && jpCount >= 5) return BothScale[2];
    if (itCount >= 3 && jpCount >= 3) return BothScale[1];
    if (itCount >= 1 && jpCount >= 1) return BothScale[0];
    return BothScale[0];
  }

  function getItColor(itCount: number) {
    if (itCount >= 8) return ITScale[3];
    if (itCount >= 5) return ITScale[2];
    if (itCount >= 3) return ITScale[1];
    if (itCount >= 1) return ITScale[0];
    return null;
  }
  function getJpColor(jpCount: number) {
    if (jpCount >= 8) return JPScale[3];
    if (jpCount >= 5) return JPScale[2];
    if (jpCount >= 3) return JPScale[1];
    if (jpCount >= 1) return JPScale[0];
    return null;
  }

  // 색상 강도 매핑
  function getColor(counts: { it: number; jp: number }) {
    const itCount = counts.it;
    const jpCount = counts.jp;

    const itColor = getItColor(itCount);
    const jpColor = getJpColor(jpCount);

    // 둘 다 있는 경우 → 보라 계열 (보간)
    if (itColor && jpColor) {
      return mixColors(itCount, jpCount);
    }

    return itColor || jpColor; // 좌항이 falsy면 우항 반환
  }

  return (
    <>
      <div className="grid grid-flow-col auto-cols-max gap-1.5">
        {/* 주 단위로 세로 배열 github 방식 */}
        {Array.from({ length: 53 }).map((_, weekIndex) => (
          <div key={weekIndex} className="grid grid-rows-7 gap-1.5">
            {days.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, dayIndex) => {
              const dateKey = format(day, "yyyy-MM-dd");
              const counts = contributionMap[dateKey] || { it: 0, jp: 0 };
              return (
                <div
                  key={dayIndex}
                  className={`w-4 h-4 rounded ${counts.it === 0 && counts.jp === 0 ? "bg-muted-foreground/20" : ""}`}
                  title={`${dateKey} | IT: ${counts.it}, 일본어: ${counts.jp}`}
                  style={
                    counts.it > 0 || counts.jp > 0
                      ? { backgroundColor: getColor(counts) ?? undefined }
                      : undefined
                  }
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* 범례 */}
      <div className="flex w-full justify-end -mt-8 pr-3">
        <div className="flex flex-col gap-1.5">
          {/* IT */}
          <div className="flex items-center gap-1.5">
            {ITScale.map((color, idx) => (
              <span key={idx} className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
            ))}
            <span className="text-sm text-foreground">IT 카테고리</span>
          </div>

          {/* 일본어 */}
          <div className="flex items-center gap-1.5">
            {JPScale.map((color, idx) => (
              <span key={idx} className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
            ))}
            <span className="text-sm text-foreground">일본어 카테고리</span>
          </div>

          {/* 둘 다 */}
          <div className="flex items-center gap-1.5">
            {BothScale.map((color, idx) => (
              <span key={idx} className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
            ))}
            <span className="text-sm text-foreground">둘 다 게시</span>
          </div>
        </div>
      </div>
    </>
  );
}
