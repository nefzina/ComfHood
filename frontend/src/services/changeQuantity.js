export default function changeQuantity(array, itemId, operator) {
  const ind = array.findIndex((element) => element.id === itemId);

  if (operator === "add") {
    array.splice(ind, 1, { id: itemId, quantity: array[ind].quantity + 1 });
  } else {
    if (array[ind].quantity - 1) {
      array.splice(ind, 1, {
        id: itemId,
        quantity: array[ind].quantity - 1,
      });
    } else {
      array.splice(ind, 1);
    }
  }
  return array;
}
