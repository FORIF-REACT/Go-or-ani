import { useEffect, useState } from "react";
import BettingOrderControl from "./BettingOrderControl";
import BettingCard from "./BettingCard";
import BettingListPaginationController from "./BettingListPaginationController";
import { BettingInfoDto } from "./BettingInfoDto";
import { BettingInfoDtoFromDB } from "./BettingInfoDtoFromDB";
import BettingModal from "./BettingModal";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { convertBettingInfoDto } from "./ConvertBettingDtos";
import { API_URL } from "./constants";

// 디버그용 베팅 카드 리스트
/*const betting_card_lists: BettingInfoDto[] = [
  {"id": 1, "title": "무야호", "username": "김 아무개", "time": (new Date("1972-11-21 10:40")).getTime(), "participants": 523, "img_src": "https://www.w3schools.com/html/pic_trulli.jpg", selections: ["무한", "무야호", "엄마 나 이번에", "퇴비쌓기 올리기 1등했어요", "와우", "Never say never"], deadline:1713735000000}, 
  {"id": 2, "title": "더 극혐인거 고르기 : 민트초코 vs 하와이안 피자", "username": "에이다 러브레이스", "time": (new Date("2024-03-14 21:14")).getTime(), "participants": 1111, "img_src": "https://www.w3schools.com/html/img_girl.jpg", selections: ["민트초코", "하와이안 피자", "민트초코 하와이안 피자"], deadline:1713735000000}, 
  {"id": 3, "title": "사나이 눈물", "username": "김 아무개", "time": (new Date("1972-11-21 10:40")).getTime(), "participants": 523, "img_src": "https://www.w3schools.com/html/img_chania.jpg", selections: ["약하다", "욕하지마"], deadline:1713735000000},  
  {"id": 4, "title": "최고의 휴양지 고르기 : 몰디브 vs 발리", "username": "제임스 본드", "time": (new Date("2023-05-21 14:00")).getTime(), "participants": 789, "img_src": "https://www.w3schools.com/html/pic_trulli.jpg", selections: ["몰디브", "발리"], deadline:1713735000000}, 
  {"id": 5, "title": "라면에 계란 넣기 vs 안넣기", "username": "나미", "time": (new Date("2024-01-12 08:45")).getTime(), "participants": 932, "img_src": "https://www.w3schools.com/html/img_girl.jpg", selections: ["넣기", "안넣기"], deadline:1713735000000}, 
  {"id": 6, "title": "아이언맨 vs 배트맨", "username": "토니 스타크", "time": (new Date("2024-02-19 13:30")).getTime(), "participants": 2045, "img_src": "https://www.w3schools.com/html/img_chania.jpg", selections: ["아이언맨", "배트맨"], deadline:1713735000000}, 
  {"id": 7, "title": "여름휴가 가기 좋은 곳 : 제주도 vs 부산", "username": "이순신", "time": (new Date("2023-07-15 09:20")).getTime(), "participants": 1100, "img_src": "https://www.w3schools.com/html/pic_trulli.jpg", selections: ["제주도", "부산"], deadline:1713735000000}, 
  {"id": 8, "title": "아침형 인간 vs 저녁형 인간", "username": "오스카 와일드", "time": (new Date("2024-04-22 06:30")).getTime(), "participants": 850, "img_src": "https://www.w3schools.com/html/img_girl.jpg", selections: ["아침형", "저녁형"], deadline:1713735000000}, 
  {"id": 9, "title": "최고의 판타지 소설 : 반지의 제왕 vs 해리포터", "username": "조지 RR 마틴", "time": (new Date("2023-12-11 17:50")).getTime(), "participants": 1750, "img_src": "https://www.w3schools.com/html/img_chania.jpg", selections: ["반지의 제왕", "해리포터"], deadline:1713735000000},
  {"id": 10, "title": "음악 듣기 좋은 시간 : 아침 vs 저녁", "username": "베토벤", "time": (new Date("2024-05-10 20:20")).getTime(), "participants": 1325, "img_src": "https://www.w3schools.com/html/pic_trulli.jpg", selections: ["아침", "저녁"], deadline:1713735000000}
];*/

