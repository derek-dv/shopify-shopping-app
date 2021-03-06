const bycrypt = require("bcrypt");
const data = {
  users: [
    {
      name: "admin",
      email: "admin@shopify.com",
      password: bycrypt.hashSync("admin", 8),
      isAdmin: true,
    },
    {
      name: "derek",
      email: "derek@shopify.com",
      password: bycrypt.hashSync("derek", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Nike Slim Shirts",
      category: "shirts",
      image: "/images/p1.jpg",
      price: 120,
      countInStock: 6,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "Hig quality shirts",
    },
    {
      name: "Nike Shirts",
      category: "shirts",
      image: "/images/p2.jpg",
      price: 70,
      countInStock: 15,
      brand: "Nike",
      rating: 4.0,
      numReviews: 9,
      description: "Hig quality shirts",
    },
    {
      name: "Nike Slim Shirts",
      category: "shirts",
      image: "/images/p3.jpg",
      price: 80,
      countInStock: 30,
      brand: "Nike",
      rating: 3.5,
      numReviews: 15,
      description: "Hig quality shirts",
    },
    {
      name: "Nike Slim Shirts",
      category: "shirts",
      image: "/images/p4.jpg",
      price: 35,
      countInStock: 10,
      brand: "Nike",
      rating: 4.2,
      numReviews: 11,
      description: "Hig quality shirts",
    },
    {
      name: "Nike Slim Shirts",
      category: "shirts",
      image: "/images/p5.jpg",
      price: 90,
      countInStock: 0,
      brand: "Nike",
      rating: 4.5,
      numReviews: 50,
      description: "Hig quality shirts",
    },
  ],
};

module.exports.data = data;
