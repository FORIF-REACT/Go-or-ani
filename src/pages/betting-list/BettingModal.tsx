import React, { useEffect, useRef, useState } from "react";
import { BettingInfoDto } from "./BettingInfoDto";
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"
import { API_URL } from "./constants";
import axios from "axios";
import { BettingInfoDtoFromDB } from "./BettingInfoDtoFromDB";

// Props에 타입지정하려고 적음
interface BettingModalProps {
    selectedBettingInfo: BettingInfoDto,
    setSelectedBettingInfo: React.Dispatch<React.SetStateAction<BettingInfoDto|null>>;
  }

export default function BettingModal({selectedBettingInfo, setSelectedBettingInfo} : BettingModalProps) {
    const {title, img_src, username, participants, time, selections, deadline, id} = selectedBettingInfo;
    // 선택된 선택지 index
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);
    // 모달창이 서서히 열리고 닫히는 애니메이션을 위한 useState (모달 창이 열린 상태인가 아닌가)
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    // 모달창이 서서히 열리고 닫히는 애니메이션을 위한 useState (모달 창이 열리는 중인가 아닌가)
    // 모달창 열리는 애니메이션 duration
    const fade_in_duration: number = 300;
    // 모달창 백드롭
    const backdropRef:React.MutableRefObject<HTMLDivElement|null> = useRef<HTMLDivElement|null>(null);
    
    // 얼마만큼의 배추를 베팅하는지의 useState
    const [bettingAmount, setBettingAmount] = useState<number>(0);
    // 가진 배추가 얼마정도인지의 useState
    const [money, setMoney] = useState<number>(-1);

    // 접속한 유저의 id
    const [my_id, setMyID] = useState<string|null>(null);
    // 재렌더링떄매 API 다시 호출하는거 막기 위한 useState
    const [dbData, setDBData] = useState<BettingInfoDtoFromDB|null>(null);

    // 조건 확인 없이 모달 닫기
    const closeModalInner = ()=>{
      setIsModalOpened(false);
      setTimeout(()=>{
        setSelectedBettingInfo(null);
      }, fade_in_duration+100);
    }

    const escKeyCloseModal = (e:KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModalInner();
      }
    }

    // 컴포넌트 마운트 시 실행 (모달 창 열렸을 때 isModalOpened를 true로 바꾸고, 나머지는 기본값으로 하기 위함)
    useEffect(() =>{
      setIsModalOpened(true);
      const timer = setTimeout(()=>{
        document.addEventListener("keydown", escKeyCloseModal);
        if(backdropRef.current !== null) {
          backdropRef.current.onmousedown = closeModalInner;
        }
      }, fade_in_duration-1);
      
      // API 사용하는 부분 여기에
      (async ()=>{
        try{
          // DB데이터 가지고 오기
          if(dbData === null) {
            const betting_card_from_DB: BettingInfoDtoFromDB = (await axios.get(`${API_URL}/betting/${id}`)).data;
            setDBData(betting_card_from_DB);
          }

          /*
          // 로그인 확인
          if(my_id === null) {
            let user_id: string|null = null;
            // @뭔가 API써서 로그인 확인함
            
            // @@디버그
            user_id = "testuser001";
            
            if(user_id===null) {
              alert("로그인되어 있지 않습니다!");
              closeModalInner();
            } else {
              setMyID(user_id);              
              // 돈 확인해서 setBettingAmount 설정
              
            }
          }          
        }

        */
        setMoney(1000); //@디버그
      } catch {
        alert("에러!");
      }})(); 
      return ()=>{
        document.removeEventListener("keydown", escKeyCloseModal);
        setIsModalOpened(false);
        clearTimeout(timer);
      }
    }, []);

    // 이미 베팅했으면 결과창으로 강제로 보내기
    (async()=>{
      const betting_card_from_DB: BettingInfoDtoFromDB = (await axios.get(`${API_URL}/betting/${id}`)).data;
      for(let i=0; i<betting_card_from_DB.players.length; i++){
        if(betting_card_from_DB.players[i].id === my_id) {
          location.href = `/result/${id}`;
        }
      }
    })();

    // @ 확인버튼 로직
    // id가 null이면 아직 API쓴거 아니므로 확인버튼 안눌리게
    // onclick에 async함수 사용

    return(
      <>
        <div className={`transition duration-${fade_in_duration} fixed z-998 w-screen h-screen ${isModalOpened ? "backdrop-brightness-[0.2]" : ""} top-0 left-0`} ref={backdropRef}/>
        <div className={`transition ${isModalOpened ? "opacity-100" : "opacity-0"} duration-${fade_in_duration} flex flex-col justify-start items-start w-[751px] h-fit gap-4 p-6 rounded-lg text-[#ffffff] bg-[#191919] border-4 border-[#75fbab] fixed top-1/2 left-1/2 z-999 -translate-x-1/2 -translate-y-1/2`}>
          <p className="self-stretch flex-grow-0 flex-shrink-0 w-[703px] text-[21px] font-semibold text-left ">
            {title}
          </p>
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
          <img src={img_src} className="rounded-full w-11 h-11"/>
            <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 w-[637px] relative gap-1">
              <p className="flex-grow-0 flex-shrink-0 w-[223px] text-xs text-left ">
                {username}
              </p>
              <p className="flex-grow-0 flex-shrink-0 w-[223px] text-xs text-left text-white">
                {formatDate(time)}
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center flex-shrink-0 w-[450px] relative gap-1">
            <p className="flex-grow-0 flex-shrink-0 text-[15px] text-left text-white">{timeDifference(deadline, Date.now())}</p>
            <p className="flex-grow-0 flex-shrink-0 text-[15px] text-left text-white"> · </p>
            <p className="flex-grow-0 flex-shrink-0 text-[15px] text-left text-white">{participants}명 참여</p>
          </div>
      
          {/* 스크롤바 부분 */}
          {
            (money >= 1) ?
            <> 
            <Slider defaultValue={[bettingAmount]} max={money} step={1} onValueChange={e => setBettingAmount(e[0])}/>
            <div className="w-full flex justify-center">
              <p className="select-none flex-grow-0 flex-shrink-0 text-[19px] font-bold text-left text-white h-fit">
                배추 {bettingAmount} 개 베팅함!
              </p>
            </div>
            </>
            : 
            <div className="w-full flex justify-center">
              <p className="select-none flex-grow-0 flex-shrink-0 text-[19px] font-bold text-left text-white h-fit">
                {money == -1 ? "로딩중" : "탕진했어용"}
              </p>
            </div>
          }


          {
            (selections.length >= 3) ? 
            <div className="flex-col justify-center items-center self-stretch flex-grow-0 gap-1 space-y-3 h-fit">
              {selections.map((s, index)=>(
                <NarrowSelectionBox content={s} optionIdx={index} isSelected={selectedOptionIndex==index} setSelectedOptionIndex={setSelectedOptionIndex}></NarrowSelectionBox>
              ))}
            </div>
            :
            <div className="flex justify-center items-center self-stretch flex-grow-0 gap-4 h-[260px]">
              {selections.map((s, index)=>(
                <WideSelectionBox content={s} optionIdx={index} isSelected={selectedOptionIndex==index}  setSelectedOptionIndex={setSelectedOptionIndex}/>
              ))}
            </div>
          }

          <div className="flex justify-center w-full h-fit">
           <div
             className={`select-none transition-all h-full w-[330px] gap-4 p-[17px] rounded-lg outline ${
               (selectedOptionIndex == -1 || bettingAmount == 0) ? "outline-[#7a7a7a] text-[#7a7a7a] outline-4" : "cursor-pointer text-white bg-background-black-950 outline-4 hover:outline-[4px] outline-primary-purple-500 hover:outline-primary-green-300"
             }`}
             onClick={undefined //디버그
              /*async ()=>{
              // my_id가 null인 경우에는 버튼 눌러도 반응 없게
              if(my_id !== null && bettingAmount != 0) {
                // BettingInfoDto의 id로 DB에서 실제로 조회 후, 이미 베팅 했으면 걍 결과창으로 보내기. 아니면 players에 추가 후 PUT하기
                const betting_card_from_DB: BettingInfoDtoFromDB = (await axios.get(`${API_URL}/betting/${id}`)).data;
                // players
                for(let i=0; i<betting_card_from_DB.players.length; i++){
                  if(betting_card_from_DB.players[i].id === my_id) {
                    location.href = `/result/${id}`;
                  }
                }
                
                betting_card_from_DB.players.push({id: my_id, points:bettingAmount, bet_index:selectedOptionIndex});
                await (axios.put(`${API_URL}/betting/${id}`, betting_card_from_DB));
                location.href = `/result/${id}`;
              }
             }*/}
           >
             <p className="w-full h-fit text-[21px] font-semibold text-center break-words">
               베팅!
             </p>
           </div>
           
          </div>
        </div>
      </>
    );
}

