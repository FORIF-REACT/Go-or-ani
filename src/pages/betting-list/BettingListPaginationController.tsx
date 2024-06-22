import React from "react";

/**
 * 페이지네이션 컨트롤러 컴포넌트
 * 
 */
export default function BettingListPaginationController({idx, setIdx, lastIdx} : {idx:number, setIdx:React.Dispatch<React.SetStateAction<number>>, lastIdx:number}) {
return(
    <div className="transition flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-1">
      {idx != 1 ? <PrevBtn onClick={()=>{setIdx(idx-1)}}/> : null}
      {idx-3 >= 1 ? <Dots/> : null}
      {idx-2 >= 1 ? <PageBtn isClicked={false} pageNum={idx-2} setStateCallback={setIdx}/> : null}
      {idx-1 >= 1 ? <PageBtn isClicked={false} pageNum={idx-1} setStateCallback={setIdx}/> : null}
      <PageBtn isClicked={true} pageNum={idx} setStateCallback={setIdx}/>
      {idx+1 <= lastIdx ? <PageBtn isClicked={false} pageNum={idx+1} setStateCallback={setIdx}/> : null}
      {idx+2 <= lastIdx ? <PageBtn isClicked={false} pageNum={idx+2} setStateCallback={setIdx}/> : null}
      {idx+3 <= lastIdx ? <Dots/> : null}
      {idx != lastIdx ? <NextBtn onClick={()=>{setIdx(idx+1)}}/> : null}
    </div>
);}


function PageBtn({isClicked, pageNum, setStateCallback} : {isClicked:boolean, pageNum:number, setStateCallback:React.Dispatch<React.SetStateAction<number>>}) {
    return(
      <div className={`transition cursor-pointer flex justify-center items-center flex-grow-0 flex-shrink-0 w-10 h-10 relative gap-2.5 p-2.5 rounded-lg ${
            isClicked ? "bg-[#875ff6] " : "hover:bg-[#875ff6]"
        }`}
        onClick={()=>{setStateCallback(pageNum)}}
      >
        <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-white">{pageNum}</p>
      </div>
    )
}

function PrevBtn({onClick} : {onClick:()=>void}) {
    return(
        <div 
            className="hover:bg-[#875ff6] transition cursor-pointer flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1 px-4 py-2 rounded-md"
            onClick={onClick}
        >
          <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-4 h-4 relative"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-white">이전</p>
        </div>
    );
}

function NextBtn({onClick} : {onClick:()=>void}) {
    return(
        <div 
            className="hover:bg-[#875ff6] transition cursor-pointer flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1 px-4 py-2 rounded-md"
            onClick={onClick}
        >
        <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-white">이후</p>
        <svg
          width={16}
          height={16}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-grow-0 flex-shrink-0 w-4 h-4 relative"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    );
}

function Dots() {
    return(
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-10 h-10 relative gap-2.5 p-2.5">
        <svg
          width={16}
          height={16}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-grow-0 flex-shrink-0 w-4 h-4 relative"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M7.99992 8.66659C8.36811 8.66659 8.66659 8.36811 8.66659 7.99992C8.66659 7.63173 8.36811 7.33325 7.99992 7.33325C7.63173 7.33325 7.33325 7.63173 7.33325 7.99992C7.33325 8.36811 7.63173 8.66659 7.99992 8.66659Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.6667 8.66659C13.0349 8.66659 13.3333 8.36811 13.3333 7.99992C13.3333 7.63173 13.0349 7.33325 12.6667 7.33325C12.2985 7.33325 12 7.63173 12 7.99992C12 8.36811 12.2985 8.66659 12.6667 8.66659Z"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.33341 8.66659C3.7016 8.66659 4.00008 8.36811 4.00008 7.99992C4.00008 7.63173 3.7016 7.33325 3.33341 7.33325C2.96522 7.33325 2.66675 7.63173 2.66675 7.99992C2.66675 8.36811 2.96522 8.66659 3.33341 8.66659Z"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    )
}