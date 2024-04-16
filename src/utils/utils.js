export const getProductsAsObj = (productArr = []) => {
  return productArr.reduce((obj, curr) => {
    obj[curr['gtin']] = curr;
    return obj;
  }, {});
};
