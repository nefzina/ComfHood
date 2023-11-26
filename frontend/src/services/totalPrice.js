export default function totalPrice(array) {
  let totPrice = 0;
  array.forEach((element) => {
    totPrice += element.price * element.quantity;
  });
  return totPrice;
}
