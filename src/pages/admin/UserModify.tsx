import { useState } from "react";

export default function UserModify() {
  const sampleData = [
    { name: "강한민", age: "23", gender: "남" },
    { name: "이두혁", age: "23", gender: "남" },
    { name: "조성진", age: "23", gender: "남" },
    { name: "손정협", age: "23", gender: "남" },
    { name: "손정효", age: "23", gender: "남" },
  ];

  const [selected, setSelected] = useState(-1);

  return (
    <div className="flex-1 rounded-xl bg-background-black-950 p-4 flex flex-col gap-4">
      <div>
        <div className="text-xl font-bold">사용자 수정/삭제</div>
        <div className="">사용자를 선택 후 수정해주세요</div>
      </div>

      <div className="flex flex-row gap-8">
        <div className="basis-1/4 ">
          <input
            className="w-full p-2 transition-all rounded-lg focus:outline-none bg-background-black-800 border border-background-black-300"
            type="text"
            name="Username"
            placeholder="Username"
          />
          <div className="flex flex-col">
            {sampleData.map((value, i) => {
              return (
                <div
                  onClick={() => {
                    setSelected(i);
                  }}
                  style={i == selected ? { backgroundColor: "#5D5D5D" } : {}}
                  className="rounded-lg py-2 hover:bg-background-black-900 transition-all"
                >
                  <div className="pl-4">{value.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1">
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
              <div className="w-20">{"Username"}</div>
              <input
                className="flex-1 p-2 bg-background-black-800 transition-all rounded focus:outline-none"
                type="text"
                name="Username"
                placeholder="Username"
              />
            </div>

            <div className="flex flex-row items-center gap-4">
              <div className="w-20">{"ID"}</div>
              <input
                className="flex-1 p-2 bg-background-black-800 transition-all rounded focus:outline-none"
                type="text"
                name="ID"
                placeholder="ID"
              />
            </div>

            <div className="flex flex-row items-center gap-4">
              <div className="w-20">{"Point"}</div>
              <input
                className="flex-1 p-2 bg-background-black-800 transition-all rounded focus:outline-none"
                type="text"
                name="Point"
                placeholder="Point"
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
              <div className="w-20">{"Password"}</div>
              <input
                className="flex-1 p-2 bg-background-black-800 transition-all rounded focus:outline-none"
                type="password"
                name="Password"
                placeholder="Password"
              />
            </div>

            <div className="flex flex-row items-center gap-4">
              <div className="w-20">
                Password
                <br />
                Confirm
              </div>

              <input
                className="flex-1 p-2 bg-background-black-800 transition-all rounded focus:outline-none"
                type="password"
                name="Password Confirm"
                placeholder="Password Confirm"
              />
            </div>

            <div className="w-full flex justify-end">
              <input
                className="h-10 mt-2 px-6 text-white transition-all rounded border border-background-black-400"
                type="submit"
                value="사용자 수정"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
