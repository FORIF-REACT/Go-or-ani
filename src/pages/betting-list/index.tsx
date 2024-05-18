import { useState } from "react";
import BettingOrderControl from "./BettingOrderControl";
import BettingCard from "./BettingCard";
import BettingListPaginationController from "./BettingListPaginationController";



export default function BettingList() {
    // 정렬 기준
    const [orderCriterion, setOrderCriterion] = useState<string>('');
    console.log(`orderCriterion : ${orderCriterion}`);
    // 페이지 번호
    const [pageIndex, setPageIndex] = useState<number>(1);

    return (
    <div className="flex flex-col justify-center items-start w-[1024px] relative overflow-hidden gap-4">
    <button onClick={()=>{document.body.style.backgroundColor = "black";}}>디버그용 버튼(배경 검게 만들기)</button>
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[1024px] h-[70px] text-[35px] font-bold text-left text-white">
      현재 진행중인 베팅 목록
    </p>
    <BettingOrderControl clickedIndex={orderCriterion} setClickedIndex={setOrderCriterion}/>
    
    <div className="flex  justify-start items-start self-stretch flex-wrap h-fit gap-2.5">
      <BettingCard title="무야호" username="김 아무개" time={(new Date("2024-05-18 21:14")).getTime()} participants={523} img_src="https://www.w3schools.com/html/pic_trulli.jpg"/>
      <BettingCard title="더 극혐인거 고르기 : 민트초코 vs 하와이안 피자" username="에이다 러브레이스" time={(new Date("2024-03-14 21:14")).getTime()} participants={1111} img_src="https://www.w3schools.com/html/img_girl.jpg"/>
      <BettingCard title="테스트" username="김두한" time={(new Date("1972-11-21 10:40")).getTime()} participants={7327} img_src="https://www.w3schools.com/html/img_chania.jpg"/>
      <BettingCard title="테스트" username="김두한" time={(new Date("1972-11-21 10:40")).getTime()} participants={7327} img_src="https://www.w3schools.com/html/img_chania.jpg"/>
      <BettingCard title="테스트" username="김두한" time={(new Date("1972-11-21 10:40")).getTime()} participants={7327} img_src="https://www.w3schools.com/html/img_chania.jpg"/>
      <BettingCard title="테스트" username="김두한" time={(new Date("1972-11-21 10:40")).getTime()} participants={7327} img_src="https://www.w3schools.com/html/img_chania.jpg"/>
      <BettingCard title="테스트" username="김두한" time={(new Date("1972-11-21 10:40")).getTime()} participants={7327} img_src="https://www.w3schools.com/html/img_chania.jpg"/>
      <BettingCard title="테스트" username="김두한" time={(new Date("1972-11-21 10:40")).getTime()} participants={7327} img_src="https://www.w3schools.com/html/img_chania.jpg"/>
      <BettingCard title="테스트" username="김두한" time={(new Date("1972-11-21 10:40")).getTime()} participants={7327} img_src="https://www.w3schools.com/html/img_chania.jpg"/>
      <BettingCard title="테스트" username="김두한" time={(new Date("1972-11-21 10:40")).getTime()} participants={7327} img_src="https://www.w3schools.com/html/img_chania.jpg"/>
      <BettingCard title="테스트" username="김두한" time={(new Date("1972-11-21 10:40")).getTime()} participants={7327} img_src="https://www.w3schools.com/html/img_chania.jpg"/>
      <BettingCard title="테스트" username="김두한" time={(new Date("1972-11-21 10:40")).getTime()} participants={7327} img_src="https://www.w3schools.com/html/img_chania.jpg"/>
    </div>
    <BettingListPaginationController idx={pageIndex} lastIdx={20} setIdx={setPageIndex}/>
  </div>
)}