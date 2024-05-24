import { useState } from "react";
import BettingOrderControl from "./BettingOrderControl";
import BettingCard from "./BettingCard";
import BettingListPaginationController from "./BettingListPaginationController";

// 디버그용 베팅 카드 리스트
const betting_card_lists = [
  {"title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/pic_trulli.jpg"}, 
  {"title" : "더 극혐인거 고르기 : 민트초코 vs 하와이안 피자", "username" : "에이다 러브레이스", "time" : (new Date("2024-03-14 21:14")).getTime(), "participants" : 1111, "img_src" : "https://www.w3schools.com/html/img_girl.jpg"}, 
  {"title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
  {"title" : "무야호", "username" : "김 아무개", "time" : (new Date("1972-11-21 10:40")).getTime(), "participants" : 523, "img_src" : "https://www.w3schools.com/html/img_chania.jpg"}, 
]

export default function BettingList() {
    // 정렬 기준
    const [orderCriterion, setOrderCriterion] = useState<string>('');
    console.log(`orderCriterion : ${orderCriterion}`);
    // 페이지 번호
    const [pageIndex, setPageIndex] = useState<number>(1);

    return (
    <div className="flex flex-col justify-center items-start w-[1024px] relative overflow-hidden gap-4">
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[1024px] h-[70px] text-[35px] font-bold text-left text-white">
      현재 진행중인 베팅 목록
    </p>
    <BettingOrderControl clickedIndex={orderCriterion} setClickedIndex={setOrderCriterion}/>
    
    <div className="flex  justify-start items-start self-stretch flex-wrap h-fit gap-2.5">
      {
        betting_card_lists.map((obj, index)=>(
          <BettingCard key={index} title={obj.title} username={obj.username} time={obj.time} participants={obj.participants} img_src={obj.img_src}/>
        ))
      }
    </div>
    <BettingListPaginationController idx={pageIndex} lastIdx={20} setIdx={setPageIndex}/>
  </div>
)}