/**
 * Percentage bar Component
 * * Wrote by SJ
 * @param percent This parameter is for percentage of one of choices e.g. 0.3 for (30%)
 * @returns Component that shows percentage of each choices
 *
 * TODO None
 */

export default function Percentagebar({ percent }: { percent: number }) {
  return (
    <>
      <div className="w-full flex flex-row justify-between">
        <div className="text-slate-400">
          {Math.round(percent * 10000) / 100}
        </div>
        <div className="text-slate-600">
          {Math.round((1 - percent) * 10000) / 100}
        </div>
      </div>
      <div className="w-full flex flex-row">
        <div
          style={{ flexBasis: `${percent * 100}%` }}
          className={`h-6 bg-slate-400 rounded-l-md hover:shadow-[0_0_20px_-5px_rgba(0,0,0,0.1)] hover:shadow-slate-400 transition-all`}
        />
        <div
          className={
            "h-6 flex-auto bg-slate-600 rounded-r-md hover:shadow-[0_0_20px_-5px_rgba(0,0,0,0.1)] hover:shadow-slate-600 transition-all"
          }
        />
      </div>
    </>
  );
}
