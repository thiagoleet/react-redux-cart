const url = "https://react-http-212ab-default-rtdb.firebaseio.com/cart.json";

export const updateCart = async (cart) => {
  return await fetch(url, {
    method: "PUT",
    body: JSON.stringify(cart),
  });
};

export const getCart = async () => {
  return await fetch(url);
};
