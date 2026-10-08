export const products = [
  // Normal Cakes
  {
    id: "vanilla-cake",
    name: "Vanilla Cake",
    category: "cakes",
    image: "/assets/vanilla cake.jpeg",
    baseWeight: "0.5 KG",
    basePrice: 200,
    availableWeights: [0.5, 1, 1.5, 2],
    customizable: false,
    description: "Classic homemade vanilla cake, soft, spongy and freshly baked with love."
  },
  {
    id: "strawberry-cake",
    name: "Strawberry Cake",
    category: "cakes",
    image: "/assets/Strawberry Cake/Strawberry Cake Half-Kg.jpeg",
    baseWeight: "0.5 KG",
    basePrice: 250,
    availableWeights: [0.5, 1, 1.5, 2],
    customizable: false,
    description: "Delicious strawberry cake bursting with fresh strawberry flavor."
  },
  {
    id: "black-currant-cake",
    name: "Black Currant Cake",
    category: "cakes",
    image: "/assets/black currant cake.jpeg",
    baseWeight: "0.5 KG",
    basePrice: 300,
    availableWeights: [0.5, 1, 1.5, 2],
    customizable: false,
    description: "Rich and tangy black currant cake, a delightful treat."
  },
  {
    id: "blueberry-cake",
    name: "Blueberry Cake",
    category: "cakes",
    image: "/assets/Blueberry cake.jpeg",
    baseWeight: "0.5 KG",
    basePrice: 350,
    availableWeights: [0.5, 1, 1.5, 2],
    customizable: false,
    description: "Sweet and tangy blueberry cake layered with fresh cream."
  },
  {
    id: "black-forest-cake",
    name: "Black Forest Cake",
    category: "cakes",
    image: "/assets/black forest.jpeg",
    baseWeight: "0.5 KG",
    basePrice: 350,
    availableWeights: [0.5, 1, 1.5, 2],
    customizable: false,
    description: "Classic black forest with rich chocolate, whipped cream, and cherries."
  },
  {
    id: "white-forest-cake",
    name: "White Forest Cake",
    category: "cakes",
    image: "/assets/White forest.jpeg",
    baseWeight: "0.5 KG",
    basePrice: 450,
    availableWeights: [0.5, 1, 1.5, 2],
    customizable: false,
    description: "Elegant white forest cake with white chocolate shavings."
  },
  {
    id: "rasamalai-cake",
    name: "Rasamalai Cake",
    category: "cakes",
    image: "/assets/Rasamalai cake.jpeg",
    baseWeight: "0.5 KG",
    basePrice: 450,
    availableWeights: [0.5, 1, 1.5, 2],
    customizable: false,
    description: "Fusion dessert combining traditional rasamalai with soft cake layers."
  },
  {
    id: "butterscotch-cake",
    name: "Butterscotch Cake",
    category: "cakes",
    image: "/assets/Butterscotch cake.jpeg",
    baseWeight: "0.5 KG",
    basePrice: 450,
    availableWeights: [0.5, 1, 1.5, 2],
    customizable: false,
    description: "Crunchy and sweet butterscotch cake with praline topping."
  },
  {
    id: "red-velvet-cake",
    name: "Red Velvet Cake",
    category: "cakes",
    image: "/assets/Red-velvet.jpeg",
    baseWeight: "0.5 KG",
    basePrice: 550,
    availableWeights: [0.5, 1, 1.5, 2],
    customizable: false,
    description: "Rich and luxurious red velvet cake with creamy frosting."
  },
  {
    id: "choco-truffle-cake",
    name: "Choco Truffle Cake",
    category: "cakes",
    image: "/assets/black forest.jpeg", // Fallback to black forest if exact choco truffle isn't available
    baseWeight: "0.5 KG",
    basePrice: 550,
    availableWeights: [0.5, 1, 1.5, 2],
    customizable: false,
    description: "Decadent chocolate truffle cake for the ultimate chocolate lover."
  },

  // Customized Cakes
  {
    id: "car-shape-chocolate-cake",
    name: "Car Shape Chocolate Cake",
    category: "customized",
    image: "/assets/Customize/car shape chocolate cake.jpeg",
    priceOnRequest: true,
    customizable: true,
    description: "Special car-shaped chocolate cake perfect for birthdays."
  },
  {
    id: "customized-brownie",
    name: "Customized Brownie",
    category: "customized",
    image: "/assets/Customize/Customized Brounie.jpeg",
    priceOnRequest: true,
    customizable: true,
    description: "Beautifully customized brownie slab for special occasions."
  },
  {
    id: "customized-doll-cake",
    name: "Customized Doll Cake",
    category: "customized",
    image: "/assets/Customize/Customized Doll cake!.jpeg",
    priceOnRequest: true,
    customizable: true,
    description: "Elegant doll cake crafted for a magical celebration."
  },
  {
    id: "lightning-effect-mini-cake",
    name: "Lightning Effect Mini Cake",
    category: "customized",
    image: "/assets/Customize/lightning effect mini cake.jpeg",
    priceOnRequest: true,
    customizable: true,
    description: "Creative mini cake with unique lightning effect decoration."
  },

  // Brownies
  {
    id: "fudgy-brownie",
    name: "Fudgy Brownie",
    category: "brownies",
    image: "/assets/Brownie/Brownie.jpeg",
    baseWeight: "250g / 1/4 KG",
    basePrice: 250,
    availableWeights: [0.25], // Use 0.25 internally for 1/4 KG
    customizable: false,
    description: "Rich, dense, and super fudgy chocolate brownie."
  },
  {
    id: "oreo-brownie",
    name: "Oreo Brownie",
    category: "brownies",
    image: "/assets/Brownie/brownie 2.jpeg",
    baseWeight: "250g / 1/4 KG",
    basePrice: 280,
    availableWeights: [0.25],
    customizable: false,
    description: "Fudgy brownie loaded with crunchy Oreo pieces."
  },
  {
    id: "nutella-brownie",
    name: "Nutella Brownie",
    category: "brownies",
    image: "/assets/Brownie/Brownie.jpeg",
    baseWeight: "250g / 1/4 KG",
    basePrice: 280,
    availableWeights: [0.25],
    customizable: false,
    description: "Delicious brownie swirled with generous amounts of Nutella."
  },
  {
    id: "choco-chip-brownie",
    name: "Choco Chip Brownie",
    category: "brownies",
    image: "/assets/Brownie/brownie 2.jpeg",
    baseWeight: "250g / 1/4 KG",
    basePrice: 280,
    availableWeights: [0.25],
    customizable: false,
    description: "Classic brownie studded with chocolate chips."
  },
  {
    id: "kitkat-brownie",
    name: "KitKat Brownie",
    category: "brownies",
    image: "/assets/Brownie/Brownie.jpeg",
    baseWeight: "250g / 1/4 KG",
    basePrice: 280,
    availableWeights: [0.25],
    customizable: false,
    description: "Fudgy brownie topped with crunchy KitKat bars."
  },
  {
    id: "ragi-brownie",
    name: "Ragi Brownie",
    category: "brownies",
    image: "/assets/Brownie/brownie 2.jpeg",
    baseWeight: "250g / 1/4 KG",
    basePrice: 280,
    availableWeights: [0.25],
    customizable: false,
    description: "Healthy and delicious brownie made with Ragi."
  },
  {
    id: "whole-wheat-brownie",
    name: "Whole Wheat Brownie",
    category: "brownies",
    image: "/assets/Brownie/Brownie.jpeg",
    baseWeight: "250g / 1/4 KG",
    basePrice: 280,
    availableWeights: [0.25],
    customizable: false,
    description: "Wholesome brownie made with 100% whole wheat."
  },
  {
    id: "double-chocolate-brownie",
    name: "Double Chocolate Brownie",
    category: "brownies",
    image: "/assets/Brownie/brownie 2.jpeg",
    baseWeight: "250g / 1/4 KG",
    basePrice: 330,
    availableWeights: [0.25],
    customizable: false,
    description: "Extra rich brownie for extreme chocolate lovers."
  },

  // Treats
  {
    id: "cupcakes",
    name: "Cupcakes (Pack of 4)",
    category: "treats",
    image: "/assets/vanilla cake.jpeg", // Placeholder
    baseWeight: "4 pcs",
    basePrice: 100,
    availableWeights: [1], // Quantity multiplier
    customizable: false,
    description: "Soft and fluffy cupcakes, perfect for a small treat."
  },
  {
    id: "cookies",
    name: "Cookies",
    category: "treats",
    image: "/assets/Brownie/Brownie.jpeg", // Placeholder
    priceOnRequest: true, // "Available - Contact for Details"
    customizable: false,
    description: "Freshly baked homemade cookies. Contact for flavors and pricing."
  }
];
