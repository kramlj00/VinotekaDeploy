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
