/**
 * 生成随机订单号
 * @returns
 */
function generateOrderNumber() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  // const randomNumber = Math.floor(Math.random() * 10000)
  //     .toString()
  //     .padStart(4, '0');
  return year + month + day;
}

module.exports = {
  generateOrderNumber
}