import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import HomeMain from "./pages/home/home-main";
import NotFound from "./pages/home/not-found";
import { ThemeProvider } from "./components/ui/theme-provider";
import Intro from "./pages/intro/intro";
import { Toaster } from "./components/ui/sonner";
import Register from "./pages/user/register";
import Login from "./pages/user/login";
import ForgotPasswordPage from "./pages/user/forgot-password-page";
import ResetPasswordPage from "./pages/user/reset-password-page";
import SidebarLayout from "./pages/posting/sidebar-layout";
import PostsList from "./pages/posting/posts-list";
import PostsDetail from "./pages/posting/posts-detail";
import PostsCreate from "./pages/posting/posts-create";
import PostsUpdate from "./pages/posting/posts-update";
import IntroCreate from "./pages/intro/intro-create";
import IntroUpdate from "./pages/intro/intro-update";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "./pages/components/toast-ui-editor-custom/toast-editor-dark.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

import Adminpage from "./pages/user/adminpage/adminpage";
import Mypage from "./pages/user/mypage/mypage";
import MyInfoUpdate from "./pages/user/mypage/my-info-update";
import MyComments from "./pages/user/mypage/my-comments";
import MemberSidebarLayout from "./pages/user/member-sidebar-layout";
import AdminCategoryManagement from "./pages/user/adminpage/admin-category-management";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<HomeMain />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/intro/write" element={<IntroCreate />} />
            <Route path="/intro/update" element={<IntroUpdate />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/posts" element={<SidebarLayout />}>
              {/* PostsList는 두 가지 경우 존재함 */}
              <Route path=":category1" element={<PostsList />} />
              <Route path=":category1/:category2" element={<PostsList />} />
              <Route path=":category1/:category2/create" element={<PostsCreate />} />
              <Route path=":category1/:category2/:postId" element={<PostsDetail />} />
              <Route path=":category1/:category2/update/:postId" element={<PostsUpdate />} />
            </Route>

            <Route path="/auth" element={<MemberSidebarLayout />}>
              <Route path="/auth/adminpage" element={<Adminpage />} />
              <Route path="/auth/adminpage/category" element={<AdminCategoryManagement />} />
              <Route path="/auth/mypage" element={<Mypage />} />
              <Route path="/auth/mypage/updateInfo" element={<MyInfoUpdate />} />
              <Route path="/auth/mypage/comments" element={<MyComments />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
