import userModel from "../models/userModel.js";

// Add products to cart
async function addToCart(req, res) {
  try {
    const { userId, productId, size } = req.body;

    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// Update cart
async function updateCart(req, res) {
  try {
    const { userId, productId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    cartData[productId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// Get cart
async function getCart(req, res) {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export { addToCart, updateCart, getCart };
