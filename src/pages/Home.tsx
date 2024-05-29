function Home() {
  return (
    <div className="w-[1024px] mt-10 flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
            <div className="basis-1/6"/>
            <div className="basis-5/6 text-xl text-primary-green-300 font-bold">실시간 인기 베팅</div>
        </div>
        <div className="flex flex-row items-center gap-4">
            <button className="basis-1/6 h-40 text-2xl font-bold text-primary-green-300 hover:text-primary-purple-500">⟨</button>
            <button className="basis-4/6 h-60 select-none cursor-pointer transition flex justify-start items-start flex-grow-0 flex-shrink-0 gap-4 p-[17px] hover:bg-background-black-950 border-4 hover:border-primary-purple-500 bg-[#d9d9d9] border-primary-green-300 hover:text-[#d9d9d9] text-background-black-950">01</button>
            <button className="basis-1/6 h-40 text-2xl font-bold text-primary-green-300 hover:text-primary-purple-500">⟩</button>  
        </div>
        <div className="flex flex-row-reverse basis-1/6 gap-4">
            <div className="basis-1/6"/>
            <div className="text-xl font-bold text-white">종료까지 00:03:48</div>
        </div>
        <div className="flex flex-row items-center gap-4">
            <div className="basis-1/6"/>
            <div className="basis-5/6 text-xl text-primary-green-300 font-bold">마감 직전인 베팅</div>
        </div>
        <div className="select-none cursor-pointer transition flex flex-row h-40">
            <div className="basis-1/6"/>
            <button className="basis-2/6 hover:bg-background-black-950 border-4 hover:border-primary-purple-500 bg-[#d9d9d9] border-primary-green-300 hover:text-[#d9d9d9] text-background-black-950">01</button>
            <button className="basis-2/6 hover:bg-background-black-950 border-4 hover:border-primary-purple-500 bg-[#d9d9d9] border-primary-green-300 hover:text-[#d9d9d9] text-background-black-950">02</button>
            <div className="basis-1/6"/>
         </div>
        <div className="flex flex-row items-center gap-4">
            <div className="basis-1/6"/>
            <div className="basis-5/6 text-xl text-primary-green-300 font-bold">최근 생성된 베팅</div>
        </div>
        <div className="select-none cursor-pointer transition flex flex-row h-40">
            <div className="basis-1/6"/>
            <button className="basis-2/6 hover:bg-background-black-950 border-4 hover:border-primary-purple-500 bg-[#d9d9d9] border-primary-green-300 hover:text-[#d9d9d9] text-background-black-950">01</button>
            <button className="basis-2/6 hover:bg-background-black-950 border-4 hover:border-primary-purple-500 bg-[#d9d9d9] border-primary-green-300 hover:text-[#d9d9d9] text-background-black-950">02</button>
            <div className="basis-1/6"/>
         </div>
    </div>
  );
};

export default Home;
