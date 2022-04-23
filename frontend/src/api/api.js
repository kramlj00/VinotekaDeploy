import Axios from "axios";

export const getFilterArgs = async (setFilterSort, setFilterCategory) => {
  const { data } = await Axios.get("/all_categories");
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
  const { data } = await Axios.get("/price_range");
  setPriceRange([data.min, data.max]);
};

export const getCanUserComment = async (setCanUserComment, productId) => {
  const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
  const { data } = await Axios.get(`/can_user_comment/${productId}`, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  });
  console.log("idvhshdbdibu", data);
  setCanUserComment(data);
};
