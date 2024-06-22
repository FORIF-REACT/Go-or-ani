import { useState, useEffect } from "react";
import BettingOrderControl from "../betting-list/BettingOrderControl";
import BettingCard from "../betting-list/BettingCard";
import BettingListPaginationController from "../betting-list/BettingListPaginationController";
import { BettingInfoDto } from "../betting-list/BettingInfoDto";
import BettingModal from "../betting-list/BettingModal";
import { useSearchParams } from "react-router-dom";

// 디버그용 베팅 카드 리스트
const betting_card_lists: BettingInfoDto[] = [
  {"id": 1, "title": "무야호", "username": "김 아무개", "time": (new Date("1972-11-21 10:40")).getTime(), "participants": 523, "img_src": "https://www.w3schools.com/html/pic_trulli.jpg", selections: ["무한", "무야호"]}, 
  {"id": 2, "title": "더 극혐인거 고르기 : 민트초코 vs 하와이안 피자", "username": "에이다 러브레이스", "time": (new Date("2024-03-14 21:14")).getTime(), "participants": 1111, "img_src": "https://www.w3schools.com/html/img_girl.jpg", selections: ["민트초코", "하와이안 피자", "민트초코 하와이안 피자"]}, 
  {"id": 3, "title": "사나이 눈물", "username": "김 아무개", "time": (new Date("1972-11-21 10:40")).getTime(), "participants": 523, "img_src": "https://www.w3schools.com/html/img_chania.jpg", selections: ["약하다", "욕하지마"]},  
  {"id": 4, "title": "최고의 휴양지 고르기 : 몰디브 vs 발리", "username": "제임스 본드", "time": (new Date("2023-05-21 14:00")).getTime(), "participants": 789, "img_src": "https://www.w3schools.com/html/pic_trulli.jpg", selections: ["몰디브", "발리"]}, 
  {"id": 5, "title": "라면에 계란 넣기 vs 안넣기", "username": "나미", "time": (new Date("2024-01-12 08:45")).getTime(), "participants": 932, "img_src": "https://www.w3schools.com/html/img_girl.jpg", selections: ["넣기", "안넣기"]}, 
];


function Home() {
    const [selectedBettingInfo, setSelectedBettingInfo] = useState<BettingInfoDto|null>(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const goToPreviousCard = () => {
        setCurrentCardIndex((prevIndex) => 
            prevIndex === 0 ? betting_card_lists.length - 1 : prevIndex - 1
        );
    };
    
    const goToNextCard = () => {
        setCurrentCardIndex((prevIndex) => 
            (prevIndex + 1) % betting_card_lists.length
        );
    };
    const [timeLeft, setTimeLeft] = useState(13 * 60 * 60 + 48); // 3시간 48분을 초로 변환

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    return (
      <div className="w-[1024px] mt-10 flex flex-col gap-4">
          <div className="flex flex-row items-center gap-4">
              <div className="basis-1/6"/>
              <div className="basis-5/6 text-xl text-primary-green-300 font-bold">실시간 인기 베팅</div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="basis-1/6"/>
            <div className="basis-4/6 h-60 rounded-md select-none cursor-pointer transition flex justify-between items-center gap-4 p-[17px] hover:bg-background-black-950 border-4 hover:border-primary-purple-500 bg-[#d9d9d9] border-primary-green-300 hover:text-[#d9d9d9] text-background-black-950 relative">
                <button 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-2xl font-bold text-primary-green-300 hover:text-primary-purple-500 bg-opacity-50 bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={goToPreviousCard}
                >
                    ⟨
                </button>
                <div className="flex-grow flex justify-center items-center">
                    <BettingCard 
                        key={betting_card_lists[currentCardIndex].id} 
                        bettingInfoDto={betting_card_lists[currentCardIndex]} 
                        setSelectedBettingInfo={setSelectedBettingInfo}
                    />
                </div>
                <button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-2xl font-bold text-primary-green-300 hover:text-primary-purple-500 bg-opacity-50 bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={goToNextCard}
                >
                    ⟩
                </button>
            </div>
            <div className="basis-1/6"/>
        </div>
          <div className="flex flex-row-reverse basis-1/6 gap-4">
            <div className="basis-1/6"/>
            <div className="text-xl font-bold text-white">종료까지 {formatTime(timeLeft)}</div>
        </div>
          <div className="flex flex-row items-center gap-4">
              <div className="basis-1/6"/>
              <div className="basis-5/6 text-xl text-primary-green-300 font-bold">마감 직전인 베팅</div>
          </div>
          <div className="select-none cursor-pointer transition flex items-stretch flex-row h-40 gap-4">
              <div className="basis-1/6"/>
              <button className="basis-2/6 rounded-md hover:bg-background-black-950 border-4 hover:border-primary-purple-500 bg-[#d9d9d9] border-primary-green-300 hover:text-[#d9d9d9] text-background-black-950">01</button>
              <button className="basis-2/6 rounded-md hover:bg-background-black-950 border-4 hover:border-primary-purple-500 bg-[#d9d9d9] border-primary-green-300 hover:text-[#d9d9d9] text-background-black-950">02</button>
              <div className="basis-1/6"/>
           </div>
          <div className="flex flex-row items-center gap-4">
              <div className="basis-1/6"/>
              <div className="basis-5/6 text-xl text-primary-green-300 font-bold">최근 생성된 베팅</div>
          </div>
          <div className="select-none cursor-pointer transition flex items-stretch flex-row h-40 gap-4">
              <div className="basis-1/6"/>
              <button className="basis-2/6 rounded-md hover:bg-background-black-950 border-4 hover:border-primary-purple-500 bg-[#d9d9d9] border-primary-green-300 hover:text-[#d9d9d9] text-background-black-950">01</button>
              <button className="basis-2/6 rounded-md hover:bg-background-black-950 border-4 hover:border-primary-purple-500 bg-[#d9d9d9] border-primary-green-300 hover:text-[#d9d9d9] text-background-black-950">02</button>
              <div className="basis-1/6"/>
           </div>
           {selectedBettingInfo && (<BettingModal selectedBettingInfo={selectedBettingInfo} setSelectedBettingInfo={setSelectedBettingInfo}/>)}
      </div>
    );
  }
  
  export default Home;