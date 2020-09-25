import React, { useState } from "react";
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

function PizzaInput({ className, input, changeInputFunc }) {
  const changeInputValue = (property) => (e) => {
    const newInput = { ...input };
    newInput[property] = e.target.value;
    changeInputFunc(newInput);
  };

  return (
    <div className={className}>
      <img className="h-40 w-40" src="images/pepperoni.png" alt="Pepperoni pizza" />
      <h2 className="text-center mt-3 text-lg">{input.name}</h2>
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
  let minAreaPrice = inputs[0].price;

  for (let i = 1; i < inputs.length; i++) {
    const { areaPrice } = calcResults(inputs[i]);
    if (areaPrice < minAreaPrice) {
      minName = inputs[i].name;
      minAreaPrice = areaPrice;
    }
  }
  return minName;
}

function App() {
  const [inputs, setInputs] = useState([
    { name: "Pepperoni", diameter: 32, pieces: 2, price: 1500 },
    { name: "Salami ", diameter: 40, pieces: 1, price: 3000 },
  ]);

  const changeInput = (ind) => (input) => {
    const newInputs = [...inputs];
    newInputs[ind] = input;
    setInputs(newInputs);
  };

  const cheaperPizzaName = findCheaperPizza(inputs);

  return (
    <div className="flex flex-col">
      <h1 className={"text-center text-3xl mt-20"}>Which pizza is cheaper?</h1>
      <div className="flex mt-10 justify-center">
        <PizzaInput input={inputs[0]} changeInputFunc={changeInput(0)} />
        <PizzaInput className="ml-24" input={inputs[1]} changeInputFunc={changeInput(1)} />
      </div>
      <hr className="m-auto w-1/2 mt-4" />
      <div className="flex mt-2 justify-center">
        <Results input={inputs[0]} />
        <Results className="ml-24" input={inputs[1]} />
      </div>
      <p className="text-center mt-5 text-lg">
        The <span className="font-bold">{cheaperPizzaName}</span> pizza is cheaper by square area!
      </p>
    </div>
  );
}

export default App;
