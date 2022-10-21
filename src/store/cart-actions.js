import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
import { updateCart, getCart, NotificationService } from "../services";

// Using action creators
export const sendCartData = (cartData) => {
  return async (dispatch) => {
    const notification = new NotificationService(
      dispatch,
      uiActions.showNotification
    );

    notification.showPending("Sending...", "Sending cart data");

    try {
      const { items, totalQuantity } = cartData;
      await updateCart({ items, totalQuantity });
      notification.showSuccess("Success!", "Sent cart data successfully!");
    } catch (error) {
      notification.showError("Error!", "Sending cart data failed!");
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const notification = new NotificationService(
      dispatch,
      uiActions.showNotification
    );

    try {
      const response = await getCart();
      const cartData = await response.json();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      notification.showError("Error!", "Could not fetch cart data!");
    }
  };
};
