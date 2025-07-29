import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import ContentsDetail from "./pages/contents-detail/contents-detail";
import HomeMain from "./pages/home/components/home-main";
import NotFound from "./pages/home/components/not-found";
import { ThemeProvider } from "./components/ui/theme-provider";
import Intro from "./pages/home/components/intro";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<HomeMain />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/contents-detail/:id" element={<ContentsDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
