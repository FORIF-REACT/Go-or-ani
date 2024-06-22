export default function PercentageBarpurple({
  title,
  ratio,
  selections,
}: {
  title: string;
  ratio: number;
  selections: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <div>{title}</div>

      <div className="w-full flex flex-row">
        <div
          style={{ flexBasis: `${ratio * 100}%` }}
          className={`h-10 bg-primary-purple-300 rounded-l-md animate-in`}
        />
        <div className={"h-10 flex-auto bg-primary-purple-600 rounded-r-md"} />
      </div>

      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-col justify-start">
          <div className="font-bold opacity-50">
            {Math.round(ratio * 10000) / 100}
          </div>
          <div className="opacity-50">{selections[0]}</div>
        </div>
        <div className="flex flex-col items-end">
          <div className="font-bold opacity-50">
            {Math.round((1 - ratio) * 10000) / 100}
          </div>
          <div className="opacity-50">{selections[1]}</div>
        </div>
      </div>
    </div>
  );
}
