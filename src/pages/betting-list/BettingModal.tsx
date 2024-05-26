import React, { useState } from "react";
import { BettingInfoDto } from "./BettingInfoDto";

// Props에 타입지정하려고 적음
interface BettingModalProps {
    selectedBettingInfo: BettingInfoDto|null,
    setSelectedBettingInfo: React.Dispatch<React.SetStateAction<BettingInfoDto|null>>;
  }

export default function BettingModal({selectedBettingInfo, setSelectedBettingInfo} : BettingModalProps) {
    if(selectedBettingInfo==null) {
      return null;
    }

    const {title, img_src, username, participants, time} = selectedBettingInfo;

    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);

    return(
      <>
        <div className="transition fixed z-998 w-screen h-screen backdrop-blur top-0 left-0" onClick={()=>{setSelectedBettingInfo(null);}}/>
        <div className="transition-opacity duration-100 flex flex-col justify-start items-start w-[751px] h-[546px] gap-4 p-6 rounded-lg text-[#ffffff] bg-[#191919] border-4 border-[#75fbab] fixed top-1/2 left-1/2 z-999 -translate-x-1/2 -translate-y-1/2">
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
          <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-1">
            <svg
              width={703}
              height={20}
              viewBox="0 0 703 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0 w-[703px] h-2 relative"
              preserveAspectRatio="none"
            >
              <rect y={6} width={703} height={8} rx={4} fill="#F1F5F9" />
              <rect y={6} width="351.5" height={8} rx={4} fill="#75FBAB" />
              <circle cx={350} cy={10} r={9} fill="white" stroke="#0F172A" strokeWidth={2} />
            </svg>
      
      
            <p className="flex-grow-0 flex-shrink-0 text-[19px] font-bold text-left text-white h-fit">
              배추 1,345개 베팅함!
            </p>
          </div>
          <div className="flex justify-center items-center self-stretch flex-grow-0 gap-1 h-full">
            <WideSelectionBox content={"민트초코 극혐"} optionIdx={0} isSelected={selectedOptionIndex==0}  setSelectedOptionIndex={setSelectedOptionIndex}/>
            <WideSelectionBox content={"하와이안 극혐"} optionIdx={1} isSelected={selectedOptionIndex==1} setSelectedOptionIndex={setSelectedOptionIndex}/>
          </div>
        </div>
      </>
    )
}

function WideSelectionBox({content, optionIdx, isSelected, setSelectedOptionIndex} : {content:string, optionIdx: number, isSelected:boolean, setSelectedOptionIndex:React.Dispatch<React.SetStateAction<number>>}) {
  return (
    <div
      className={`transition cursor-pointer flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-full w-[330px] gap-4 p-[17px] rounded-md border-4 ${
        isSelected ? "text-background-black-950 bg-[#d9d9d9] border-[#75fbab]" : "text-white bg-[#191919] border-4 border-[#875ff6] hover:text-background-black-950 hover:bg-[#d9d9d9] hover:border-[#75fbab]"
      }`}
      onClick={isSelected ? undefined : ()=>{setSelectedOptionIndex(optionIdx);}}
    >
      <p className="self-stretch w-full h-fit text-[21px] font-semibold text-center text-black">
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