import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { useAppSelector } from "../store/app/hooks";

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

export default function Home() {
  const mobileState = useAppSelector((state) => state.mobile);
  
  const productState = useAppSelector((state) => state.product);
  const [categories, setCategories] = useState([
    "전체",
    "에코백",
    "티셔츠",
    "기타물품",
  ]);

  const [products, setProducts] = useState(productState);

  const [selectedCategory, setSelectedCategory] = useState("전체");

  useEffect(() => {
    if (selectedCategory === "전체") {
      setProducts(productState);
    } else {
      setProducts(
        productState.filter(
          (product: Product) => product.category === selectedCategory
        )
      );
    }
  }, [selectedCategory, productState]);

  const handleCategory = (category : string) => setSelectedCategory(category)

  return (
    <div className="sub-container">
      <div className="title H3SBold">상품 목록</div>
      <div className="category-list">
        {categories.map((category, idx) => (
          <div className="category-box" key={idx}>
            <span
              className={
                "category H5MBold " +
                (category === selectedCategory ? "active" : "")
              }
              onClick={() => handleCategory(category)}
            >
              {category}
            </span>
            {idx < categories.length - 1 ? (
              <div className="category-rectangle"></div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="product-list">
        {products?.map((product: Product, idx: number) => (
          <ProductList key={idx} {...product} isMobile={mobileState} />
        ))}
      </div>
      <style jsx>{`
        .sub-container {
          margin: 40px 0 48px 0;
          ${!mobileState ? "" : "padding: 0 21px;"}
        }
        .title {
          text-align: left;
          color: var(--gray-scale-black);
        }
        .category-list {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          gap: 12px;
          margin: 20px 0 32px 0;
          padding: 0;
        }
        .category-box {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          gap: 12px;
        }
        .category {
          text-align: left;
          color: var(--gray-scale-gray-5);
          cursor: pointer;
        }
        .active {
          color: var(--gray-scale-black);
        }
        .category-rectangle {
          width: 1px;
          height: 12px;
          background-color: var(--gray-scale-gray-5);
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
