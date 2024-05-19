import fs from "fs/promises";
import { Product } from "./entity/Product.js";
export class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./src/db/products.json";
  }

  async readFile() {
    const json = await fs.readFile(this.path, "utf8");
    return json;
  }

  async getProducts() {
    const json = await this.readFile();
    this.products = JSON.parse(json);
    return this.products;
  }

  async addProduct(newproducts) {
    this.products = JSON.parse(await this.readFile());
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status = true,
      category,
    } = newproducts;

    if (
      title === "" ||
      description === "" ||
      price === "" ||
      code === "" ||
      stock === "" ||
      category === ""
    ) {
      return "no se aceptan valores nulos";
    }

    const codeRepeat = this.products.find((product) => product.code === code);
    if (codeRepeat?.code) {
      return "el codigo del producto ya existe";
    }

    const product = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    );

    this.products.push({
      id: this.products.length + 1,
      ...product,
    });
    const newProduct = JSON.stringify(this.products);
    await fs.writeFile(this.path, newProduct);

    return `producto ${title} ingresado correctamente`;
  }

  async getProductById(id) {
    const json = await this.readFile();
    this.products = JSON.parse(json);

    const product = this.products.find((product) => product.id === Number(id));
    if (!product) {
      return `el idproduct no se encuentra`;
    }
    return product;
  }

  async updateProduct(id, product) {
    const { title, description, price, thumbnail, code, stock, category } =
      product;
    const json = await this.readFile();
    this.products = JSON.parse(json);

    const index = this.products.findIndex(
      (producto) => producto.id === Number(id)
    );

    if (index < 0) {
      return "producto no existe";
    }

    const productUpdate = {
      id: this.products[index].id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    };
    this.products[index] = productUpdate;
    const newProduct = JSON.stringify(this.products);
    await fs.writeFile(this.path, newProduct);
    return "producto actualizado con exito";
  }

  async deleteProduct(id) {
    const json = await this.readFile();
    this.products = JSON.parse(json);

    const index = this.products.findIndex(
      (producto) => producto.id === Number(id)
    );
      console.log(index);
    if (index === -1) {
      return `el producto de id ${id} no se encuentra`;
    }

    this.products.splice(index, 1);
    const newProduct = JSON.stringify(this.products);
    await fs.writeFile(this.path, newProduct);
    return "Producto eliminado exitosamente";
  }
}
