console.log("Commit 2: Script loaded successfully");
// -------------------------------------------------------------
// Part 1: Base Class - ProductProperties
// -------------------------------------------------------------

class ProductProperties {
    // Constructor initializes product name, price, and quantity
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    // Returns total value of product in stock
    getTotalValue() {
        return this.price * this.quantity;
    }

    // String representation of the product
    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}`;
    }

    // -------------------------------------------------------------
    // Part 3: Static Method - Apply Discount
    // -------------------------------------------------------------
    static applyDiscount(products, discount) {
        products.forEach(product => {
            product.price = product.price - (product.price * discount);
        });
    }
}

// -------------------------------------------------------------
// Part 2: Subclass - PerishableProductProperties
// -------------------------------------------------------------

class PerishableProductProperties extends ProductProperties {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity); // inherit base properties
        this.expirationDate = expirationDate;
    }

    // Override toString to include expiration date
    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}, Expiration Date: ${this.expirationDate}`;
    }
}

// Create at least two perishable product instances
const milk = new PerishableProductProperties("Milk", 1.50, 10, "2024-12-31");
const yogurt = new PerishableProductProperties("Yogurt", 2.00, 15, "2024-11-15");

// -------------------------------------------------------------
// Part 4: Store Class
// -------------------------------------------------------------

class Store {
    constructor() {
        this.inventory = []; // array of products
    }

    // Add product to inventory
    addProduct(product) {
        this.inventory.push(product);
    }

    // Calculate total inventory value
    getInventoryValue() {
        return this.inventory.reduce((total, product) => {
            return total + product.getTotalValue();
        }, 0);
    }

    // Find product by name
    findProductByName(name) {
        return this.inventory.find(product => product.name.toLowerCase() === name.toLowerCase()) || null;
    }
}

// -------------------------------------------------------------
// Part 5: Testing the System
// -------------------------------------------------------------

// Create store
const myStore = new Store();

// Create products
const apple = new ProductProperties("Apple", 2.50, 50);
const bread = new ProductProperties("Bread", 3.00, 20);
const rice = new ProductProperties("Rice", 10.00, 5);

// Add products to store
myStore.addProduct(apple);
myStore.addProduct(bread);
myStore.addProduct(rice);
myStore.addProduct(milk);
myStore.addProduct(yogurt);

// Print inventory value BEFORE discount
console.log("Total Inventory Value (Before Discount): $", myStore.getInventoryValue().toFixed(2));

// Apply 15% discount
ProductProperties.applyDiscount(myStore.inventory, 0.15);

// Print inventory value AFTER discount
console.log("Total Inventory Value (After 15% Discount): $", myStore.getInventoryValue().toFixed(2));

// Find a specific product
const searchName = "Milk";
const foundProduct = myStore.findProductByName(searchName);

console.log(foundProduct 
    ? `Found Product → ${foundProduct.toString()}` 
    : `Product "${searchName}" not found.`);
