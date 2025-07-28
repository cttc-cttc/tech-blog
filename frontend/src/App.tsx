import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import ContentsDetail from "./pages/contents-detail/contents-detail";
import HomeMain from "./pages/home/components/home-main";
import NotFound from "./pages/home/components/not-found";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomeMain />} />
          <Route path="/contents-detail/:id" element={<ContentsDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
