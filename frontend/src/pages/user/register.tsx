import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
import { cn } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// 입력을 아예 안했을 때
interface ValidationProps {
  value: string;
  setterMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  setterStatus?: React.Dispatch<React.SetStateAction<boolean>>;
}

// 중복검사 아이디, 닉네임, 이메일
interface ValidDuplicateProps {
  value: string;
  url: string;
  setterMessage: React.Dispatch<React.SetStateAction<string>>;
  message1: string;
  message2: string;
  message3: string;
  setterStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Register() {
  const [userId, setUserId] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  const [messageUserId, setMessageUserId] = useState("");
  const [userIdStatus, setUserIdStatus] = useState<true | false>(false);
  const [messageNickName, setMessageNickName] = useState("");
  const [nickNameStatus, setNickNameStatus] = useState<true | false>(false);
  const [messagePassword, setMessagePassword] = useState("");
  const [messageConfirmPassword, setMessageConfirmPassword] = useState("");
  const [password2Status, setPassword2Status] = useState<true | false>(false);
  const [messageEmail, setMessageEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<true | false>(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const validations: ValidationProps[] = [
    {
      value: userId,
      setterMessage: setMessageUserId,
      message: "아이디를 입력해주세요.",
      setterStatus: setUserIdStatus,
    },
    {
      value: nickName,
      setterMessage: setMessageNickName,
      message: "닉네임을 입력해주세요.",
      setterStatus: setNickNameStatus,
    },
    { value: password, setterMessage: setMessagePassword, message: "비밀번호를 입력해주세요." },
    {
      value: password2,
      setterMessage: setMessageConfirmPassword,
      message: "비밀번호 확인을 입력해주세요.",
    },
    {
      value: email,
      setterMessage: setMessageEmail,
      message: "이메일을 입력해주세요.",
      setterStatus: setEmailStatus,
    },
  ];

  // userId, nickName, email 중복 검사
  const validateDuplicate = async ({
    value,
    url,
    setterMessage,
    message1,
    message2,
    message3,
    setterStatus,
  }: ValidDuplicateProps) => {
    if (value.trim() === "") {
      setterMessage(message1);
      setterStatus(false);
      return;
    }
    if (value === email) {
      const isEmailValid = validateEmail(email);
      if (!isEmailValid) {
        setMessageEmail("유효한 이메일 주소를 입력해주세요.");
        return;
      }
    }

    try {
      const response = await axios.post("/api/valid-duplicate-" + url, {
        userId, // 아무리 동적이라도 DTO의 필드명과 같지 않으면 null이기 때문에 다 명시해줌
        nickName,
        email,
      });
      if (response.data.success) {
        setterMessage(message2);
        setterStatus(true);
      }
    } catch (err) {
      setterMessage(message3);
      setterStatus(false);
      console.log(err);
    }
  };

  // 간단한 이메일 형식 검증
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // 비밀번호 확인 처리
  useEffect(() => {
    if (password2.trim() === "") {
      setMessageConfirmPassword("");
      setPassword2Status(false);
      return;
    }

    if (password !== password2) {
      setMessageConfirmPassword("비밀번호가 일치하지 않습니다.");
      setPassword2Status(false);
    } else {
      setMessageConfirmPassword("");
      setPassword2Status(true);
    }
  }, [password, password2]);

  // 가입 버튼 클릭 시 유효성 검사 처리
  const handleValidate = (event: React.FormEvent) => {
    event.preventDefault();
    let isValid = true;

    validations.forEach(({ value, setterMessage, message, setterStatus }) => {
      if (!value) {
        setterMessage(message);
        if (setterStatus) {
          setterStatus(false);
        }
        isValid = false;
      } else {
        setterMessage("");
      }
    });

    if (userId.trim() !== "") {
      if (!userIdStatus) {
        setMessageUserId("아이디 중복 검사가 필요합니다.");
        isValid = false;
      } else {
        setMessageUserId("사용 가능한 아이디입니다.");
      }
    }

    if (nickName.trim() !== "") {
      if (!nickNameStatus) {
        setMessageNickName("닉네임 중복 검사가 필요합니다.");
        isValid = false;
      } else {
        setMessageNickName("사용 가능한 닉네임입니다.");
      }
    }

    if (email.trim() !== "") {
      if (!emailStatus) {
        setMessageEmail("이메일 중복 검사가 필요합니다.");
        isValid = false;
      } else {
        setMessageEmail("사용 가능한 이메일입니다.");
      }
    }

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

    // validate 처리가 모두 통과하면 alert dialog 띄움
    setDialogOpen(true);
  };

  // 가입 처리
  const handleSubmit = async () => {
    const payload = { userId, nickName, password, email };
    try {
      const response = await axios.post("/api/register", payload, {
        headers: { "Contents-Type": "application/json" },
      });
      if (response.data.success) {
        toast.success("회원가입이 완료되었습니다.", {
          // description: "빈 내용은 등록할 수 없습니다.",
          action: {
            label: "확인",
            onClick: () => toast.dismiss(),
          },
        });
        // 회원가입 성공 후 리다이렉트
        window.location.href = "/login";
      }
    } catch (err) {
      toast.warning(
        <div className="ml-2">
          <p>회원가입에 실패했습니다.</p>
          <p>다시 시도해주세요.</p>
        </div>,
        {
          // description: "빈 내용은 등록할 수 없습니다.",
          action: {
            label: "확인",
            onClick: () => toast.dismiss(),
          },
        }
      );
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
                  {messageUserId && (
                    <p
                      className={cn(
                        "ml-4", // 항상 적용
                        "text-sm!", // 항상 적용
                        {
                          "text-green-500": userIdStatus === true,
                          "text-red-500": userIdStatus === false,
                        } // 조건부 클래스
                      )}
                    >
                      {messageUserId}
                    </p>
                  )}
                </div>
                <div className="flex justify-end items-center">
                  <Button
                    className="bg-foreground absolute text-xs w-16 h-7 mr-1 hover:cursor-pointer"
                    size="sm"
                    type="button"
                    onClick={() =>
                      validateDuplicate({
                        value: userId,
                        url: "userId",
                        setterMessage: setMessageUserId,
                        message1: "아이디를 입력해주세요.",
                        message2: "사용 가능한 아이디입니다.",
                        message3: "이미 사용중인 아이디입니다.",
                        setterStatus: setUserIdStatus,
                      })
                    }
                  >
                    중복 체크
                  </Button>
                  <Input
                    id="userId"
                    type="text"
                    onChange={e => setUserId(e.target.value)}
                    className={cn({
                      // 조건부 클래스
                      "border-2 rounded-md border-[oklch(72.3%_0.219_149.579)] shadow-[0_0_5px_rgb(0,255,81)]":
                        userIdStatus === true,
                      "": userIdStatus === false,
                    })}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center min-h-[1.5rem]">
                  <Label htmlFor="nickName">닉네임</Label>
                  {messageNickName && (
                    <p
                      className={cn(
                        "ml-4", // 항상 적용
                        "text-sm!", // 항상 적용
                        {
                          "text-green-500": nickNameStatus === true,
                          "text-red-500": nickNameStatus === false,
                        } // 조건부 클래스
                      )}
                    >
                      {messageNickName}
                    </p>
                  )}
                </div>
                <div className="flex justify-end items-center">
                  <Button
                    className="bg-foreground absolute text-xs w-16 h-7 mr-1 hover:cursor-pointer"
                    size="sm"
                    type="button"
                    onClick={() =>
                      validateDuplicate({
                        value: nickName,
                        url: "nickName",
                        setterMessage: setMessageNickName,
                        message1: "닉네임을 입력해주세요.",
                        message2: "사용 가능한 닉네임입니다.",
                        message3: "이미 사용중인 닉네임입니다.",
                        setterStatus: setNickNameStatus,
                      })
                    }
                  >
                    중복 체크
                  </Button>
                  <Input
                    id="nickName"
                    type="text"
                    onChange={e => setNickName(e.target.value)}
                    className={cn({
                      // 조건부 클래스
                      "border-2 rounded-md border-[oklch(72.3%_0.219_149.579)] shadow-[0_0_5px_rgb(0,255,81)]":
                        nickNameStatus === true,
                      "": nickNameStatus === false,
                    })}
                    required
                  />
                </div>
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
                  className={cn({
                    // 조건부 클래스
                    "border-2 rounded-md border-[oklch(72.3%_0.219_149.579)] shadow-[0_0_5px_rgb(0,255,81)]":
                      password2Status === true,
                    "": password2Status === false,
                  })}
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
                  className={cn({
                    // 조건부 클래스
                    "border-2 rounded-md border-[oklch(72.3%_0.219_149.579)] shadow-[0_0_5px_rgb(0,255,81)]":
                      password2Status === true,
                    "": password2Status === false,
                  })}
                  required
                />
              </div>
              <div className="grid gap-1">
                <div className="flex items-center min-h-[1.5rem]">
                  <Label htmlFor="email">이메일</Label>
                  {messageEmail && (
                    <p
                      className={cn(
                        "ml-4", // 항상 적용
                        "text-sm!", // 항상 적용
                        {
                          "text-green-500": emailStatus === true,
                          "text-red-500": emailStatus === false,
                        } // 조건부 클래스
                      )}
                    >
                      {messageEmail}
                    </p>
                  )}
                </div>
                <div className="flex justify-end items-center">
                  <Button
                    className="bg-foreground absolute text-xs w-16 h-7 mr-1 hover:cursor-pointer"
                    size="sm"
                    type="button"
                    onClick={() =>
                      validateDuplicate({
                        value: email,
                        url: "email",
                        setterMessage: setMessageEmail,
                        message1: "이메일을 입력해주세요.",
                        message2: "사용 가능한 이메일입니다.",
                        message3: "이미 사용중인 이메일입니다.",
                        setterStatus: setEmailStatus,
                      })
                    }
                  >
                    중복 체크
                  </Button>
                  <Input
                    id="email"
                    type="email"
                    placeholder="temp12@example.com"
                    onChange={e => setEmail(e.target.value)}
                    className={cn({
                      // 조건부 클래스
                      "border-2 rounded-md border-[oklch(72.3%_0.219_149.579)] shadow-[0_0_5px_rgb(0,255,81)]":
                        emailStatus === true,
                      "": emailStatus === false,
                    })}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleValidate} className="w-full hover:cursor-pointer">
            회원가입
          </Button>
        </CardFooter>
      </Card>

      {/* shadcn AlertDialog는 컴포넌트화 못 함 */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {/* <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>회원가입 하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              입력하신 회원 정보로 가입 처리를 진행합니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:cursor-pointer">취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} className="hover:cursor-pointer">
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
