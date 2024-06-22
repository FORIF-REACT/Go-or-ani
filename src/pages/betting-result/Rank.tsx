type Rank = {
  id: string;
  point: number;
}[];

export default function Rank({ data }: { data: Rank }) {

  return (
    <div className="flex flex-col">
      {data.sort().reverse().map((item, i) => {
        return (
          <div className="flex flex-row hover:bg-primary-green-300 hover:text-background-black-950 p-4 transition-all rounded-lg">
            <div className="basis-[10%] text-center text-xl font-bold pr-16">
              {i + 1}
            </div>
            <div className="basis-[80%] text-xl font-bold">{item.id}</div>
            <div className="basis-[15%] text-right text-xl font-bold">
              {item.point}
            </div>
          </div>
        );
      })}
    </div>
  );
}
