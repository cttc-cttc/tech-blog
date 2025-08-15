import {
  AlertDialog,
  AlertDialogAction,
  // AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checkBlankInput, handleKeyDownEnter } from "../components/utils/user-utils";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [message, setMessage] = useState("");
  const password1Ref = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  const [showRetry, setShowRetry] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [isDisabled1, setIsDisabled1] = useState(false);
  const [isDisabled2, setIsDisabled2] = useState(false);
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!checkBlankInput(newPassword, "새 비밀번호를 입력해주세요.")) {
      password1Ref.current?.focus();
      return;
    }

    if (newPassword !== newPassword2) {
      toast.warning("새 비밀번호가 일치하지 않습니다.", {
        action: {
          label: "확인",
          onClick: () => toast.dismiss(),
        },
      });
      password2Ref.current?.focus();
      return;
    }

    const payload = { token, newPassword };

    try {
      const response = await axios.post("/api/reset-password", payload);
      setMessage(response.data); // 비밀번호 변경 완료
      setDialogOpen(true);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      setMessage("만료된 토큰입니다. 재요청 해주세요.");
      setIsDisabled1(true);
      setIsDisabled2(true);
      setShowRetry(true);
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleRetry = () => {
    navigate("/forgot-password");
  };

  return (
    <>
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
                    ref={password1Ref}
                    disabled={isDisabled1 || dialogOpen}
                    id="password1"
                    type="password"
                    onChange={e => setNewPassword1(e.target.value)}
                    required
                    onKeyDown={e => handleKeyDownEnter(e, handleReset, setMessage)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password2">새 비밀번호 재입력</Label>
                  </div>
                  <Input
                    ref={password2Ref}
                    disabled={isDisabled2 || dialogOpen}
                    id="password2"
                    type="password"
                    onChange={e => setNewPassword2(e.target.value)}
                    required
                    onKeyDown={e => handleKeyDownEnter(e, handleReset, setMessage)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            {!showRetry ? (
              <Button onClick={handleReset} className="w-full hover:cursor-pointer">
                비밀번호 변경
              </Button>
            ) : (
              <Button onClick={handleRetry} className="w-full hover:cursor-pointer">
                비밀번호 재설정 요청
              </Button>
            )}
            {message && (
              <p
                className={cn(
                  "text-sm!", // 항상 적용
                  {
                    "text-green-500": dialogOpen === true,
                    "text-red-500": dialogOpen === false,
                  } // 조건부 클래스
                )}
              >
                {message}
              </p>
            )}
          </CardFooter>
        </Card>
      </div>

      {/* shadcn AlertDialog는 컴포넌트화 못 함 */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {/* <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>비밀번호 변경 완료</AlertDialogTitle>
            <AlertDialogDescription>
              비밀번호가 성공적으로 변경되었습니다. 새 비밀번호로 로그인 해주세요.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogCancel>취소</AlertDialogCancel> */}
            <AlertDialogAction onClick={navigateToLogin} className="hover:cursor-pointer">
              로그인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
