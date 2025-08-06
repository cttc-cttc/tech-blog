import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
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
import { Link } from "react-router-dom";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (message) {
      setMessage("");
    }

    if (!userId || !password) {
      setMessage("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/login", {
        userId,
        password,
      });
      if (response.data.success) {
        window.location.href = "/"; // 로그인 성공 시 홈으로 이동
      } else {
        setMessage("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    } catch (err) {
      setMessage("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
      console.error(err);
      return;
    }
  };

  return (
    <div className="container h-[70vh] flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg mb-2">로그인</CardTitle>
          <CardDescription>계정을 입력하고 로그인하세요</CardDescription>
          <CardAction>
            <Button variant="link">
              <Link to="/register">회원가입</Link>
            </Button>
          </CardAction>
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
                  <Label htmlFor="password">비밀번호</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    비밀번호를 잊어버렸어요
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit} className="w-full hover:cursor-pointer">
            로그인
          </Button>
          {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
