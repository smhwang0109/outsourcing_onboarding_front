import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Btn from "../../components/Btn";
import { useAppSelector } from "../../store/app/hooks";

export default function MyPage() {
  const mobileState = useAppSelector((state) => state.mobile);

  const router = useRouter();
  const { data: session, status } = useSession();

  const user = session?.user;

  return (
    <div className="sub-container">
      <div className="user-info-box">
        <img className="user-img" src={user?.userImg} alt="user-img" />
        <div className="user-name-box">
          <span className="Body1SSemibold">{user?.userName}</span>
          <span className="Caption1SRegular">{user?.userId}</span>
        </div>
        <Btn
          text="수정하기"
          type="fill"
          size="s"
          color="primary"
          width="73px"
          onClick={() => router.push("/mypage/update")}
        />
      </div>
      <div className="menu-box" onClick={() => router.push("/mypage/products")}>
        <img src="/img/gift.png" alt="gift" />
        <span className="product-text Body1SRegular">등록한 상품 목록</span>
        <img src="/img/angle-right.png" alt="angle-right" />
      </div>
      <div className="menu-box" onClick={() => signOut()}>
        <img src="/img/left.png" alt="left" />
        <span className="logout-text Body1SRegular">로그아웃</span>
      </div>
      <div className="menu-box">
        <img src="/img/leave.png" alt="leave" />
        <span className="leave-text Body1SRegular">탈퇴하기</span>
      </div>

      <style jsx>{`
        .sub-container {
          width: ${!mobileState ? "372px" : "414px"};
          height: ${!mobileState ? "" : "896px"};
          display: flex;
          flex-direction: column;
          margin: 0 auto;
          ${!mobileState ? "" : "padding: 0 21px;"}
        }
        .user-info-box {
          padding: 40px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }
        .user-img {
          width: 64px;
          height: 64px;
        }
        .user-name-box {
          width: 195px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
        }
        .menu-box {
          height: 64px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          border-top: solid 1px var(--gray-scale-gray-2);
        }
        .menu-box > img {
          width: 20px;
          height: 20px;
        }
        .product-text {
          width: 300px;
          text-align: left;
          color: var(--gray-scale-black);
        }
        .logout-text {
          width: 336px;
          text-align: left;
          color: var(--gray-scale-black);
        }
        .leave-text {
          width: 336px;
          text-align: left;
          color: var(--gray-scale-gray-5);
        }
      `}</style>
    </div>
  );
}
