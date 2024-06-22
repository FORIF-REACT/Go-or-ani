export default function UserAdd() {
  return (
    <div className="flex-1 rounded-xl bg-background-black-950 p-4 flex flex-col gap-4">
      <div>
        <div className="text-xl font-bold">사용자 추가</div>
        <div className="">
          추가할 사용자의 닉네임, ID, 그리고 비밀번호를 입력해주세요
        </div>
      </div>

      {/*Form Start*/}

      <form className="flex flex-col w-full gap-4">
        <div className="flex flex-row items-center gap-4">
          <div className="w-20">{"ID"}</div>
          <input
            className="flex-1 p-2 transition-all rounded focus:outline-none bg-background-black-800"
            type="text"
            name="ID"
            placeholder="ID"
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
            className="h-10 mt-2 px-6 py-2 text-white transition-all rounded border border-background-black-400"
            type="submit"
            value="사용자 추가"
          />
        </div>
      </form>
    </div>
  );
}
