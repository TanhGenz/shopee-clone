import axios from "axios";

export const getProduct = () => {
  return axios({
    url: "https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products",
    method: "GET",
  });
};

export const deleteProduct = (id) => {
  return axios({
    url: `https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products/${id}`,
    method: "DELETE",
  });
};
export const AddProductApi = (product) => {
  return axios({
    url: "https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products",
    method: "POST",
    data: product,
  });
};
export const getProductApi = function (product) {
  return axios({
    url: `https://657eac8e3e3f5b189463f4b4.mockapi.io/api/products/products/${product.id}`,
    method: "PUT",
    data: product,
  });
};
