import React, { useEffect, useRef, useState } from "react";
import { BettingInfoDto } from "./BettingInfoDto";

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
          backdropRef.current.onclick = closeModalInner;
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
        <div className={`transition duration-${fade_in_duration} fixed z-998 w-screen h-screen ${isModalOpened ? "backdrop-blur" : ""} top-0 left-0`} ref={backdropRef}/>
        <div className={`transition ${isModalOpened ? "opacity-100" : "opacity-0"} duration-${fade_in_duration} flex flex-col justify-start items-start w-[751px] h-[546px] gap-4 p-6 rounded-lg text-[#ffffff] bg-[#191919] border-4 border-[#75fbab] fixed top-1/2 left-1/2 z-999 -translate-x-1/2 -translate-y-1/2`}>
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
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[450px] relative gap-1">
            <p className="flex-grow-0 flex-shrink-0 text-[15px] text-left text-white">1시간 32분 후 마감</p>
            <p className="flex-grow-0 flex-shrink-0 text-[15px] text-left text-white"> · </p>
            <p className="flex-grow-0 flex-shrink-0 text-[15px] text-left text-white">{participants}명 참여</p>
          </div>
      
          {/* 스크롤바 부분 */}
          <Slider max={5000} value={bettingAmount} setBettingAmount={setBettingAmount}/>
          <div className="flex justify-center items-center self-stretch flex-grow-0 gap-1 h-full">
            <WideSelectionBox content={selections[0]} optionIdx={0} isSelected={selectedOptionIndex==0}  setSelectedOptionIndex={setSelectedOptionIndex}/>
            <WideSelectionBox content={selections[1]} optionIdx={1} isSelected={selectedOptionIndex==1} setSelectedOptionIndex={setSelectedOptionIndex}/>
          </div>
        </div>
      </>
    );
}

function WideSelectionBox({content, optionIdx, isSelected, setSelectedOptionIndex} : {content:string, optionIdx: number, isSelected:boolean, setSelectedOptionIndex:React.Dispatch<React.SetStateAction<number>>}) {
  return (
    <div
    className={`select-none transition flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-full w-[330px] gap-4 p-[17px] rounded-md border-4 ${
      isSelected ? "border-primary-green-300" : "cursor-pointer text-white bg-background-black-950 border-4 border-primary-purple-500 hover:border-primary-green-300"
      }`}
      onClick={()=>{if(!isSelected){setSelectedOptionIndex(optionIdx);}}}
    >
      <p className="self-stretch w-full h-fit text-[21px] font-semibold text-center break-words">
        {content}
      </p>
    </div>
  );
}

