import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

type Menu = {
  title:string,
  link:string
}

const menus: Menu[]= [
  {title: "대시보드", link: ""},
  {title: "divider", link:""},
  {title: "사용자 추가", link: "adduser"},
  {title: "사용자 정보 수정 / 삭제", link: "modifyuser"},
  {title: "divider", link:""},
  {title: "베팅 정보 수정 / 삭제", link: "modifybet"},
];

export default function Admin() {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className="flex flex-row w-[1024px] mt-2">
      <div className="flex-shrink-0">
        <Sidebar menus={menus} selected={selected} setSelected={setSelected} />
      </div>

      <div className="w-full ml-4 mb-4">
        <Outlet/>
      </div>
    </div>
  );
}