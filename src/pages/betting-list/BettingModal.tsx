import React, { useEffect, useRef, useState } from "react";
import { BettingInfoDto } from "./BettingInfoDto";
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

// Props에 타입지정하려고 적음
interface BettingModalProps {
    selectedBettingInfo: BettingInfoDto,
    setSelectedBettingInfo: React.Dispatch<React.SetStateAction<BettingInfoDto|null>>;
  }

export default function BettingModal({selectedBettingInfo, setSelectedBettingInfo} : BettingModalProps) {
    const {title, img_src, username, participants, time, selections} = selectedBettingInfo;
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
    // slider내에서 값 변경시 setBettingAmount를 사용해서 변경하는 함수

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
    useEffect(()=>{
      setIsModalOpened(true);
      const timer = setTimeout(()=>{
        document.addEventListener("keydown", escKeyCloseModal);
        if(backdropRef.current !== null) {
          backdropRef.current.onmousedown = closeModalInner;
        }
      }, fade_in_duration-1);
      return ()=>{
        document.removeEventListener("keydown", escKeyCloseModal);
        setIsModalOpened(false);
        clearTimeout(timer);
      }
    }, []);


    return(
      <>
        <div className={`transition duration-${fade_in_duration} fixed z-998 w-screen h-screen ${isModalOpened ? "backdrop-brightness-[0.2]" : ""} top-0 left-0`} ref={backdropRef}/>
        <div className={`transition ${isModalOpened ? "opacity-100" : "opacity-0"} duration-${fade_in_duration} flex flex-col justify-start items-start w-[751px] h-fit gap-4 p-6 rounded-lg text-[#ffffff] bg-[#191919] border-4 border-[#75fbab] fixed top-1/2 left-1/2 z-999 -translate-x-1/2 -translate-y-1/2`}>
          <p className="self-stretch flex-grow-0 flex-shrink-0 w-[703px] text-[21px] font-semibold text-left ">
            {title}
          </p>
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
          <img src={img_src} className="rounded-3xl w-11 h-11"/>
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
            <p className="flex-grow-0 flex-shrink-0 text-[15px] text-left text-white">1시간 32분 후 마감</p>
            <p className="flex-grow-0 flex-shrink-0 text-[15px] text-left text-white"> · </p>
            <p className="flex-grow-0 flex-shrink-0 text-[15px] text-left text-white">{participants}명 참여</p>
          </div>
      
          {/* 스크롤바 부분 */}
          <Slider defaultValue={[0]} max={5000} step={1} onValueChange={e => setBettingAmount(e[0])}/>
          <div className="w-full flex justify-center">
            <p className="select-none flex-grow-0 flex-shrink-0 text-[19px] font-bold text-left text-white h-fit">
              배추 {bettingAmount} 개 베팅함!
            </p>
          </div>

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
             className={`select-none transition-all h-full w-[330px] gap-4 p-[17px] rounded-md outline ${
               selectedOptionIndex == -1 ? "outline-[#7a7a7a] text-[#7a7a7a] outline-4" : "cursor-pointer text-white bg-background-black-950 outline-4 hover:outline-[6px] outline-primary-purple-500 hover:outline-primary-green-300"
             }`}
             onClick={()=>{}}
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
    className={`select-none transition-all flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-full w-[320px] gap-4 p-[17px] rounded-md outline ${
      isSelected ? "outline-primary-green-300 outline-[6px]" : "cursor-pointer text-white bg-background-black-950 outline-primary-purple-500 outline-4 hover:outline-[6px] hover:outline-primary-green-300"
      }`}
      onClick={()=>{if(!isSelected){setSelectedOptionIndex(optionIdx);}}}
    >
      <p className="self-stretch w-full h-fit text-[21px] font-semibold text-center break-words">
        {content}
      </p>
    </div>
  );
}

function NarrowSelectionBox({content, optionIdx, isSelected, setSelectedOptionIndex} : {content:string, optionIdx: number, isSelected:boolean, setSelectedOptionIndex:React.Dispatch<React.SetStateAction<number>>}) {
  return (
    <div
    className={`select-none transition-all h-fit w-full gap p-1 rounded-md outline ${
      isSelected ? "outline-primary-green-300 outline-[6px]" : "cursor-pointer text-white bg-background-black-950 outline-4 outline-primary-purple-500 hover:outline-primary-green-300 hover:outline-[6px]"
      }`}
      onClick={()=>{if(!isSelected){setSelectedOptionIndex(optionIdx);}}}
    >
      <p className="self-stretch w-full h-fit text-[21px] font-semibold text-center break-words">
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