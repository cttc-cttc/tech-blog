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
import { useRef, useState } from "react";
import { checkBlankInput, handleKeyDownEnter } from "../components/utils/user-utils";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userIdRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!checkBlankInput(userId, "아이디를 입력해주세요.")) {
      userIdRef.current?.focus();
      return;
    }

    if (!checkBlankInput(email, "이메일을 입력해주세요.")) {
      emailRef.current?.focus();
      return;
    }

    setIsLoading(true); // 요청 시작 전 true
    try {
      const response = await axios.post("/api/forgot-password", {
        userId,
        email,
      });

      setMessage(response.data); // 비밀번호 재설정 링크를 이메일로 전송했습니다.
      setSuccess(true);
    } catch (err) {
      setMessage("계정 정보가 올바르지 않습니다.");
      setSuccess(false);
      console.log(err);
    } finally {
      setIsLoading(false); // 요청 완료 후 false
    }
  };

  return (
    <>
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
                  <Input
                    ref={userIdRef}
                    id="userId"
                    type="text"
                    onChange={e => setUserId(e.target.value)}
                    required
                    onKeyDown={e => handleKeyDownEnter(e, handleSubmit, setMessage)}
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="email">이메일</Label>
                  </div>
                  <Input
                    ref={emailRef}
                    id="email"
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    onKeyDown={e => handleKeyDownEnter(e, handleSubmit, setMessage)}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button onClick={handleSubmit} className="w-full hover:cursor-pointer">
              비밀번호 재설정 메일 보내기
            </Button>
            {message && (
              <p
                className={cn("text-sm!", {
                  "text-green-500": success === true,
                  "text-red-500": success === false,
                })}
              >
                {message}
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-200">
          <div className="animate-spin text-white text-2xl">
            <LoaderCircle />
          </div>
        </div>
      )}
    </>
  );
}
