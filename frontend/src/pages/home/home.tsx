import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <div className="container mx-auto flex-1 px-4 flex justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
