export const getProductsAsObj = (productArr = []) => {
  return productArr.reduce((obj, curr) => {
    obj[curr['sku_code']] = curr;
    return obj;
  }, {});
};
