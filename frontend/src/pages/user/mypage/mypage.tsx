import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSkeleton } from "@/pages/components/shadcn-custom/custom-skeleton";
import type { User } from "@/pages/components/utils/common-interfaces";
import { useAuthStore } from "@/pages/components/utils/useAuthStore";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Mypage() {
  const { userId } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<User>();

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

  return (
    <div className="w-full max-w-3xl">
      <Card className="w-xl mt-4 py-8 gap-8">
        <CardHeader>
          <CardTitle className="text-lg text-center">내 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="px-4">
            <Label>아이디</Label>
            <Input type="text" value={userInfo?.userId} disabled className="mt-2 mb-4" />
            <Label>닉네임</Label>
            <Input type="text" value={userInfo?.nickName} disabled className="mt-2 mb-4" />
            <Label>이메일</Label>
            <Input type="email" value={userInfo?.email} disabled className="mt-2" />
          </div>
        </CardContent>
        <CardFooter className="mx-4">
          <Button asChild className="w-full">
            <Link to="/auth/mypage/updateInfo">내 정보 변경</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
