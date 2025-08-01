import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import ContentsDetail from "./pages/contents-detail/contents-detail";
import HomeMain from "./pages/home/components/home-main";
import NotFound from "./pages/home/components/not-found";
import { ThemeProvider } from "./components/ui/theme-provider";
import Intro from "./pages/home/components/intro";
import CustomEditorInsert from "./pages/components/toast-ui-editor-custom/custom-editor-insert";
import CustomEditorUpdate from "./pages/components/toast-ui-editor-custom/custom-editor-update";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<HomeMain />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/intro/write" element={<CustomEditorInsert />} />
            <Route path="/intro/update" element={<CustomEditorUpdate />} />
            <Route path="/contents-detail/:id" element={<ContentsDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
