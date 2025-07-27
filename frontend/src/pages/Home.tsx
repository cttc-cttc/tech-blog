import NaviMenu from "./components/navi-menu";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center m-[20px]">
        <NaviMenu></NaviMenu>
      </div>
      <h1 className="text-center m-[20px]">홈 페이지</h1>
      <h2 className="text-center">shadcn components</h2>
    </div>
  );
}