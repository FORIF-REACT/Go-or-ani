/**
 * Rank list Component
 * * Wrote by SJ
 * @param ranks This parameter is for map of top 10 users and points they got
 * @returns Component that shows list of top 10 users who got the most points
 *
 * TODO None
 */

type Rank = {
  _id: string;
  point: number;
};

export default function Rank({ ranks }: { ranks: Rank[] }) {
  return (
    <div>
      <div className={"flex flex-row w-full rounded-lg p-2 bg-opacity-50"}>
        <div className="basis-1/4">순위</div>
        <div className="basis-1/2">ID</div>
        <div className="basis-1/4 text-right">얻은 포인트</div>
      </div>
      {ranks.map((rank, i) => {
        return Rank_Row(i + 1, rank);
      })}
    </div>
  );
}

function Rank_Row(position: number, rank: Rank) {
  const { _id, point } = rank;
  const bgColor: string =
    position == 1
      ? "bg-yellow-400"
      : position == 2
      ? "bg-gray-400"
      : position == 3
      ? "bg-orange-800"
      : "";

  return (
    <div
      className={"flex flex-row w-full rounded-lg p-2 bg-opacity-50 " + bgColor}
    >
      <div className="basis-1/4">{position}</div>
      <div className="basis-1/2">{_id}</div>
      <div className="basis-1/4 text-right">{point}</div>
    </div>
  );
}
