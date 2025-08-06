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
import axios from "axios";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/forgot-password", {
        userId,
        email,
      });
      setMessage(response.data); // 이메일 전송 안내
    } catch (err) {
      setMessage("계정 정보가 올바르지 않습니다.");
      console.log(err);
    }
  };

  return (
    <div className="container h-[70vh] flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg mb-2">비밀번호 재설정 요청</CardTitle>
          <CardDescription>
            <p className="text-sm!">ID와 Email 주소를 입력하고</p>
            <p className="text-sm! mt-1">메일로 비밀번호 재설정 링크를 받으세요</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="userId">아이디</Label>
                <Input id="userId" type="text" onChange={e => setUserId(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="email">이메일</Label>
                </div>
                <Input id="email" type="email" onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit} className="w-full hover:cursor-pointer">
            비밀번호 재설정 메일 보내기
          </Button>
          <p className="text-red-500 text-sm!">{message}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
