import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";

export default function Home() {
  // const [message, setMessage] = useState([]);

  // useEffect(() => {
  //   axios("/api/hello")
  //     .then(res => setMessage(res.data))
  //     .catch(err => console.log(err));
  // }, []);

  return (
    <ThemeProvider>
      {/* <ul>
          {message.map((text, index) => (
            <li key={`${index}-${text}`}>{text}</li>
          ))}
        </ul> */}
      <div className="flex flex-col items-center min-h-screen">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
