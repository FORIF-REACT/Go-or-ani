import { Link } from "react-router-dom";
import Divider from "./Divider";

type Menu = {
  title: string;
  link: string;
};

export default function Sidebar({
  menus,
  selected,
  setSelected,
}: {
  menus: Menu[];
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div>
      <Divider />
      {menus.map((value: Menu, i: number) => {
        return (
          <div
            onClick={() => {
              setSelected(i);
            }}
          >
            <Menu
              value={value.title}
              link={value.link}
              selected={i == selected}
            />
          </div>
        );
      })}
    </div>
  );
}

function Menu({
  value,
  link,
  selected,
}: {
  value: string;
  link: string;
  selected: boolean;
}) {
  return (
    <Link to={"/admin" + (link ? "/" + link : "")}>
      <div className="flex flex-row">
        <div
          style={{ width: selected ? "4px" : "2px" }}
          className="bg-slate-600 h-8"
        />
        <div
          style={{ fontWeight: selected ? "bold" : "" }}
          className="text-lg pl-3"
        >
          {value}
        </div>
      </div>
    </Link>
  );
}
