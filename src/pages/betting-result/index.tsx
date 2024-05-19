/**
 * Page for Betting results
 * * Wrote by SJ
 * @param
 * @returns
 *
 * TODO 
 */

import Divider from "./Divider";
import PercentageBar from "./PercentageBar";
import Rank from "./Rank";
import User from "./User";

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
    <div className="w-[1024px] mt-10 flex flex-col gap-8 mb-24">
      {/*제목과 기본 정보*/}
      <div className="text-4xl font-bold">{"부먹과 찍먹, 당신의 선택은?"}</div>

      <div>
        <div className="text-xl text-primary-green-300 font-bold">{"포인트 기준, 과반수 승리"}</div>
        <div className="text-xl text-primary-green-300 font-bold">
          {"마감시간 2024/05/19 23:26:00"}
        </div>
      </div>

      <User id="Seongjinemong" />

      <Divider/>

      {/*통계*/}
      <div className="text-4xl font-bold">{"통계"}</div>

      <PercentageBar
        title={"투표율 기준"}
        ratio={0.635}
        selections={["부먹", "찍먹"]}
      />
      <PercentageBar
        title={"포인트 기준"}
        ratio={0.235}
        selections={["부먹", "찍먹"]}
      />

      <Divider/>

      {/*사용자가 얻은 포인트*/}
      <div className="text-4xl font-bold">{"내가 얻은 포인트"}</div>
      <div className="flex flex-row justify-between items-center">
        <div>
          <div className="text-2xl font-bold mb-2">
            {"50 * (0.5 / 0.5) = 50"}
          </div>
          <div className="text-background-black-300">
            {"내가 베팅한 포인트 * (승자 포인트 비율 / 패자 포인트 비율)"}
          </div>
        </div>

        <div className="text-4xl font-bold text-primary-green-400">
          {" + 50"}
        </div>
      </div>

      <Divider/>

      {/*가장 많은 포인트를 얻은 사용자*/}
      <div className="text-4xl font-bold">{"최다 포인트 획득 Top 10"}</div>

      <Rank data={example_rank} />
    </div>
  );
}
