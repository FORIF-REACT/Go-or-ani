// import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

export default function BetModifyDetail() {
  const sampleData = [
    {
      _id: "fdasfasf",
      subject: "부먹 찍먹",
      summary: "23명의 사용자 참여",
      deadline: "2024-05-20 23:16:00",
    },
  ];

  // const params = useParams();

  return (
    <div className="flex-1 rounded-xl bg-background-black-950 p-4 flex flex-col gap-4">
      <Link to="/admin/modifybet">
        ← 목록으로
      </Link>
      <div>
        <div className="text-xl font-bold">{sampleData[0].subject}</div>
        <div className="">{sampleData[0].summary}</div>
        <div className="">{sampleData[0].deadline}</div>
      </div>
      
      {/*Form Start*/}

      <form className="flex flex-col w-full gap-4">
        <div className="flex flex-row items-center gap-4">
          <div className="w-20">{"_id"}</div>
          <input
                className="flex-1 p-2 bg-background-black-950 transition-all rounded focus:outline-none "
                type="text"
                name="_id"
                placeholder="_id"
                disabled={true}
              />
        </div>

        <div className="flex flex-row items-center gap-4">
          <div className="w-20">{"Subject"}</div>
          <input
            className="flex-1 p-2 bg-background-black-800 transition-all rounded focus:outline-none"
            type="text"
            name="Subject"
            placeholder="Subject"
          />
        </div>

        <div className="flex flex-row items-center gap-4">
          <div className="w-20">{"Summary"}</div>
          <input
            className="flex-1 p-2 bg-background-black-800 transition-all rounded focus:outline-none"
            type="text"
            name="Summary"
            placeholder="Summary"
          />
        </div>

        <div className="flex flex-row items-center gap-4">
          <div className="w-20">{"Selection1"}</div>
          <input
            className="flex-1 p-2 bg-background-black-800 transition-all rounded focus:outline-none"
            type="text"
            name="Selection1"
            placeholder="Selection1"
          />
        </div>

        <div className="flex flex-row items-center gap-4">
          <div className="w-20">{"Selection2"}</div>
          <input
            className="flex-1 p-2 bg-background-black-800 transition-all rounded focus:outline-none"
            type="text"
            name="Selection2"
            placeholder="Selection2"
          />
        </div>

        <div className="w-full flex justify-end">
          <input
            className="h-10 mt-2 px-6 py-2 text-white transition-all rounded border border-background-black-400"
            type="submit"
            value="베팅 수정"
          />
        </div>
      </form>
    </div>
  );
}
