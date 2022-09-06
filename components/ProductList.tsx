import { useRouter } from "next/router";
import { useAppSelector } from "../store/app/hooks";
import CategoryTag from "./CategoryTag";

interface Product {
  isMobile?: boolean,
  id: number,
  image: string;
  category: string;
  title: string;
  price: number;
}

export default function ProductList({ id, image, category, title, price }: Product) {
  const mobileState = useAppSelector((state) => state.mobile);
  
  const router = useRouter();

  const onClick = (id : number) => {
    router.push(`/products/${id}`);
  }
  
  return (
    <div className="product-box" onClick={() => onClick(id)}>
      <img className="product-image" src={image} alt="product-image" />
      <div className="product-info-box">
        <CategoryTag category={category} />
        <span className="product-title Body2SRegular">{title}</span>
        <span className="product-price H6SBold">{price}원</span>
      </div>
      <style jsx>{`
        .product-box {
          width: ${!mobileState ? "274px" : "180px"};
          height: ${!mobileState ? "374px" :"268px"};
          gap: ${!mobileState ? "12px" : "8px"};
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 0;
          cursor: pointer;
        }
        .product-image {
          width: ${!mobileState ? "274px" : "180px"};
          height: ${!mobileState ? "274px" : "180px"};
          border-radius: 8px;
        }
        .product-info-box {
          height: 88px;
          align-self: stretch;
          flex-grow: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: ${!mobileState ? "8px" : "4px"};
          padding: 0;
        }
        .product-title {
          height: 21px;
          align-self: stretch;
          flex-grow: 0;
          text-align: left;
          color: var(--gray-scale-gray-9);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .product-price {
          width: 76px;
          height: 27px;
          flex-grow: 0;
          text-align: left;
          color: var(--gray-scale-black);
        }
      `}</style>
    </div>
  );
}
