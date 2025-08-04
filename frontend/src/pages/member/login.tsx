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
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="container h-[65vh] flex justify-center items-center">
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
                <Label htmlFor="userId">ID</Label>
                <Input id="userId" type="text" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    비밀번호 재설정
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full hover:cursor-pointer">
            로그인
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
