import React, { useState } from "react";
import { PIZZAS, getNextPizza } from "./pizzas";
import "./main.css";

function InputBox({ className, ...props }) {
  return (
    <input
      className={
        "ml-2 w-16 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right " +
        className
      }
      type="text"
      {...props}
    />
  );
}

function TextInput({ className, inputClassName, value, label, labelClassName, disabled, onChange }) {
  return (
    <div className={className}>
      <label className={"text-gray-700 inline-block font-semibold " + labelClassName}>{label}:</label>
      <InputBox className={inputClassName} value={value} disabled={disabled} onChange={onChange} />
    </div>
  );
}

function PizzaInput({ className, input, changeInputFunc, canRemove, removeFunc }) {
  const changeInputValue = (property) => (e) => {
    const newInput = { ...input };
    newInput[property] = e.target.value;
    changeInputFunc(newInput);
  };

  return (
    <div className={className}>
      <div className="relative">
        <img className="h-40 w-40" src={input.image} alt="Pepperoni pizza" />
        <Button
          className="absolute top-0 left-0"
          color={canRemove ? "red" : "gray"}
          onClick={removeFunc}
          disabled={!canRemove}
          tabIndex="-1"
        >
          -
        </Button>
      </div>
      <input className="mt-2 w-40 text-center border rounded" value={input.name} onChange={changeInputValue("name")} />
      <TextInput
        className="mt-1"
        labelClassName="w-20"
        label="Pieces"
        value={input.pieces}
        onChange={changeInputValue("pieces")}
      />
      <TextInput
        className="mt-1"
        labelClassName="w-20"
        label="Diameter"
        value={input.diameter}
        onChange={changeInputValue("diameter")}
      />
      <TextInput
        className="mt-1"
        labelClassName="w-20"
        label="Price"
        value={input.price}
        onChange={changeInputValue("price")}
      />
    </div>
  );
}

function calcResults(input) {
  const totalArea = (input.diameter / 2) ** 2 * Math.PI * input.pieces;
  const totalPrice = input.pieces * input.price;

  return {
    totalArea: totalArea,
    totalPrice: totalPrice,
    areaPrice: totalPrice / totalArea,
  };
}

function round(num, digits) {
  const divider = 10 ** digits;
  return Math.round(num * divider) / divider;
}

function Results({ className, input }) {
  const results = calcResults(input);

  return (
    <div className={className}>
      <TextInput value={round(results.totalArea, 1)} inputClassName="w-24" label="Total area" disabled />
      <TextInput
        className="mt-1"
        value={round(results.areaPrice, 2)}
        inputClassName="w-24"
        label="Price / area²"
        disabled
      />
      <TextInput
        value={results.totalPrice}
        className="mt-1"
        inputClassName="w-24"
        label="Total prize"
        labelClassName="w-24"
        disabled
      />
    </div>
  );
}

function findCheaperPizza(inputs) {
  let minName = inputs[0].name;
  let { areaPrice: minAreaPrice } = calcResults(inputs[0]);

  for (let i = 1; i < inputs.length; i++) {
    const { areaPrice } = calcResults(inputs[i]);
    if (areaPrice < minAreaPrice) {
      minName = inputs[i].name;
      minAreaPrice = areaPrice;
    }
  }
  return minName;
}

function Button({ className, children, color, ...props }) {
  /* this is needed for Tailwind to find these CSS classes and not purge them:
  bg-red-400 hover:bg-red-700 bg-green-400 hover:bg-green-700 bg-gray-400 hover:bg-gray-700
  */
  const fullColor = ` bg-${color}-400 hover:bg-${color}-700`;

  return (
    <button
      className={"shadow border font-bold py-1 px-3 rounded-full  text-white self-start " + className + fullColor}
      {...props}
    >
      {children}
    </button>
  );
}

function App() {
  const [inputs, setInputs] = useState(PIZZAS.slice(0, 2));

  const changeInput = (idx) => (input) => {
    const newInputs = [...inputs];
    newInputs[idx] = input;
    setInputs(newInputs);
  };

  const removeInput = (idx) => () => {
    const newInputs = [...inputs];
    newInputs.splice(idx, 1);
    setInputs(newInputs);
  };

  const addInput = () => setInputs([...inputs, getNextPizza(inputs)]);

  const pizzaInputs = inputs.map((input, idx) => (
    <PizzaInput
      key={idx}
      className="ml-12 mr-12"
      input={input}
      changeInputFunc={changeInput(idx)}
      canRemove={inputs.length > 1}
      removeFunc={removeInput(idx)}
    />
  ));
  const results = inputs.map((input, idx) => <Results key={idx} className="ml-12 mr-12" input={input} />);
  const cheaperPizzaName = findCheaperPizza(inputs);

  return (
    <div className="flex flex-col">
      <h1 className={"text-center text-3xl mt-20"}>Which pizza is cheaper?</h1>
      <div className="flex mt-10 justify-center">
        {pizzaInputs}
        <Button color="green" onClick={addInput} tabIndex="-1">
          +
        </Button>
      </div>
      <hr className="m-auto w-1/2 mt-4" />
      <div className="flex mt-2 justify-center">{results}</div>
      <p className="text-center mt-5 text-lg">
        The <span className="font-bold">{cheaperPizzaName}</span> pizza is cheaper by square area!
      </p>
    </div>
  );
}

export default App;
