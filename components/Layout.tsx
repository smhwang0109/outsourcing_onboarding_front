import { ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "./Header";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../store/app/hooks";
import { useMediaQuery } from "react-responsive";
import { mobile, pc } from "../store/features/mobile/mobileSlice";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  // 반응형
  const mobileState = useAppSelector((state) => state.mobile);
  const mobileMedia = useMediaQuery({ query: "(max-width: 1280px)" });
  
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (mobileMedia) {
      dispatch(mobile())
    } else {
      dispatch(pc())
    }
  }, [mobileMedia]);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (router.pathname !== "/login" && status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && router.pathname === "/login") {
      router.push("/");
    }
  }, [router.pathname, status]);

  return (
    <>
      {router.pathname !== "/login" ? <Header /> : null }
      <div className="body">
        <div className="container">{children}</div>
      </div>
      {['/', '/add', '/mypage'].includes(router.pathname) && !!mobileState ? <Footer /> : null }
      <style jsx>{`
        .body {
          margin: ${!mobileState ? "0 62px 0 62px" : "0"};
        }
        .container {
          width: ${!mobileState ? "1156px" : "414px"};
          margin: 0 auto;
        }
      `}</style>
    </>
  );
}
