import { formatDate } from "@/utils/helper";

/** 周期渲染实体 */
export interface WeeksInYear {
  /** 第几周 */
  name: string,
  /** 本周开始时间 */
  fristDay: string,
  /** 本周结束时间 */
  endDay: string,
  /** 数据下标 */
  index: number
}

/**
 * 获取指定年份的所有周期
 * @param year 年
 * @returns 
 */
export function getWeeksInYear(year: number): WeeksInYear[] {
  const weeks: WeeksInYear[] = [];
  const startDate = new Date(year, 0, 1); // 当年的新的一天
  let firstWeekDay = startDate.getDay(); // 1月1日是周几
  while (firstWeekDay !== 1) {
    startDate.setDate(startDate.getDate() + 1);
    firstWeekDay = startDate.getDay();
  }
  const weeksInYear = Math.ceil(365 / 7);
  for (let i = 0; i < weeksInYear; i++) {
    const FristDay = new Date(year, 0, startDate.getDate() + (i * 7));
    const EndDay = new Date(year, 0, startDate.getDate() + (7 * i - 1));
    const FristDayStr = formatDate(FristDay);
    if (FristDayStr.slice(0, 4) != year.toString()) break;
    const EndDayStr = formatDate(EndDay);
    const week = <WeeksInYear>({
      name: `第${i + 1}周`,
      fristDay: FristDayStr,
      endDay: EndDayStr,
      index: i
    });
    weeks.push(week);
  }
  return weeks;
}