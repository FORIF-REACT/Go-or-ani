/**
 * Page for Betting results
 * * Wrote by SJ
 * @param
 * @returns
 *
 * TODO Design change needed
 */

import Divider from "./Divider";
import Percentagebar from "./Percentagebar";
import Rank from "./Rank";
import SectionWrapper from "./Sectionwrapper";

// Rank TestCase
type Rank = {
  _id: string;
  point: number;
};

const example_rank: Rank[] = [
  {
    _id: "id_1",
    point: 100,
  },
  {
    _id: "id_2",
    point: 80,
  },
  {
    _id: "id_3",
    point: 70,
  },
  {
    _id: "id_4",
    point: 40,
  },
  {
    _id: "id_5",
    point: 20,
  },
  {
    _id: "id_6",
    point: 10,
  },
  {
    _id: "id_7",
    point: 7,
  },
  {
    _id: "id_8",
    point: 4,
  },
  {
    _id: "id_9",
    point: 3,
  },
  {
    _id: "id_10",
    point: 1,
  },
];

export default function BettingResult() {
  return (
    <div className="">
      <Divider />

      <div className="text-4xl font-bold text-slate-600 pb-2">부먹 VS 찍먹</div>
      <div className="text-2xl text-slate-600">선택지 2 / 투표 수 기준</div>

      <Divider />

      <SectionWrapper>
        <div className="text-xl text-slate-600">투표 기준 비율</div>
        <Percentagebar percent={0.423} />
      </SectionWrapper>

      <Divider />

      <SectionWrapper>
        <div className="text-xl text-slate-600">베팅 포인트 기준 비율</div>
        <Percentagebar percent={0.298} />
      </SectionWrapper>

      <Divider />

      <SectionWrapper>
        <div className="text-xl text-slate-600">내가 얻은 포인트</div>
        <div className="text-2xl font-bold text-slate-600">+ 10</div>
      </SectionWrapper>

      <Divider />

      <SectionWrapper>
        <div className="text-xl text-slate-600">얻은 포인트 TOP 10</div>
        <Rank ranks={example_rank} />
      </SectionWrapper>
    </div>
  );
}
