import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "./components/header";
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
      <div className="flex flex-col items-center min-h-screen">
        <Header />
        <h1>Welcome to the Home Page</h1>
        {/* <ul>
          {message.map((text, index) => (
            <li key={`${index}-${text}`}>{text}</li>
          ))}
        </ul> */}
      </div>
    </ThemeProvider>
  );
}
