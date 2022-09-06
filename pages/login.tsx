import { useRouter } from "next/router";
import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import { signIn } from "next-auth/react";
import Btn from "../components/Btn";
import Input from "../components/Input";
import { useAppSelector } from "../store/app/hooks";

export default function Login() {
  const mobileState = useAppSelector((state) => state.mobile);

  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const onLogin = async () => {
    const response = await signIn("email-password-credential", {
      email: userId,
      password: userPw,
      redirect: false,
    });

    if (!response?.error) {
      router.push("/");
    } else {
      alert(response.error);
    }
  };

  const handleValue = (
    setValue: Dispatch<SetStateAction<string>>,
    e: ChangeEvent<HTMLInputElement>
  ) => setValue(e.target.value);

  return (
    <div className="sub-container">
      <img className="logo" src="img/tirrilee-logo.svg" />
      <div className="input-box">
        <Input
          label="아이디"
          id="userId"
          placeholder="이메일 아이디를 입력하세요."
          value={userId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleValue(setUserId, e)
          }
        />
        <Input
          label="비밀번호"
          id="userPw"
          placeholder="비밀번호를 입력하세요."
          type="password"
          value={userPw}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleValue(setUserPw, e)
          }
        />
      </div>
      <div className="btn-box">
        <Btn
          text="로그인"
          type="fill"
          color="primary"
          size="xl"
          width="372px"
          onClick={onLogin}
        />
      </div>
      <style jsx>{`
        .sub-container {
          width: ${!mobileState ? "372px" : "414px"};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          ${!mobileState ? "" : "padding: 0 21px;"}
        }
        .logo {
          width: 180px;
          height: 50px;
          margin: 100px 0 120px 0;
          object-fit: contain;
        }
        .input-box {
          width: 372px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .btn-box {
          margin: 48px 0 188px 0;
        }
      `}</style>
    </div>
  );
}
