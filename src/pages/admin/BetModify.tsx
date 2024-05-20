export default function BetModify() {
  const sampleData = [
    {
      _id: "fdasfasf",
      subject: "부먹 찍먹",
      summary: "23명의 사용자 참여",
      deadline: "2024-05-20 23:16:00",
    },
    {
      _id: "fdasfasf",
      subject: "부먹 찍먹",
      summary: "23명의 사용자 참여",
      deadline: "2024-05-20 23:16:00",
    },
    {
      _id: "fdasfasf",
      subject: "부먹 찍먹",
      summary: "23명의 사용자 참여",
      deadline: "2024-05-20 23:16:00",
    },{
      _id: "fdasfasf",
      subject: "부먹 찍먹",
      summary: "23명의 사용자 참여",
      deadline: "2024-05-20 23:16:00",
    },{
      _id: "fdasfasf",
      subject: "부먹 찍먹",
      summary: "23명의 사용자 참여",
      deadline: "2024-05-20 23:16:00",
    },{
      _id: "fdasfasf",
      subject: "부먹 찍먹",
      summary: "23명의 사용자 참여",
      deadline: "2024-05-20 23:16:00",
    },{
      _id: "fdasfasf",
      subject: "부먹 찍먹",
      summary: "23명의 사용자 참여",
      deadline: "2024-05-20 23:16:00",
    },
  ];
  return (
    <div className="flex-1 rounded-xl bg-background-black-950 p-4 flex flex-col gap-4">
      <div>
        <div className="text-xl font-bold">베팅 정보 수정/삭제</div>
        <div className="">정보를 수정/삭제할 베팅을 선택 후 작업해주세요</div>
      </div>

      <input
        className="w-full p-2 transition-all rounded-lg focus:outline-none bg-background-black-800 border border-background-black-300"
        type="text"
        name="Subject"
        placeholder="Subject"
      />

      <div className="grid grid-cols-2 gap-4">
        {sampleData.map((data) => {
          return <div>{Card(data)}</div>;
        })}
      </div>
    </div>
  );
}

function Card({
  _id,
  subject,
  summary,
  deadline,
}: {
  _id: string;
  subject: string;
  summary: string;
  deadline: string;
}) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-background-black-900  rounded-lg hover:bg-background-black-700 transition-all">
      <div className="font-bold">{subject}</div>
      <div>{summary}</div>
      <div>🗓️ {deadline} 마감</div>
    </div>
  );
}
