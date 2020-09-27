import mixedPizzaImg from "./images/mixed.png";
import olivePizzaImg from "./images/olive-salad.png";
import pepperoniPizzaImg from "./images/pepperoni.png";
import veggiesPizzaImg from "./images/veggies.png";

const PIZZAS = [
  { name: "Mixed", image: mixedPizzaImg, diameter: 23, price: 1500, pieces: 3 },
  { name: "Veggies", image: veggiesPizzaImg, diameter: 32, price: 1800, pieces: 2 },
  { name: "Olives", image: olivePizzaImg, diameter: 45, price: 4000, pieces: 1 },
  { name: "Pepperoni", image: pepperoniPizzaImg, diameter: 50, price: 6000, pieces: 1 },
];

function getNextPizza(inputs) {
  let next = PIZZAS[inputs.length];
  if (next === undefined) {
    next = inputs[inputs.length - 1];
  }
  return next;
}

export { PIZZAS, getNextPizza };
