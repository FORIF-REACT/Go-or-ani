import { Link } from "react-router-dom";

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
    <div className="rounded-xl bg-background-black-950 p-2">
      {menus.map((value: Menu, i: number) => {
        if(value.title == "divider") {
          return Divider()
        }
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
      <div style={selected ? {backgroundColor:"#3D3D3D" }:{}} className="flex flex-row rounded-lg py-1 hover:bg-background-black-900 transition-all">
        <div
          className="w-10 text-center"
        >{selected ? "✓" : ""}</div>
        <div
          className="pr-4"
        >
          {value}
        </div>
      </div>
    </Link>
  );
}

function Divider() {
  return <div className="bg-background-black-700 h-0.5 w-full my-1"/>
}