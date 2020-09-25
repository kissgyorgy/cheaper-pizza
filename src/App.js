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

function TextInput({ className, inputClassName, value, label, labelClassName, disabled }) {
  return (
    <div className={className}>
      <label className={"text-gray-700 inline-block font-bold mb-2 " + labelClassName}>{label}:</label>
      <InputBox className={inputClassName} value={value} disabled={disabled} />
    </div>
  );
}

function PizzaTextInput(props) {
  return <TextInput className="mt-2" labelClassName="w-20" {...props} />;
}

function PizzaInput({ className, input }) {
  return (
    <div className={className}>
      <img className="h-40 w-40" src="images/pepperoni.png" alt="Pepperoni pizza" />
      <h2 className="text-center mt-3 text-lg">{input.name}</h2>
      <PizzaTextInput value={input.pieces} label="Pieces" />
      <PizzaTextInput value={input.diameter} label="Diameter" />
      <PizzaTextInput value={input.price} label="Price" />
    </div>
  );
}

function Results({ className, input }) {
  let areaSquarePrice = (input.diameter / 2) ** 2 * Math.PI * input.pieces;
  areaSquarePrice = Math.round(areaSquarePrice * 10) / 10;
  const totalPrice = input.pieces * input.price;

  return (
    <div className={className}>
      <TextInput value={areaSquarePrice} inputClassName="w-24" label="Price / area²" disabled />
      <TextInput
        value={totalPrice}
        className="mt-2"
        inputClassName="w-24"
        label="Total prize"
        labelClassName="w-24"
        disabled
      />
    </div>
  );
}

function App() {
  const [inputs, setInputs] = useState([
    { name: "Pepperoni", diameter: 32, pieces: 2, price: 1500 },
    { name: "Salami ", diameter: 40, pieces: 1, price: 3000 },
  ]);

  return (
    <div className="flex flex-col">
      <h1 className={"text-center text-3xl mt-20"}>Which pizza is cheaper?</h1>
      <div className="flex mt-10 justify-center">
        <PizzaInput input={inputs[0]} />
        <PizzaInput className="ml-24" input={inputs[1]} />
      </div>
      <hr className="m-auto w-1/2 mt-4" />
      <div className="flex mt-2 justify-center">
        <Results input={inputs[0]} />
        <Results className="ml-24" input={inputs[1]} />
      </div>
      <p className="text-center mt-5 font-bold">The Pepperoni pizza is cheaper!</p>
    </div>
  );
}

export default App;
