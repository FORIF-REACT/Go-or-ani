import Divider from "./Divider";

export default function UserAdd() {
  return (
    <div>
      <Divider />

      <div className="text-4xl font-bold text-slate-600 pb-2">사용자 추가</div>
      <div className="text-2xl text-slate-600">
        추가할 사용자의 정보를 입력해주세요
      </div>

      <Divider />

      <form className="flex flex-col">
        <input
          className="p-2 my-3 shadow-[0_0_20px_-5px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.2)] transition-all rounded focus:outline-none"
          type="text"
          name="ID"
          placeholder="ID"
        />

        <input
          className="p-2 my-3 shadow-[0_0_20px_-5px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.2)] transition-all rounded focus:outline-none"
          type="password"
          name="Password"
          placeholder="Password"
        />

        <input
          className="p-2 my-3 shadow-[0_0_20px_-5px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.2)] transition-all rounded focus:outline-none"
          type="password"
          name="Password Confirm"
          placeholder="Password Confirm"
        />
        <input className=" h-10 mt-3 text-white bg-slate-600 shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.5)] transition-all rounded" type="submit" value="추가" />
      </form>
    </div>
  );
}
