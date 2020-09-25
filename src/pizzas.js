const PIZZAS = [
  { name: "Mixed", image: "images/mixed.png", diameter: 23, price: 1500, pieces: 3 },
  { name: "Veggies", image: "images/veggies.png", diameter: 32, price: 1800, pieces: 2 },
  { name: "Olives", image: "images/olive-salad.png", diameter: 45, price: 4000, pieces: 1 },
  { name: "Pepperoni", image: "images/pepperoni.png", diameter: 50, price: 6000, pieces: 1 },
];

function getNextPizza(inputs) {
  let next = PIZZAS[inputs.length];
  if (next === undefined) {
    next = inputs[inputs.length - 1];
  }
  return next;
}

export { PIZZAS, getNextPizza };
