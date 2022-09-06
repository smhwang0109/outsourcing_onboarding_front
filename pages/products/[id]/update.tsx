import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import Input from "../../../components/Input";
import Chip from "../../../components/Chip";
import Btn from "../../../components/Btn";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import { update } from "../../../store/features/product/productSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

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

export default function Update() {
  const mobileState = useAppSelector((state) => state.mobile);

  const router = useRouter();
  const productId = Number(router.query.id);
  const productState = useAppSelector((state) => state.product);
  const product = productState.find((item: Product) => item.id === productId);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const [categories, setCategories] = useState([
    "에코백",
    "티셔츠",
    "기타물품",
  ]);

  useEffect(() => {
    if (!!product) {
      setTitle(product.title);
      setPrice(product.price);
      setDetail(product.detail);
      setCategory(product.category);
    }
  }, [product]);

  useEffect(() => {
    if (!!title && !!price && !!detail && !!category && Number(price) !== 0) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [title, price, detail, category]);

  const handleValue = (
    setValue: Dispatch<SetStateAction<any>>,
    e: ChangeEvent<HTMLInputElement>
  ) => setValue(e.target.value);

  const handleSpanValue = (
    setValue: Dispatch<SetStateAction<string>>,
    e: ChangeEvent<HTMLInputElement>
  ) => setValue(e.currentTarget.innerText);

  const { data: session, status } = useSession();

  const dispatch = useAppDispatch();

  const handleUpdateProduct = () => {
    dispatch(
      update({
        id: product.id,
        image: product.image,
        title: title,
        category: category,
        price: Number(price),
        detail: detail,
        seller: !!session ? session?.user.userName : "tirrilee1",
        sellerImg: !!session ? session?.user.userImg : "/img/user-img.png",
      })
    );
    router.push("/");
  };

  return (
    <>
      {!mobileState ? 
      <div className="update-container">
        <img
          className="back"
          src="/img/left.png"
          alt="left"
          onClick={() => router.back()}
        />
        <div className="update-text H3SBold">수정하기</div>
      </div>
      : null}
      <div className="sub-container">
        <img
          className="upload-img"
          src={!!product ? product.image : "/img/camera.png"}
          alt="camera"
        />
        <div className="product-info-box">
          <Input
            id="title"
            label="제품명"
            placeholder="제품명을 입력해주세요."
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleValue(setTitle, e)
            }
          />
          <Input
            id="price"
            label="가격을 입력해주세요."
            placeholder="0원"
            type="number"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleValue(setPrice, e)
            }
          />
          <Input
            id="detail"
            label="상세설명"
            placeholder="상세한 상품 설명을 입력해주세요."
            type="text"
            shape="vertical"
            height="136px"
            value={detail}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleValue(setDetail, e)
            }
          />
          <div className="category-box">
            <span className="category Body2SMedium">카테고리</span>
            <div className="category-chip-box">
              {categories.map((item, idx) => (
                <div key={idx}>
                  <Chip
                    text={item}
                    state={item === category ? "on" : "off"}
                    onClick={(e: ChangeEvent<HTMLInputElement>) =>
                      handleSpanValue(setCategory, e)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <Btn
            text="완료"
            type="fill"
            color="primary"
            size="xl"
            width="372px"
            disabled={!isComplete}
            onClick={handleUpdateProduct}
          />
        </div>
      </div>
      <style jsx>{`
        .update-container {
          width: 764px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: 20px auto;
        }
        .back {
          width: 32px;
          height: 32px;
          cursor: pointer;
        }
        .sub-container {
          width: ${!mobileState ? "764px" : "414px"};
          display: flex;
          flex-direction: ${!mobileState ? "row" : "column"};
          gap: 20px;
          margin: ${!mobileState ? "20px auto 128px auto" : "0 auto"};
        }
        .upload-img {
          width: ${!mobileState ? "372px" : "414px"};
          height: ${!mobileState ? "372px" : "414px"};
        }
        .product-info-box {
          display: flex;
          flex-direction: column;
          gap: 28px;
          ${!mobileState ? "" : "padding: 0 21px;"}
        }
        .category-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .category {
          text-align: left;
          color: var(--gray-scale-gray-8);
        }
        .category-chip-box {
          display: flex;
          gap: 12px;
        }
      `}</style>
    </>
  );
}
