import { useState } from "react";
import BettingOrderControl from "./BettingOrderControl";
import BettingCard from "./BettingCard";
import BettingListPaginationController from "./BettingListPaginationController";
import { BettingInfoDto } from "./BettingInfoDto";
import BettingModal from "./BettingModal";
import { useSearchParams } from "react-router-dom";

// 디버그용 베팅 카드 리스트
const betting_card_lists: BettingInfoDto[] = [
  {"id": 1, "title": "무야호", "username": "김 아무개", "time": (new Date("1972-11-21 10:40")).getTime(), "participants": 523, "img_src": "https://www.w3schools.com/html/pic_trulli.jpg", selections: ["무한", "무야호", "엄마 나 이번에", "퇴비쌓기 올리기 1등했어요", "와우", "Never say never"]}, 
  {"id": 2, "title": "더 극혐인거 고르기 : 민트초코 vs 하와이안 피자", "username": "에이다 러브레이스", "time": (new Date("2024-03-14 21:14")).getTime(), "participants": 1111, "img_src": "https://www.w3schools.com/html/img_girl.jpg", selections: ["민트초코", "하와이안 피자", "민트초코 하와이안 피자"]}, 
  {"id": 3, "title": "사나이 눈물", "username": "김 아무개", "time": (new Date("1972-11-21 10:40")).getTime(), "participants": 523, "img_src": "https://www.w3schools.com/html/img_chania.jpg", selections: ["약하다", "욕하지마"]},  
  {"id": 4, "title": "최고의 휴양지 고르기 : 몰디브 vs 발리", "username": "제임스 본드", "time": (new Date("2023-05-21 14:00")).getTime(), "participants": 789, "img_src": "https://www.w3schools.com/html/pic_trulli.jpg", selections: ["몰디브", "발리"]}, 
  {"id": 5, "title": "라면에 계란 넣기 vs 안넣기", "username": "나미", "time": (new Date("2024-01-12 08:45")).getTime(), "participants": 932, "img_src": "https://www.w3schools.com/html/img_girl.jpg", selections: ["넣기", "안넣기"]}, 
  {"id": 6, "title": "아이언맨 vs 배트맨", "username": "토니 스타크", "time": (new Date("2024-02-19 13:30")).getTime(), "participants": 2045, "img_src": "https://www.w3schools.com/html/img_chania.jpg", selections: ["아이언맨", "배트맨"]}, 
  {"id": 7, "title": "여름휴가 가기 좋은 곳 : 제주도 vs 부산", "username": "이순신", "time": (new Date("2023-07-15 09:20")).getTime(), "participants": 1100, "img_src": "https://www.w3schools.com/html/pic_trulli.jpg", selections: ["제주도", "부산"]}, 
  {"id": 8, "title": "아침형 인간 vs 저녁형 인간", "username": "오스카 와일드", "time": (new Date("2024-04-22 06:30")).getTime(), "participants": 850, "img_src": "https://www.w3schools.com/html/img_girl.jpg", selections: ["아침형", "저녁형"]}, 
  {"id": 9, "title": "최고의 판타지 소설 : 반지의 제왕 vs 해리포터", "username": "조지 RR 마틴", "time": (new Date("2023-12-11 17:50")).getTime(), "participants": 1750, "img_src": "https://www.w3schools.com/html/img_chania.jpg", selections: ["반지의 제왕", "해리포터"]},
  {"id": 10, "title": "음악 듣기 좋은 시간 : 아침 vs 저녁", "username": "베토벤", "time": (new Date("2024-05-10 20:20")).getTime(), "participants": 1325, "img_src": "https://www.w3schools.com/html/pic_trulli.jpg", selections: ["아침", "저녁"]}
];

export default function BettingList() {
    const [searchParams] = useSearchParams();

    // 정렬 기준
    const initial_sort:string = searchParams.get("sort")||"";
    const [orderCriterion, setOrderCriterion] = useState<string>(initial_sort);
    
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
    <div className="flex justify-center items-start self-stretch flex-wrap h-fit gap-2.5">
      <div className="w-[1000px] h-fit flex justify-start items-start gap-3 flex-wrap">
        {
          betting_card_lists.map((obj)=>(
            <BettingCard key={obj.id} bettingInfoDto={obj} setSelectedBettingInfo={setSelectedBettingInfo}/>
          ))
        }
      </div>
    </div>
    <BettingListPaginationController idx={pageIndex} lastIdx={20} setIdx={setPageIndex}/>
    {selectedBettingInfo && (<BettingModal selectedBettingInfo={selectedBettingInfo} setSelectedBettingInfo={setSelectedBettingInfo}/>)}
  </div>
)}