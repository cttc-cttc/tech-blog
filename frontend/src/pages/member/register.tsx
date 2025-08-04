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

interface ValidationProps {
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  message: string;
}

export default function Register() {
  const [userId, setUserId] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  const [messageUserId, setMessageUserId] = useState("");
  const [messageNickName, setMessageNickName] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [messageConfirmPassword, setMessageConfirmPassword] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [message, setMessage] = useState("");

  const validations: ValidationProps[] = [
    { value: userId, setter: setMessageUserId, message: "아이디를 입력해주세요." },
    { value: nickName, setter: setMessageNickName, message: "닉네임을 입력해주세요." },
    { value: password, setter: setMessagePassword, message: "비밀번호를 입력해주세요." },
    {
      value: password2,
      setter: setMessageConfirmPassword,
      message: "비밀번호 확인을 입력해주세요.",
    },
    { value: email, setter: setMessageEmail, message: "이메일을 입력해주세요." },
  ];

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 형식 검증
    return regex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let isValid = true;

    validations.forEach(({ value, setter, message }) => {
      if (!value) {
        setter(message); // ✅ 1개만 전달
        isValid = false;
      } else {
        setter("");
      }
    });

    if (password !== password2) {
      setMessageConfirmPassword("비밀번호가 일치하지 않습니다.");
      isValid = false;
    }

    if (email.trim() !== "") {
      const isEmailValid = validateEmail(email);
      if (!isEmailValid) {
        setMessageEmail("유효한 이메일 주소를 입력해주세요.");
        isValid = false;
      }
    }

    if (!isValid) return;

    try {
      const response = await axios.post("/api/register", {
        userId,
        nickName,
        password,
        email,
      });
      if (response.data.success) {
        setMessage("회원가입이 완료되었습니다. 로그인해주세요.");
        // 회원가입 성공 후 리다이렉트 또는 다른 동작을 추가할 수 있습니다.
        window.location.href = "/login"; // 예시로 로그인 페이지로 이동
      }
    } catch (err) {
      setMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
      console.error(err);
      return;
    }
  };

  return (
    <div className="container h-[70vh] flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg mb-2">회원가입</CardTitle>
          <CardDescription>
            <p className="text-sm!">kwy's tech blog에 가입하고</p>
            <p className="text-sm! mt-1">당신의 소중한 의견을 공유해보세요</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-4">
              <div className="grid gap-1">
                <div className="flex items-center min-h-[1.5rem]">
                  <Label htmlFor="userId">아이디</Label>
                  {messageUserId && <p className="text-red-500 text-sm! ml-4">{messageUserId}</p>}
                </div>
                <Input id="userId" type="text" onChange={e => setUserId(e.target.value)} required />
              </div>
              <div className="grid gap-1">
                <div className="flex items-center min-h-[1.5rem]">
                  <Label htmlFor="nickName">닉네임</Label>
                  {messageNickName && (
                    <p className="text-red-500 text-sm! ml-4">{messageNickName}</p>
                  )}
                </div>
                <Input
                  id="nickName"
                  type="text"
                  onChange={e => setNickName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-1">
                <div className="flex items-center min-h-[1.5rem]">
                  <Label htmlFor="password">비밀번호</Label>
                  {messagePassword && (
                    <p className="text-red-500 text-sm! ml-4">{messagePassword}</p>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-1">
                <div className="flex items-center min-h-[1.5rem]">
                  <Label htmlFor="password2">비밀번호 확인</Label>
                  {messageConfirmPassword && (
                    <p className="text-red-500 text-sm! ml-4">{messageConfirmPassword}</p>
                  )}
                </div>
                <Input
                  id="password2"
                  type="password"
                  onChange={e => setPassword2(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-1">
                <div className="flex items-center min-h-[1.5rem]">
                  <Label htmlFor="email">이메일</Label>
                  {messageEmail && <p className="text-red-500 text-sm! ml-4">{messageEmail}</p>}
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="temp12@example.com"
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit} className="w-full hover:cursor-pointer">
            회원가입
          </Button>
          {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
