import React from 'react';

// Props에 타입지정하려고 적음
interface BettingOrderControlProps {
  clickedIndex: string,
  setClickedIndex: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * 베팅의 정렬 순서를 설정하는 컴포넌트  
 * [clickedIndex, setClickedIndex] = useState<string>(null); 한 후에,  
 * clickedIndex와 setClickedIndex를 컴포넌트의 인자로 넣어주세요
 */
export default function BettingOrderControl({clickedIndex, setClickedIndex} :BettingOrderControlProps) {
    // 정렬 기준의 key값 및 뜻 문자열
    // 0번째 요소가 key, 1번째 요소가 뜻
    const sort_orders : {
        "recent" : string, "ending_soon" : string, "high_engagement": string, "high_stakes": string, [prop:string]:string} = {
        "recent" : "최근에 만들어진 순으로",
        "ending_soon": "마감이 임박한 순으로",
        "high_engagement": "참여도가 높은 순으로",
        "high_stakes": "베팅 금액 높은 순으로"
    } 

    clickedIndex = (clickedIndex in sort_orders) == false ? Object.keys(sort_orders)[0] : clickedIndex;

    return (
      <div className="px-2 select-none flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-[9px]">
        {/*<p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-white">정렬 순서</p>*/} 
        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 px-[5px] py-1 rounded-md bg-transparent border-4 border-[#875ff6] gap-1">
          {
            Object.keys(sort_orders).map((key:string) => (
              <BettingOrderControlButton key={key} Key={key} isClicked={clickedIndex===key} text={sort_orders[key]} setStateCallback={setClickedIndex}/>
            )
           )
          }
        </div>
      </div>
    )
}

/**
 * 베팅의 정렬 순서 버튼에 해당하는 컴포넌트
 */
function BettingOrderControlButton({isClicked, Key, text, setStateCallback} : {isClicked:boolean, Key:string, text:string, setStateCallback:React.Dispatch<React.SetStateAction<string>>}){
  return(
    <div
    className={`transition flex justify-start items-start flex-grow-0 flex-shrink-0 relative px-3 py-1.5 rounded ${
      isClicked ? 'bg-primary-purple-500 text-black' : 'cursor-pointer hover:text-black bg-transparent hover:bg-primary-green-300 text-white hover:text-background-black-950'
    }`}
    onClick={()=> setStateCallback(Key)}
  >
    <p className={`transition flex-grow-0 flex-shrink-0 text-sm font-bold text-left`}>
      {text /* sort_orders의 뜻 부분 출력 */}
    </p>
  </div>
  )
}