import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@/pages/components/utils/common-interfaces";
import { useState, useEffect } from "react";

interface UserFormProps {
  userInfo?: User; // undefined 허용
  onSubmit: (formData: UserFormData) => void;
}

export interface UserFormData {
  userId: string;
  nickName: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export default function UserForm({ userInfo, onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState({
    userId: "",
    nickName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // 처음 userInfo 로 초기화
  useEffect(() => {
    if (userInfo) {
      setFormData({
        userId: userInfo.userId,
        nickName: userInfo.nickName,
        email: userInfo.email,
        password: "",
        confirmPassword: "",
      });
    }
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // input 태그의 name, value 속성
    setFormData(prev => ({ ...prev, [name]: value })); // name 필드만 새 값으로 교체
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 부모 컴포넌트로 데이터 전달
    onSubmit(formData);
  };

  return (
    <form id="user-form" onSubmit={handleSubmit}>
      <Input type="hidden" value={formData.userId} name="userId" />
      <Label>닉네임</Label>
      <Input
        type="text"
        name="nickName"
        value={formData.nickName}
        onChange={handleChange}
        className="mt-2 mb-4"
      />

      <Label>새 비밀번호</Label>
      <Input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="mt-2 mb-4"
      />

      <Label>새 비밀번호 재입력</Label>
      <Input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="mt-2 mb-4"
      />

      <Label>이메일</Label>
      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="mt-2"
      />

      <button type="submit" className="hidden" />
    </form>
  );
}
