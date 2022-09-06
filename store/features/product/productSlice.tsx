import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductInfo {
  id?: number;
  image: string;
  title: string;
  category: string;
  price: number;
  detail: string;
  seller: string;
  sellerImg: string;
}

type ProductState = ProductInfo[];

const detail = `안녕하세요. 티릴리 온보딩 시스템을 위한 디자인입니다. 상품에 대한 자세한 설명을 적어주세요. 상품에 대한 설명이 나타나는 공간입니다. 설명 내용이 나타납니다.

티릴리 온보딩 시스템을 위한 디자인입니다. 상품에 대한 자세한 설명을 적어주세요. 티릴리 온보딩 시스템을 위한 디자인입니다. 상품에 대한 자세한 설명을 적어주세요. 티릴리 온보딩 시스템을 위한 디자인입니다. 상품에 대한 자세한 설명을 적어주세요.`;

const initialState: ProductState = [
  {
    id: 1,
    image: "/img/product-detail-image.png",
    title: "깔끔하고 이쁜 화이트 컬러 에코백",
    category: "에코백",
    price: 10000,
    detail: detail,
    seller: "tirrilee",
    sellerImg: "/img/seller-img.png",
  },
  {
    id: 2,
    image: "/img/product-detail-image.png",
    title: "그린 에코백",
    category: "에코백",
    price: 12000,
    detail: detail,
    seller: "tirrilee1",
    sellerImg: "/img/seller-img.png",
  },
  {
    id: 3,
    image: "/img/product-detail-image.png",
    title: "블랙 컬러 에코백",
    category: "에코백",
    price: 8000,
    detail: detail,
    seller: "tirrilee1",
    sellerImg: "/img/seller-img.png",
  },
  {
    id: 4,
    image: "/img/product-detail-image.png",
    title: "깔끔한 화이트 반소매 티셔츠",
    category: "티셔츠",
    price: 20000,
    detail: detail,
    seller: "tirrilee",
    sellerImg: "/img/seller-img.png",
  },
  {
    id: 5,
    image: "/img/product-detail-image.png",
    title: "기본 민트컬러 티셔츠",
    category: "티셔츠",
    price: 20000,
    detail: detail,
    seller: "tirrilee",
    sellerImg: "/img/seller-img.png",
  },
  {
    id: 6,
    image: "/img/product-detail-image.png",
    title: "인스타그램 모양 키링",
    category: "기타물품",
    price: 20000,
    detail: detail,
    seller: "tirrilee",
    sellerImg: "/img/seller-img.png",
  },
  {
    id: 7,
    image: "/img/product-detail-image.png",
    title: "애플로고 그립톡",
    category: "기타물품",
    price: 20000,
    detail: detail,
    seller: "tirrilee",
    sellerImg: "/img/seller-img.png",
  },
  {
    id: 8,
    image: "/img/product-detail-image.png",
    title: "기본 블랙 컬러 티셔츠",
    category: "티셔츠",
    price: 20000,
    detail: detail,
    seller: "tirrilee",
    sellerImg: "/img/seller-img.png",
  },
];

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    add: (state, { payload: productInfo }: PayloadAction<ProductInfo>) => {
      productInfo.id = state.length + 1
      state.push(productInfo);
    },
    update: (state, { payload: productInfo }: PayloadAction<ProductInfo>) => {
      return state.map(product => product.id === productInfo.id ? productInfo : product)
    }
  },
});

const { actions, reducer: productReducer } = productSlice;

export const { add, update } = actions;

export default productReducer;
