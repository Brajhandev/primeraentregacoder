 import fs from 'fs/promises'
import { Cart } from './entity/Cart.js'

 export class CartManager {
    constructor () {
        this.path = './src/db/carts.json'
        this.carts = []
    }

    async createCart () {
        // LEER EL JSON
        const json = await fs.readFile(this.path, 'utf-8')
        this.carts = JSON.parse(json)

        const newCart = new Cart()
        this.carts.push(newCart)

        // ESCRIBIR
        await fs.writeFile(this.path,JSON.stringify(this.carts))

        return newCart
    }


    async addProduct (idcart, idproduct) {
        // LEER EL JSON
        const json = await fs.readFile(this.path, 'utf-8')
        this.carts = JSON.parse(json)

        const result = this.carts.findIndex(cart => cart.id === idcart)
        if (result === -1) {
            return 'el carrito no existe'
        }

        const productoRepetido = this.carts[result].products.findIndex(product => product.idproduct === idproduct)

        

        if (productoRepetido === -1) {

            this.carts[result].products.push({
                idproduct: idproduct,
                quatity: 1
            })

        }
        else {
            this.carts[result].products[productoRepetido].quatity++
        }

         // ESCRIBIR
         await fs.writeFile(this.path,JSON.stringify(this.carts))

        return 'el producto se agrego al carrito correctamente'
    }

    async getCart (idcarrito) {
        const json = await fs.readFile(this.path, 'utf-8')
        this.carts = JSON.parse(json) 

        const result = this.carts.find(cart => cart.id === idcarrito)
        if (result === undefined) {
            return 'el carrito no existe'
            }
        
            return result
    }
 }