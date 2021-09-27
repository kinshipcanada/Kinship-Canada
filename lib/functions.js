// returns the full cart as a JSON object
export function getCart(cart) {
    if (cart) {
      return cart;
    } else {
        return [];
    }
}

// gets the number of items in the cart
export function numItems(cart) {
    if (cart) {
        let number_of_items = 0;
        for (let i = 0; i < cart.length; cart++) {
            number_of_items += 1
        }
        return number_of_items;
    } else {
        return 0;
    }
}