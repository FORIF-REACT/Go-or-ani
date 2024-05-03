import Divider from "./Divider";

export default function UserModify() {
  const sampleData = [
    { name: "강한민", age: "23", gender: "남" },
    { name: "이두혁", age: "23", gender: "남" },
    { name: "조성진", age: "23", gender: "남" },
  ];

  return (
    <div>
      <Divider />

      <div className="text-4xl font-bold text-slate-600 pb-2">
        사용자 정보 수정 / 삭제
      </div>
      <div className="text-2xl text-slate-600">
        사용자를 선택 후 수정해주세요
      </div>

      <Divider />

      <div className="flex flex-col gap-4">
        {sampleData.map((value) => {
          return (
            <div className="flex flex-row gap-4 p-4 rounded bg-slate-600 hover:bg-black transition-all">
              <div className="text-white">{value.name}</div>
              <div className="text-white">{value.age}</div>
              <div className="text-white">{value.gender}</div>
            </div> 
          );
        })}
      </div>
    </div>
  );
}
