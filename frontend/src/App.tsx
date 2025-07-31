import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import ContentsDetail from "./pages/contents-detail/contents-detail";
import HomeMain from "./pages/home/components/home-main";
import NotFound from "./pages/home/components/not-found";
import { ThemeProvider } from "./components/ui/theme-provider";
import Intro from "./pages/home/components/intro";
import EditorWithViewer from "./pages/components/toast-ui-editor-custom/editor-common";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<HomeMain />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/intro/write" element={<EditorWithViewer />} />
            <Route path="/contents-detail/:id" element={<ContentsDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
