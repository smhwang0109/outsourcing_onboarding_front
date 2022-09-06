import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Btn from "../../components/Btn";
import Input from "../../components/Input";
import { useAppSelector } from "../../store/app/hooks";

export default function MyPage() {
  const mobileState = useAppSelector((state) => state.mobile);

  const router = useRouter();
  const { data: session, status } = useSession();

  const [user, setUser] = useState(session?.user);

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (!!user) {
      setUserName(user.userName);
      setUserId(user.userId);
    }
  }, [user]);

  const handleValue = (
    setValue: Dispatch<SetStateAction<any>>,
    e: ChangeEvent<HTMLInputElement>
  ) => setValue(e.target.value);

  return (
    <div className="sub-container">
      {!mobileState ?
        <>
          <img
            className="back"
            src="/img/left.png"
            alt="left"
            onClick={() => router.back()}
          />
          <div className="title H3SBold">프로필 수정</div>
        </>      
      : null}
      <div className="user-img-box">
        <img className="user-img" src={user?.userImg} alt="user-img" />
        <Btn
          text="사진 변경"
          type="fill"
          size="s"
          color="primary"
          width="78px"
          onClick={() => router.push("/mypage/update")}
        />
      </div>
      <div className="user-info-box">
        <Input
          label="이름"
          id="userName"
          placeholder="이름"
          value={userName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleValue(setUserName, e)
          }
        />
        <Input
          label="아이디"
          id="userId"
          placeholder="아이디"
          value={userId}
          disabled
        />
      </div>
      {!mobileState ?
      <Btn
        text="저장"
        type="fill"
        size="xl"
        color="primary"
        width="372px"
        onClick={() => router.push("/mypage")}
      />
      : null}
      <style jsx>{`
        .sub-container {
          width: ${!mobileState ? "372px" : "414px"};
          display: flex;
          flex-direction: column;
          margin: 0 auto;
          ${!mobileState ? "" : "padding: 0 21px;"}          
        }
        .back {
          width: 32px;
          height: 32px;
          object-fit: contain;
          margin: 20px 0;
          cursor: pointer;
        }
        .title {
          margin-bottom: 20px;
          text-align: left;
          color: var(--gray-scale-black);
        }
        .user-img-box {
          height: 200px;
          padding: 48px auto 28px auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
          border-bottom: solid 1px var(--gray-scale-gray-2);
        }
        .user-img {
          width: 96px;
          height: 96px;
        }
        .user-info-box {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin: 32px 0 48px 0;
        }
      `}</style>
    </div>
  );
}
