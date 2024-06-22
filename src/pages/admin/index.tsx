import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

type Menu = {
  title:string,
  link:string
}

const menus: Menu[]= [
  {title: "대시보드", link: ""},
  {title: "사용자 추가", link: "adduser"},
  {title: "사용자 정보 수정 / 삭제", link: "modifyuser"},
  {title: "베팅 정보 수정 / 삭제", link: "modifybet"},
];

export default function Admin() {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className="w-[768px] flex flex-row">
      <div className="flex-shrink-0">
        <Sidebar menus={menus} selected={selected} setSelected={setSelected} />
      </div>

      <div className="w-full ml-6">
        <Outlet/>
      </div>
    </div>
  );
}

// function Controller({ menu }: { menu: string }) {
//   switch (menu) {
//     case "사용자 추가":
//       return <UserAdd />;
//     case "사용자 정보 수정 / 삭제":
//       return <UserModify />;
//     case "베팅 정보 수정":
//       return <BetModify />;
//   }
// }
