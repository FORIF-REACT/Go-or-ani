import React from "react";
import { BettingInfoDto } from "./BettingInfoDto";

/**
 * 베팅 목록에서 각 베팅별 카드 부분  
 * title : 베팅의 제목  
 * username : 베팅을 만든 사용자의 이름  
 * time : 밀리초단위의 시간  
 * participants : 몇 명 참여했는지  
 * img_src : 이미지 경로
 */
export default function BettingCard({bettingInfoDto, setSelectedBettingInfo} : {bettingInfoDto:BettingInfoDto, setSelectedBettingInfo:React.Dispatch<React.SetStateAction<BettingInfoDto|null>>}) {
  const {title, username, time, participants, img_src} = bettingInfoDto;  
  
  return(
      <div
        className="select-none cursor-pointer transition-all  flex justify-start items-start flex-grow-0 flex-shrink-0 w-[325px] h-[175px] gap-4 p-[17px] rounded-md bg-background-black-950 outline outline-3 outline-primary-purple-500 hover:outline-primary-green-300 hover:outline-[7px] text-[#d9d9d9]"
        style={{ boxShadow: "0px 4px 4px 0 rgba(174,174,174,0.25)" }}
        onClick={()=>{setSelectedBettingInfo(bettingInfoDto);}}
      >
        <div className="flex flex-col justify-start items-start self-stretch flex-grow relative gap-1">
            <div className="self-stretch w-[296px] h-[102px] text-[21px] font-semibold text-center break-words flex justify-center items-center">
                <p className="break-words w-full">
                    {title}
                </p>
            </div>
            <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-3">
            <img src={img_src} className="rounded-3xl w-11 h-11"/>
            <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 w-[230px] relative gap-1">
              <p className="flex-grow-0 flex-shrink-0 w-[223px] text-xs text-left">
                {username}
              </p>
              <p className="flex-grow-0 flex-shrink-0 w-[223px] text-xs text-left ">
                {getTimeAgoString(time)} · {participants}명 참여
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}

/**
 *  밀리초 단위 시간을 인자로 넣으면 적당한 문자열을 유튜브처럼 출력해주는 함수. GPT-4o이 짜줬음.  
 *  1시간 미만: 동영상이 업로드된 지 1시간 미만인 경우, "몇 분 전"으로 표시됩니다. (예: "5분 전", "30분 전")  
 *  24시간 미만: 동영상이 업로드된 지 24시간 미만인 경우, "몇 시간 전"으로 표시됩니다. (예: "3시간 전", "12시간 전")  
 *  일주일 미만: 동영상이 업로드된 지 1주일 미만인 경우, "며칠 전"으로 표시됩니다. (예: "1일 전", "6일 전")  
 *  1년 미만: 동영상이 업로드된 지 1년 미만인 경우, "몇 주 전" 또는 "몇 달 전"으로 표시됩니다. (예: "3주 전", "5개월 전")  
 *  1년 이상: 동영상이 업로드된 지 1년 이상인 경우, "몇 년 전"으로 표시됩니다. (예: "2년 전", "5년 전")  
 */
function getTimeAgoString(timestamp: number): string {
    const now = new Date().getTime();
    const diff = now - timestamp;
  
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;
  
    if (diff < minute) {
      const seconds = Math.floor(diff / 1000);
      return `${seconds}초 전`;
    } else if (diff < hour) {
      const minutes = Math.floor(diff / minute);
      return `${minutes}분 전`;
    } else if (diff < day) {
      const hours = Math.floor(diff / hour);
      return `${hours}시간 전`;
    } else if (diff < week) {
      const days = Math.floor(diff / day);
      return `${days}일 전`;
    } else if (diff < month) {
      const weeks = Math.floor(diff / week);
      return `${weeks}주 전`;
    } else if (diff < year) {
      const months = Math.floor(diff / month);
      return `${months}개월 전`;
    } else {
      const years = Math.floor(diff / year);
      return `${years}년 전`;
    }
}