function Slider({max, value, setBettingAmount}: {max:number, value:number, setBettingAmount:React.Dispatch<React.SetStateAction<number>>}) {
  const percentage = Math.trunc(value/max*100); //-webkit-slider-runnable-track의 배경 색 구분을 위한 퍼센티지 부분
  // 하고 싶어서 이렇게 만든게 절대 아님. 이렇게 안 하고 동적으로 클래스 만들면 tailwindCSS에서 안돌아감...
  const gradientObject:any = {
    0: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[0%] to-[#d9d9d9] to-[0%]",
    1: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[1%] to-[#d9d9d9] to-[1%]",
    2: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[2%] to-[#d9d9d9] to-[2%]",
    3: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[3%] to-[#d9d9d9] to-[3%]",
    4: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[4%] to-[#d9d9d9] to-[4%]",
    5: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[5%] to-[#d9d9d9] to-[5%]",
    6: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[6%] to-[#d9d9d9] to-[6%]",
    7: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[7%] to-[#d9d9d9] to-[7%]",
    8: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[8%] to-[#d9d9d9] to-[8%]",
    9: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[9%] to-[#d9d9d9] to-[9%]",
    10: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[10%] to-[#d9d9d9] to-[10%]",
    11: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[11%] to-[#d9d9d9] to-[11%]",
    12: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[12%] to-[#d9d9d9] to-[12%]",
    13: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[13%] to-[#d9d9d9] to-[13%]",
    14: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[14%] to-[#d9d9d9] to-[14%]",
    15: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[15%] to-[#d9d9d9] to-[15%]",
    16: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[16%] to-[#d9d9d9] to-[16%]",
    17: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[17%] to-[#d9d9d9] to-[17%]",
    18: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[18%] to-[#d9d9d9] to-[18%]",
    19: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[19%] to-[#d9d9d9] to-[19%]",
    20: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[20%] to-[#d9d9d9] to-[20%]",
    21: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[21%] to-[#d9d9d9] to-[21%]",
    22: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[22%] to-[#d9d9d9] to-[22%]",
    23: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[23%] to-[#d9d9d9] to-[23%]",
    24: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[24%] to-[#d9d9d9] to-[24%]",
    25: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[25%] to-[#d9d9d9] to-[25%]",
    26: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[26%] to-[#d9d9d9] to-[26%]",
    27: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[27%] to-[#d9d9d9] to-[27%]",
    28: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[28%] to-[#d9d9d9] to-[28%]",
    29: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[29%] to-[#d9d9d9] to-[29%]",
    30: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[30%] to-[#d9d9d9] to-[30%]",
    31: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[31%] to-[#d9d9d9] to-[31%]",
    32: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[32%] to-[#d9d9d9] to-[32%]",
    33: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[33%] to-[#d9d9d9] to-[33%]",
    34: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[34%] to-[#d9d9d9] to-[34%]",
    35: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[35%] to-[#d9d9d9] to-[35%]",
    36: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[36%] to-[#d9d9d9] to-[36%]",
    37: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[37%] to-[#d9d9d9] to-[37%]",
    38: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[38%] to-[#d9d9d9] to-[38%]",
    39: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[39%] to-[#d9d9d9] to-[39%]",
    40: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[40%] to-[#d9d9d9] to-[40%]",
    41: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[41%] to-[#d9d9d9] to-[41%]",
    42: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[42%] to-[#d9d9d9] to-[42%]",
    43: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[43%] to-[#d9d9d9] to-[43%]",
    44: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[44%] to-[#d9d9d9] to-[44%]",
    45: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[45%] to-[#d9d9d9] to-[45%]",
    46: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[46%] to-[#d9d9d9] to-[46%]",
    47: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[47%] to-[#d9d9d9] to-[47%]",
    48: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[48%] to-[#d9d9d9] to-[48%]",
    49: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[49%] to-[#d9d9d9] to-[49%]",
    50: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[50%] to-[#d9d9d9] to-[50%]",
    51: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[51%] to-[#d9d9d9] to-[51%]",
    52: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[52%] to-[#d9d9d9] to-[52%]",
    53: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[53%] to-[#d9d9d9] to-[53%]",
    54: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[54%] to-[#d9d9d9] to-[54%]",
    55: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[55%] to-[#d9d9d9] to-[55%]",
    56: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[56%] to-[#d9d9d9] to-[56%]",
    57: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[57%] to-[#d9d9d9] to-[57%]",
    58: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[58%] to-[#d9d9d9] to-[58%]",
    59: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[59%] to-[#d9d9d9] to-[59%]",
    60: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[60%] to-[#d9d9d9] to-[60%]",
    61: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[61%] to-[#d9d9d9] to-[61%]",
    62: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[62%] to-[#d9d9d9] to-[62%]",
    63: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[63%] to-[#d9d9d9] to-[63%]",
    64: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[64%] to-[#d9d9d9] to-[64%]",
    65: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[65%] to-[#d9d9d9] to-[65%]",
    66: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[66%] to-[#d9d9d9] to-[66%]",
    67: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[67%] to-[#d9d9d9] to-[67%]",
    68: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[68%] to-[#d9d9d9] to-[68%]",
    69: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[69%] to-[#d9d9d9] to-[69%]",
    70: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[70%] to-[#d9d9d9] to-[70%]",
    71: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[71%] to-[#d9d9d9] to-[71%]",
    73: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[73%] to-[#d9d9d9] to-[73%]",
    74: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[74%] to-[#d9d9d9] to-[74%]",
    75: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[75%] to-[#d9d9d9] to-[75%]",
    76: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[76%] to-[#d9d9d9] to-[76%]",
    77: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[77%] to-[#d9d9d9] to-[77%]",
    78: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[78%] to-[#d9d9d9] to-[78%]",
    79: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[79%] to-[#d9d9d9] to-[79%]",
    80: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[80%] to-[#d9d9d9] to-[80%]",
    81: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[81%] to-[#d9d9d9] to-[81%]",
    82: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[82%] to-[#d9d9d9] to-[82%]",
    83: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[83%] to-[#d9d9d9] to-[83%]",
    84: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[84%] to-[#d9d9d9] to-[84%]",
    85: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[85%] to-[#d9d9d9] to-[85%]",
    86: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[86%] to-[#d9d9d9] to-[86%]",
    87: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[87%] to-[#d9d9d9] to-[87%]",
    88: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[88%] to-[#d9d9d9] to-[88%]",
    89: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[89%] to-[#d9d9d9] to-[89%]",
    90: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[90%] to-[#d9d9d9] to-[90%]",
    91: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[91%] to-[#d9d9d9] to-[91%]",
    92: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[92%] to-[#d9d9d9] to-[92%]",
    93: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[93%] to-[#d9d9d9] to-[93%]",
    94: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[94%] to-[#d9d9d9] to-[94%]",
    95: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[95%] to-[#d9d9d9] to-[95%]",
    96: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[96%] to-[#d9d9d9] to-[96%]",
    97: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[97%] to-[#d9d9d9] to-[97%]",
    98: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[98%] to-[#d9d9d9] to-[98%]",
    99: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[99%] to-[#d9d9d9] to-[99%]",
    100: "[&::-webkit-slider-runnable-track]:bg-gradient-to-r from-primary-green-300 from-[100%] to-[#d9d9d9] to-[100%]"
  };
  return(
    <div className="appearance-none flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-3">
      <input 
       //[&::-ms-thumb][&::-webkit-slider-thumb][&::-moz-range-thumb]
       //[&::-ms-track][&::-moz-range-track][&::-webkit-slider-runnable-track]
        className={`appearance-none h-3 cursor-ew-resize w-full rounded-full 
        [&::-moz-range-thumb]:bg-[#d9d9d9] [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-background-black-950 [&::-moz-range-thumb]:border-4
        [&::-moz-range-progress]:bg-primary-green-300 [&::-moz-range-progress]:h-3 [&::-moz-range-progress]:rounded-full
        [&::-moz-range-track]:bg-[#d9d9d9] [&::-moz-range-track]:h-3 [&::-moz-range-track]:rounded-full
        [&::-webkit-slider-thumb]:-translate-y-1.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-[#d9d9d9] [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(25,25,25,1)]
        [&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:bg-gradient-to-r ${gradientObject[percentage]} [&::-webkit-slider-runnable-track]:h-3 [&::-webkit-slider-runnable-track]:rounded-full
        `} 
        type="range" max={max} value={value} onChange={ (event)=>{setBettingAmount(event.target.valueAsNumber);} }
      />
      <p className="select-none flex-grow-0 flex-shrink-0 text-[19px] font-bold text-left text-white h-fit">
        배추 {value}개 베팅함!
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

