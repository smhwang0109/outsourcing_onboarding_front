import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ProductList from "../../components/ProductList";
import { useAppSelector } from "../../store/app/hooks";

interface Product {
  id: number;
  image: string;
  title: string;
  category: string;
  price: number;
  detail: string;
  seller: string;
  sellerImg: string;
}

export default function Products() {
  const mobileState = useAppSelector((state) => state.mobile);

  const router = useRouter();
  const productState = useAppSelector((state) => state.product);
  const [products, setProducts] = useState(productState);
  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!!productState) {
      setProducts(
        productState.filter(
          (product: Product) => product.seller === user?.userName
        )
      );
    }
  }, [productState]);

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
        <div className="title H3SBold">등록한 상품 목록</div>
      </>
      : null}
      <div className="sub-title H5MBold">
        총{" "}
        <span className="sub-title-accent">
          {!!products ? products.length : 0}개
        </span>
        의 상품
      </div>
      <div className="product-list">
        {products?.map((product: Product, idx: number) => (
          <ProductList key={idx} {...product} />
        ))}
      </div>
      <style jsx>{`
        .sub-container {
          width: ${!mobileState ? "" : "414px"};
          margin: 20px 0 158px 0;
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
          text-align: left;
          color: var(--gray-scale-black);
        }
        .sub-title {
          margin: ${!mobileState ? "32px 0" : "28px 0 20px 0"};
          text-align: left;
          color: var(--gray-scale-black);
        }
        .sub-title-accent {
          color: var(--primary-primary);
        }
        .product-list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 12px;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
