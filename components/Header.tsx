import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/app/hooks";

export default function Header() {
  const mobileState = useAppSelector((state) => state.mobile);

  const router = useRouter();

  const [middleText, setMiddleText] = useState("");
  const [rightText, setRightText] = useState("");
  const [isLogo, setIsLogo] = useState(true);

  useEffect(() => {
    const pathname = router.pathname;
    if (['/', '/add', '/mypage'].includes(pathname)) {
      setIsLogo(true);
    } else {
      setIsLogo(false);
    }
    if (pathname.startsWith("/products") && pathname.endsWith("/update")) {
      setMiddleText("수정하기");
      setRightText("");
    } else if (pathname === "/mypage/update") {
      setMiddleText("프로필 수정");
      setRightText("저장");
    } else if (pathname === "/mypage/products") {
      setMiddleText("등록한 상품 목록");
      setRightText("");
    }
  }, [router]);

  return (
    <>
      {!mobileState ? (
        <div className="header-web">
          <div className="logo-box" onClick={() => router.push("/")}>
            <img className="tirrilee-logo" src="/img/tirrilee-logo.svg" />
          </div>
          <div className="link-list">
            <div
              className={
                "link-box " + (router.pathname === "/add" ? "active" : "")
              }
              onClick={() => router.push("/add")}
            >
              <img
                src={
                  "/img/add-icon" +
                  (router.pathname === "/add" ? "-active" : "") +
                  ".png"
                }
                className="link-icon"
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
                src={
                  "/img/mypage-icon" +
                  (router.pathname.startsWith("/mypage") ? "-active" : "") +
                  ".png"
                }
                className="link-icon"
              />
              <span className="link-text Body2SMedium">마이페이지</span>
            </div>
          </div>
          <style jsx>{`
            .header-web {
              height: 56px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              margin: 0;
              padding: 0 62px;
              border: solid 1px var(--gray-scale-gray-2);
              background-color: var(--gray-scale-white);
            }
            .logo-box {
              height: 22px;
              padding: 0;
              cursor: pointer;
            }
            .tirrilee-logo {
              width: 78px;
              height: 22px;
              flex-grow: 0;
              object-fit: contain;
            }
            .link-list {
              height: 21px;
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              align-items: center;
              gap: 24px;
              padding: 0;
            }
            .link-box {
              height: 21px;
              flex-grow: 0;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              gap: 8px;
              padding: 0;
              color: var(--gray-scale-gray-8);
              cursor: pointer;
            }
            .active {
              color: var(--primary-primary);
              filter: invert(28%) sepia(91%) saturate(2569%) hue-rotate(212deg)
                brightness(97%) contrast(92%);
            }
            .link-icon {
              height: 20px;
              flex-grow: 0;
              object-fit: contain;
            }
            .link-text {
              height: 21px;
              flex-grow: 0;
              text-align: center;
            }
          `}</style>
        </div>
      ) : (
        <>
          <div className="header-mobile">
            {!!isLogo ? 
            <div className="logo-box" onClick={() => router.push("/")}>
              <img className="tirrilee-logo" src="/img/tirrilee-logo.svg" />
            </div> :
            <>
              <img
                className="back"
                src="/img/left.png"
                alt="left"
                onClick={() => router.back()}
              />
              <span className="middle-text Body1SSemibold">{middleText}</span>
              <span className="right-text Body1SSemibold">{rightText}</span>
            </>
            }
          </div>
          <style jsx global>{`
            .header-mobile {
              width: 414px;
              height: 48px;
              display: flex;
              flex-direction: row;
              justify-content: ${!!isLogo ? "center" : "space-between"};
              align-items: center;
              margin: 0 auto;
              border: solid 1px var(--gray-scale-gray-2);
              background-color: var(--gray-scale-white);
            }
            .tirrilee-logo {
              width: 72px;
              height: 20px;
              object-fit: contain;
              cursor: pointer; 
            }
            .back {
              width: 20px;
              height: 20px;
              object-fit: contain;
              cursor: pointer;
            }
            .middle-text {
              text-align: center;
              color: var(--gray-scale-black);
              cursor: pointer;
            }
            .right-text {
              text-align: center;
              color: var(--primary-primary);
              cursor: pointer;
            }
          `}</style>
        </>
      )}
    </>
  );
}
