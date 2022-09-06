import { useRouter } from "next/router";
import CategoryTag from "../../components/CategoryTag";
import Btn from "../../components/Btn";
import Modal from "../../components/Modal";
import ModalBase from "../../components/ModalBase";
import { useAppSelector } from "../../store/app/hooks";
import { useState } from "react";
import { useSession } from "next-auth/react";

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

export default function Detail() {
  const mobileState = useAppSelector((state) => state.mobile);
  
  const router = useRouter();
  const productId = Number(router.query.id);
  const { data: session, status } = useSession();
  const userName = (!!session ? session.user.userName : '');
  const productState = useAppSelector((state) => state.product);
  const product = productState.find((item: Product) => item.id === productId);

  // modal
  const [isActive, setIsActive] = useState(false);

  const onModalOpen = () => {
    setIsActive(true);
  };
  const onModalClose = () => {
    setIsActive(false);
  };
  const onModalAction = () => {
    alert("삭제되었습니다.");
    router.push('/');
  };

  return (
    <div className="sub-container">
      {!mobileState ? 
      <img
        className="back"
        src="/img/left.png"
        alt="left"
        onClick={() => router.back()}
      /> : null}
      <img src="/img/product-detail-image.png" alt="product-detail-image" />
      <div className="product-box">
        <div className="product-info-box">
          <CategoryTag category={product?.category} />
          <span className="product-title H6SRegular">{product?.title}</span>
          <span className="product-price H4SBold">{product?.price}원</span>
        </div>
        <div className="product-detail-box">
          <span className="product-detail-title Body1MSemibold">상품 설명</span>
          <span className="product-detail-detail Body2MRegular">
            {product?.detail}
          </span>
        </div>
        {product?.seller !== userName ? (
          <div className="seller-box">
            <span className="seller Body1MSemibold">판매자</span>
            <div className="seller-info-box">
              <img
                className="seller-image"
                src={product?.sellerImg}
                alt="seller-image"
              />
              <span className="seller Body2MRegular">{product?.seller}</span>
            </div>
          </div>
        ) : (
          <>
            <div className="btn-box">
              <Btn text="삭제하기" type="outline" size="l" color="gray" width="180px"  onClick={onModalOpen}/>
              <Btn text="수정하기" type="outline" size="l" color="primary" width="180px" onClick={() => router.push(`/products/${productId}/update`)} />
            </div>
            <ModalBase active={isActive} closeEvent={onModalClose}>
              <Modal
                active={isActive}
                closeEvent={onModalClose}
                title="정말 삭제하시겠습니까?"
                actionMsg="식제하기"
                actionEvent={onModalAction}
              >
                등록한 상품이 삭제됩니다.
              </Modal>
            </ModalBase>
          </>
        )}
      </div>
      <style jsx>{`
        .sub-container {
          width: ${!mobileState ? "763px" : "414px"};
          display: flex;
          flex-direction: column;
          margin: 0 auto;
        }
        .back {
          width: 32px;
          height: 32px;
          object-fit: contain;
          margin: 20px 0;
          cursor: pointer;
        }
        .product-box {
          margin: 0 21px;
          display: flex;
          flex-direction: column;
        }
        .product-info-box {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 12px;
          padding: 20px 0;
          border-bottom: solid 1px var(--gray-scale-gray-2);
        }
        .product-title {
          color: var(--gray-scale-black);
        }
        .product-price {
          color: var(--gray-scale-black);
        }
        .product-detail-box {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 8px;
          padding: 32px 0;
        }
        .product-detail-title {
          text-align: center;
          color: var(--gray-scale-black);
        }
        .product-detail-detail {
          text-align: left;
          color: var(--gray-scale-gray-8);
          white-space: pre-line;
        }
        .seller-box {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 8px;
          padding: 0;
        }
        .seller-info-box {
          height: 40px;
          align-self: stretch;
          flex-grow: 0;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          gap: 12px;
          margin-bottom: 78px;
        }
        .seller-image {
          width: 40px;
          height: 40px;
          flex-grow: 0;
        }
        .seller {
          flex-grow: 1;
          text-align: left;
          color: var(--gray-scale-gray-8);
        }
        .btn-box {
          display: flex;
          justify-content: end;
          gap: 20px;
          margin-bottom: 60px;
        }
      `}</style>
    </div>
  );
}