function WideSelectionBox({content, optionIdx, isSelected, setSelectedOptionIndex} : {content:string, optionIdx: number, isSelected:boolean, setSelectedOptionIndex:React.Dispatch<React.SetStateAction<number>>}) {
  return (
    <div
    className={`select-none transition-all flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-full w-[320px] gap-4 p-[17px] rounded-lg outline ${
      isSelected ? "outline-primary-green-300 outline-[4px]" : "cursor-pointer text-white bg-background-black-950 outline-primary-purple-500 outline-4 hover:outline-[4px] hover:outline-primary-green-300"
      }`}
      onClick={()=>{if(!isSelected){setSelectedOptionIndex(optionIdx);}}}
    >
      <p className="self-stretch w-full h-fit text-[21px] font-semibold text-center break-keep">
        {content}
      </p>
    </div>
  );
}

function NarrowSelectionBox({content, optionIdx, isSelected, setSelectedOptionIndex} : {content:string, optionIdx: number, isSelected:boolean, setSelectedOptionIndex:React.Dispatch<React.SetStateAction<number>>}) {
  return (
    <div
    className={`select-none transition-all h-fit w-full gap p-1 rounded-lg outline ${
      isSelected ? "outline-primary-green-300 outline-[4px]" : "cursor-pointer text-white bg-background-black-950 outline-4 outline-primary-purple-500 hover:outline-primary-green-300 hover:outline-[4px]"
      }`}
      onClick={()=>{if(!isSelected){setSelectedOptionIndex(optionIdx);}}}
    >
      <p className="self-stretch w-full h-fit text-[21px] font-semibold text-center break-keep">
        {content}
      </p>
    </div>
  );
}

