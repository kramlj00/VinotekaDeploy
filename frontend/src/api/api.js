import { axiosInstance } from "../config";

export const getFilterArgs = async (setFilterSort, setFilterCategory) => {
  const { data } = await axiosInstance.get("/all_categories");
  const sortArray = [];
  const categoryArray = [];

  await data.forEach((item) => {
    if (item.sort) sortArray.push(item.sort);
  });

  await data.forEach((item) => {
    if (item.category) categoryArray.push(item.category);
  });

  setFilterSort(sortArray);
  setFilterCategory(categoryArray);
};

export const getPriceRange = async (setPriceRange) => {
  const { data } = await axiosInstance.get("/price_range");
  setPriceRange([data.min, data.max]);
};

export const getCanUserComment = async (setCanUserComment, productId) => {
  const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo) {
    const { data } = await axiosInstance.get(`/review/is_allowed/${productId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    setCanUserComment(data);
  } else setCanUserComment(false);
};


export const getProductsWithExceededQty = async (cartProducts) => {
  const { data } = await axiosInstance.post("/wines/exceeded_qty", cartProducts);
  return data;
};
