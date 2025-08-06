import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (newPassword !== newPassword2) {
      setMessage("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post("/api/reset-password", {
        token,
        newPassword, // DTO 변수와 이름을 일치시키지 않으면 null로 인식하기 때문에 맞춰줌
      });
      setMessage(response.data); // 비밀번호 변경 완료
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      setMessage("만료된 토큰입니다. 재요청 해주세요.");
    }
  };

  return (
    <div className="container h-[70vh] flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg mb-2">비밀번호 재설정</CardTitle>
          <CardDescription>새로운 비밀번호를 입력하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password1">새 비밀번호</Label>
                <Input
                  id="password1"
                  type="password"
                  onChange={e => setNewPassword1(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password2">새 비밀번호 재입력</Label>
                </div>
                <Input
                  id="password2"
                  type="password"
                  onChange={e => setNewPassword2(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleReset} className="w-full hover:cursor-pointer">
            비밀번호 변경
          </Button>
          <p className="text-red-500 text-sm!">{message}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