export default function BettingList() {

    const PER_PAGE = 12;
    
    const [searchParams] = useSearchParams();

    // 정렬 기준
    const initial_sort:string = searchParams.get("sort")||"";

    const [orderCriterion, setOrderCriterion] = useState<string>(initial_sort);
    const [prevOrderCriterion, setPrevOrderCriterion] = useState<string>(initial_sort);
    /*
    		공통조건 : deadline이 Date.now()보다 큼
		if recent -> id순으로 정렬
		if ending_soon -> deadline이 작은 순으로 정렬
		if high_engagement -> 무리
		if high_stakes -> 무리
    */
    const sort_query_map : {[key:string] : string} = {
      "" : `&deadline_gt=${Date.now()}&_sort=created_date`,
      "recent" : `&deadline_gt=${Date.now()}&_sort=created_date`,
      "ending_soon" : `&deadline_gt=${Date.now()}&_sort=deadline`,
      "high_engagement" : `&deadline_gt=${Date.now()}&_sort=created_date`, //미구현
      "high_stakes" : `&deadline_gt=${Date.now()}&_sort=created_date`,     //미구현
      "ended" : `&deadline_lt=${Date.now()}` // 종료된 베팅
    } 
    
    // 유저 아이디
    const user_id:string = searchParams.get("user_id")||"";
    
    // get으로 받아온 쿼리가 안 보이도록 삭제 (user_id 제외)
    history.replaceState({}, "", user_id != "" ? `/bettinglist?user_id=${user_id}` : '/bettinglist');
    
    // 베팅 카드 DTO 객체의 리스트
    const [betting_cards_list, setBettingCardList] = useState<BettingInfoDto[]|null>(null);

    // 페이지 번호
    const [pageIndex, setPageIndex] = useState<number>(1);
    // 페이지 번호 바뀌는거 감지용
    const [prevIndex, setPrevIndex] = useState<number>(1);
    // 클릭된 BettingInfo
    const [selectedBettingInfo, setSelectedBettingInfo] = useState<BettingInfoDto|null>(null);
    const [username_of_user_id, setUsernameOfUserID] = useState<string>("");
    const [lastIdx, setLastIdx] = useState<number>(-1);
    // 접속한 유저의 id
    const [my_id, setMyID] = useState<string|null>(null);

    useEffect(() => {
      (async() => {
        //try{
        if(my_id === null) {
          // @ API써서 ID 받아오는거 여기에 추가하라
        }

        if(user_id == "") {
          if(betting_cards_list == null || prevIndex != pageIndex || prevOrderCriterion != orderCriterion) {
            const betting_card_from_DB_list: BettingInfoDtoFromDB[] = (await axios.get(`${API_URL}/betting?_page=${pageIndex}&_per_page=${PER_PAGE}${sort_query_map[orderCriterion]}`)).data.data;
            console.log(betting_card_from_DB_list);
            let bt_list : BettingInfoDto[] = [];
            for(let i=0; i<betting_card_from_DB_list.length; i++) 
            {
              const obj : BettingInfoDtoFromDB = betting_card_from_DB_list[i];
              const user_id_of_obj:number = obj.host_id;
              
              let username_of_obj:string = "USER";
              try {
                username_of_obj = (await axios.get(`${API_URL}/users/${user_id_of_obj}`)).data.username;
              }
              catch {
                console.log("유저정보 불러오기에 실패함")
              }
              bt_list.push(convertBettingInfoDto(obj, username_of_obj, getRandomImageUrl(obj.host_id)));
            }
            setBettingCardList(bt_list);
            if(prevIndex != pageIndex){
              setPrevIndex(pageIndex);
            }
            if(prevOrderCriterion != orderCriterion) {
              setPrevOrderCriterion(orderCriterion);
            }
          }

          if(lastIdx == -1) {
            const all_betting_card_from_DB_list: BettingInfoDtoFromDB[] = (await axios.get(`${API_URL}/betting`)).data;
            setLastIdx( ~~((all_betting_card_from_DB_list.length - 1)/PER_PAGE) + 1 );
          }
        }
        else {
          if(username_of_user_id == "") {
            setUsernameOfUserID((await axios.get(`${API_URL}/users/${user_id}`)).data.username);
          }

          if(betting_cards_list == null || prevIndex != pageIndex|| prevOrderCriterion != orderCriterion) {
            if(prevIndex != pageIndex){
              setPrevIndex(pageIndex);
            }
            if(prevOrderCriterion != orderCriterion) {
              setPrevOrderCriterion(orderCriterion);
            }
            const betting_card_from_DB_list: BettingInfoDtoFromDB[] = (await axios.get(`${API_URL}/betting?_page=${pageIndex}&_per_page=${PER_PAGE}&host_id=${user_id}${sort_query_map[orderCriterion]}`)).data.data;
            console.log("API 호출함!");
            let bt_list : BettingInfoDto[] = [];
            for(let i=0; i<betting_card_from_DB_list.length; i++) 
            {
              const obj : BettingInfoDtoFromDB = betting_card_from_DB_list[i];
              const user_id_of_obj:number = obj.host_id;
              const username_of_obj:string = (await axios.get(`${API_URL}/users/${user_id_of_obj}`)).data.username;
              bt_list.push(convertBettingInfoDto(obj, username_of_obj, getRandomImageUrl(obj.host_id)));
            }
            setBettingCardList(bt_list);
          }

          if(lastIdx == -1) {
            const all_betting_card_from_DB_list: BettingInfoDtoFromDB[] = (await axios.get(`${API_URL}/betting?host_id=${user_id}`)).data;
            setLastIdx( ~~((all_betting_card_from_DB_list.length - 1)/PER_PAGE) + 1 );
          }        
        }
      //} catch {
      //  alert("에러!");
      //}
      })();
    });

    return (
    <div className="flex flex-col justify-center items-start w-[1024px] relative overflow-hidden gap-4">
    <p className="self-stretch flex-grow-0 flex-shrink-0 w-[1024px] h-[70px] text-2xl font-bold text-left text-white pt-6">      
      {orderCriterion == "ended" ? "종료된 베팅 " : (user_id == "" ? "현재 진행중인 베팅 목록" : `유저 ${username_of_user_id}의 베팅목록`)}
    </p>
    { orderCriterion != "ended" && <BettingOrderControl clickedIndex={orderCriterion} setClickedIndex={setOrderCriterion}/>}
    
    <div className="flex justify-center items-start self-stretch flex-wrap h-fit gap-2.5">
      <div className="w-[1000px] h-fit flex justify-start items-start gap-3 flex-wrap">
        {
          betting_cards_list != null ? betting_cards_list.map((obj)=>(
            <BettingCard key={obj.id} bettingInfoDto={obj} setSelectedBettingInfo={setSelectedBettingInfo}/>
          )) : null
        }
      </div>
    </div>
    <BettingListPaginationController idx={pageIndex} lastIdx={lastIdx} setIdx={setPageIndex}/>
    {selectedBettingInfo && (<BettingModal selectedBettingInfo={selectedBettingInfo} setSelectedBettingInfo={setSelectedBettingInfo}/>)}
  </div>
)}


// host_id에 따라 랜덤한 W3C 예시 이미지를 뱉는 함수
function getRandomImageUrl(seed: number): string {
  const urls = [
      "https://www.w3schools.com/html/pic_trulli.jpg",
      "https://www.w3schools.com/html/img_girl.jpg",
      "https://www.w3schools.com/html/img_chania.jpg"
  ];

  // 시드값을 사용하여 0, 1, 2 중 하나의 값을 생성
  const index = Math.abs(seed) % urls.length;

  return urls[index];
}