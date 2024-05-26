import { useState } from "react";
import BettingOrderControl from "./BettingOrderControl";
import BettingCard from "./BettingCard";
import BettingListPaginationController from "./BettingListPaginationController";
import { BettingInfoDto } from "./BettingInfoDto";
import BettingModal from "./BettingModal";
import { useSearchParams } from "react-router-dom";

// 디버그용 베팅 카드 리스트
const betting_card_lists : BettingInfoDto[] = [
  {"id": 1, "title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/pic_trulli.jpg"}, 
  {"id": 2, "title" : "더 극혐인거 고르기 : 민트초코 vs 하와이안 피자", "username" : "에이다 러브레이스", "time" : (new Date("2024-03-14 21:14")).getTime(), "participants" : 1111, "img_src" : "https://www.w3schools.com/html/img_girl.jpg"}, 
  {"id": 3, "title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"id": 4, "title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"id": 5, "title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"id": 6, "title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"id": 7, "title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"id": 8, "title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"id": 9, "title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"id": 10, "title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"id": 11, "title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"id": 12, "title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"id": 13, "title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
]

export default function BettingList() {
    const [searchParams] = useSearchParams();

    // 정렬 기준
    const initial_sort:string = searchParams.get("sort")||"";
    const [orderCriterion, setOrderCriterion] = useState<string>(initial_sort);
    console.log(`orderCriterion : ${orderCriterion}`);
    
    // get으로 받아온 쿼리가 안 보이도록 삭제
    history.replaceState({}, "", '/bettinglist');
    
    // 페이지 번호
    const [pageIndex, setPageIndex] = useState<number>(1);
    // 클릭된 BettingInfo
    const [selectedBettingInfo, setSelectedBettingInfo] = useState<BettingInfoDto|null>(null);

    return (
    <div className="flex flex-col justify-center items-start w-[1024px] relative overflow-hidden gap-4">
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[1024px] h-[70px] text-[35px] font-bold text-left text-white">
      현재 진행중인 베팅 목록
    </p>
    <BettingOrderControl clickedIndex={orderCriterion} setClickedIndex={setOrderCriterion}/>
    <div className="flex  justify-start items-start self-stretch flex-wrap h-fit gap-2.5">
      {
        betting_card_lists.map((obj)=>(
          <BettingCard key={obj.id} bettingInfoDto={obj} setSelectedBettingInfo={setSelectedBettingInfo}/>
        ))
      }
    </div>
    <BettingListPaginationController idx={pageIndex} lastIdx={20} setIdx={setPageIndex}/>
    <BettingModal selectedBettingInfo={selectedBettingInfo} setSelectedBettingInfo={setSelectedBettingInfo}/>
  </div>
)}