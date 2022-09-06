import { useRouter } from "next/router";
import { useAppSelector } from "../store/app/hooks";

export default function Footer() {
  const mobileState = useAppSelector((state) => state.mobile);

  const router = useRouter();
  return (
    <>
      <div className="footer-mobile">
        <div
          className={"link-box " + (router.pathname === "/" ? "active" : "")}
          onClick={() => router.push("/")}
        >
          <img
            className="link-icon"
            src={
              "/img/home-icon" +
              (router.pathname === "/" ? "-active" : "") +
              ".png"
            }
          />
          <span className="link-text Body2SMedium">홈</span>
        </div>
        <div
          className={"link-box " + (router.pathname === "/add" ? "active" : "")}
          onClick={() => router.push("/add")}
        >
          <img
            className="link-icon"
            src={
              "/img/add-icon" +
              (router.pathname === "/add" ? "-active" : "") +
              ".png"
            }
          />
          <span className="link-text Body2SMedium">추가하기</span>
        </div>
        <div
          className={
            "link-box " +
            (router.pathname.startsWith("/mypage") ? "active" : "")
          }
          onClick={() => router.push("/mypage")}
        >
          <img
            className="link-icon"
            src={
              "/img/mypage-icon" +
              (router.pathname.startsWith("/mypage") ? "-active" : "") +
              ".png"
            }
          />
          <span className="link-text Body2SMedium">마이페이지</span>
        </div>
        <style jsx>{`
          .footer-mobile {
            width: 414px;
            height: 64px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin: 48px auto 0 auto;
            padding: 0 21px;
            border: solid 1px var(--gray-scale-gray-3);
            background-color: var(--gray-scale-white);
          }
          .link-box {
            width: 124px;
            height: 41px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            gap: 6px;
            padding: 0;
            cursor: pointer;
          }
          .link-icon {
            width: 20px;
            height: 20px;
            object-fit: contain;
          }
          .link-text {
            height: 15px;
            flex-grow: 0;
            font-family: PretendardVariable;
            font-size: 10px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: center;
            color: var(--gray-scale-gray-8);
          }
          .active {
            color: var(--primary-primary);
          }
        `}</style>
      </div>
    </>
  );
}
