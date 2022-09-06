import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import Input from "../components/Input";
import Chip from "../components/Chip";
import Btn from "../components/Btn";
import { useAppDispatch, useAppSelector } from "../store/app/hooks";
import { add } from "../store/features/product/productSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Add() {
  const mobileState = useAppSelector((state) => state.mobile);

  const router = useRouter()
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

  const handleAddProduct = () => {
    dispatch(add({
      image: "/img/product-detail-image.png",
      title: title,
      category: category,
      price: Number(price),
      detail: detail,
      seller: (!!session ? session?.user.userName : 'tirrilee1'),
      sellerImg: (!!session ? session?.user.userImg : '/img/user-img.png'),
    }))
    router.push('/')
  };

  return (
    <>
      <div className="sub-container">
        <img className="upload-img" src="/img/camera.png" alt="camera" />
        <div className="product-info-box">
          <Input
            id="title"
            label="제품명"
            placeholder="제품명을 입력해주세요."
            type="text"
            shape="horizontal"
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
            shape="horizontal"
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
            onClick={handleAddProduct}
          />
        </div>
      </div>
      <style jsx>{`
        .sub-container {
          width: ${!mobileState ? "764px" : "414px"};
          display: flex;
          flex-direction: ${!mobileState ? "row" : "column"};
          gap: 20px;
          margin: ${!mobileState ? "40px auto 128px auto" : "0 auto"};
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
