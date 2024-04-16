export const getProductsAsObj = (productArr = []) => {
  return productArr.reduce((obj, curr) => {
    obj[curr['gtin']] = Object.assign({}, curr);
    return obj;
  }, {});
};

export const getImageSource = index => {
  let imageSource;
  switch (index + 1) {
    case 1:
      imageSource = require('../assets/1.png');
      break;
    case 2:
      imageSource = require('../assets/2.png');
      break;
    case 3:
      imageSource = require('../assets/3.png');
      break;
    case 4:
      imageSource = require('../assets/4.png');
      break;
    case 5:
      imageSource = require('../assets/5.png');
      break;
    case 6:
      imageSource = require('../assets/6.png');
      break;
    case 7:
      imageSource = require('../assets/7.png');
      break;
    case 8:
      imageSource = require('../assets/8.png');
      break;
    case 9:
      imageSource = require('../assets/9.png');
      break;
    case 10:
      imageSource = require('../assets/10.png');
      break;
    // Add more cases for other indices as needed
    default:
      // Default image or handle error
      imageSource = require('../assets/1.png');
  }
  return imageSource;
};
