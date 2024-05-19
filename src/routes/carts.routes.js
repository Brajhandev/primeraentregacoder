import { Router } from "express";
import { CartManager } from "../CartManager.js";
import { ProductManager } from "../ProductManager.js";

export const cartRouter = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();
// CREA CARRITO
cartRouter.post("/", async (req, res) => {
  const carts = await cartManager.createCart();

  res.json({
    status: true,
    data: carts,
  });
});

// AGREGA PRODUCTO

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  const product = await productManager.getProductById(pid);

  if (product==='el idproduct no se encuentra') {
    return res.json({
      status: true,
      msg: "el id del producto no existe",
    });
  }

  const result = await cartManager.addProduct(cid, pid);

  res.json({
    status: true,
    msg: result,
  });
});

// VER CARRITO
cartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCart(cid);
  res.json({
    status: true,
    msg: cart,
  });
});
