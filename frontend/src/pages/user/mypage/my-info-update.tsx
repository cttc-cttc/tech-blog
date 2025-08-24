import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomSkeleton } from "@/pages/components/shadcn-custom/custom-skeleton";
import type { User } from "@/pages/components/utils/common-interfaces";
import { useAuthStore } from "@/pages/components/utils/useAuthStore";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserForm, { type UserFormData } from "./UserForm";

export default function MyInfoUpdate() {
  const { userId } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<User>();
  const navigate = useNavigate();

  const fetchUserInfo = useCallback(() => {
    setLoading(true);
    axios
      .get("/api/user/userInfo", {
        params: { userId },
      })
      .then(res => setUserInfo(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  if (loading) return <CustomSkeleton type="posts" />;

  const validateDuplicate = async (url: string, value: string) => {
    try {
      const response = await axios.post("/api/valid-duplicate-" + url, {
        nickName: value,
        email: value,
      });
      if (response.data.success) {
        return true;
      }
    } catch (err) {
      alert("이미 사용중인 " + url + " 입니다");
      console.log(err);
      return false;
    }
  };

  const handleSubmit = async (formData: UserFormData) => {
    if (!userInfo) return;

    const updatedData: Partial<UserFormData> = {};

    // nickName 변경 감지
    if (formData.nickName !== userInfo.nickName) {
      if (!validateDuplicate("nickName", formData.nickName)) return;
      updatedData.nickName = formData.nickName;
    }

    // email 변경 감지
    if (formData.email !== userInfo.email) {
      if (!validateDuplicate("email", formData.email)) return;
      updatedData.email = formData.email;
    }

    // password 처리
    if (formData.password || formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        alert("새 비밀번호와 재입력한 비밀번호가 일치하지 않습니다.");
        return;
      }
      updatedData.password = formData.password; // 비밀번호 입력 시 항상 업데이트
    }

    // console.log(updatedData);

    // 변경된 값이 없으면 요청하지 않음
    if (Object.keys(updatedData).length === 0) {
      alert("변경된 값이 없습니다.");
      return;
    }

    // 최종 저장 API 호출
    try {
      const response = await axios.put("/api/user/update", formData);
      alert("회원 정보가 성공적으로 변경되었습니다.");
      setUserInfo(response.data);
      navigate("/auth/mypage");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <Card className="w-xl mt-4 py-8 gap-8">
        <CardHeader>
          <CardTitle className="text-lg text-center">내 정보 변경</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="px-4">
            <UserForm userInfo={userInfo} onSubmit={handleSubmit} />
          </div>
        </CardContent>
        <CardFooter className="mx-4 gap-2">
          <Button asChild className="flex-1" variant="outline">
            <Link to="/auth/mypage">취소</Link>
          </Button>
          <Button className="flex-1 hover:cursor-pointer" type="submit" form="user-form">
            변경 사항 저장
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