function formatDate(milliseconds:number):string {
  const date = new Date(milliseconds);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

function timeDifference(a_ms: number, b_ms: number): string {
  // 밀리세컨드를 초로 변환
  const a_seconds = a_ms / 1000;
  const b_seconds = b_ms / 1000;
  
  // timestamp로 변환
  const a_timestamp = new Date(a_seconds * 1000);
  const b_timestamp = new Date(b_seconds * 1000);
  
  // 두 timestamp 사이의 차이 계산
  const diff_ms = Math.abs(b_timestamp.getTime() - a_timestamp.getTime());
  
  // 차이를 milliseconds에서 년, 월, 일, 시간, 분으로 변환
  const years = Math.floor(diff_ms / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor((diff_ms % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor((diff_ms % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff_ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff_ms % (1000 * 60 * 60)) / (1000 * 60));
  
  // 결과 문자열 생성
  let result = "";
  if (years > 0) {
      result += `${years}년 `;
  }
  if (months > 0) {
      result += `${months}개월 `;
  }
  if (days > 0) {
      result += `${days}일 `;
  }
  if (hours > 0) {
      result += `${hours}시간 `;
  }
  if (minutes > 0) {
      result += `${minutes}분 `;
  }
  
  // 결과 반환
  if (result === "") {
      return "곧 마감";  // 모든 값이 0인 경우
  } else {
      return result.trim() + "후 마감";
  }
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="cursor-ew-resize relative h-3 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary-green-300" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="cursor-ew-resize block h-7 w-7 rounded-full border-4 border-primary bg-[#d9d9d9] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName