import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
