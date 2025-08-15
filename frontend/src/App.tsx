import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import HomeMain from "./pages/home/home-main";
import NotFound from "./pages/home/not-found";
import { ThemeProvider } from "./components/ui/theme-provider";
import Intro from "./pages/home/intro";
import CustomEditorInsert from "./pages/components/toast-ui-editor-custom/custom-editor-insert";
import CustomEditorUpdate from "./pages/components/toast-ui-editor-custom/custom-editor-update";
import { Toaster } from "./components/ui/sonner";
import Register from "./pages/user/register";
import Login from "./pages/user/login";
import ForgotPasswordPage from "./pages/user/forgot-password-page";
import ResetPasswordPage from "./pages/user/reset-password-page";
import SidebarLayout from "./pages/posting/sidebar-layout";
import PostsList from "./pages/posting/posts-list";
import PostsDetail from "./pages/posting/posts-detail";
import PostsCreate from "./pages/posting/posts-create";

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
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/posts/:category1" element={<SidebarLayout />}>
              <Route path="/posts/:category1/:category2" element={<PostsList />} />
              <Route path="/posts/:category1/:category2/create" element={<PostsCreate />} />
              <Route path="/posts/:category1/:category2/:postId" element={<PostsDetail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
