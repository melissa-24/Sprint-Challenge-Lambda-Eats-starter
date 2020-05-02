import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";

const formSchema = yup.object().shape({
  size: yup.string().required("please choose a size"),
  sauce: yup.string().required("please choose a sauce"),
  pepperoni: yup.string().notRequired("please choose one"),
  sausage: yup.string().notRequired("please choose one"),
  mushrooms: yup.string().notRequired("please choose one"),
  peppers: yup.string().notRequired("please choose one"),
  onions: yup.string().notRequired("please choose one"),
  pineapple: yup.string().notRequired("please choose one"),
  bacon: yup.string().notRequired("please choose one"),
  extraCheese: yup.string().notRequired("please choose one"),
  hotPeppers: yup.string().notRequired("please choose one"),
  anchovies: yup.string().notRequired("please choose one"),
  specialInstructions: yup.string("anything we should know?"),
});

const PizzaForm = (props) => {
  const [formState, setFormState] = useState({
    size: "",
    sauce: "",
    pepperoni: "",
    sausage: "",
    mushrooms: "",
    peppers: "",
    onions: "",
    pineapple: "",
    bacon: "",
    extraCheese: "",
    hotPeppers: "",
    anchovies: "",
    specialInstructions: "",
  });

  const [errors, setErrors] = useState({
    size: "",
    sauce: "",
    pepperoni: "",
    sausage: "",
    mushrooms: "",
    peppers: "",
    onions: "",
    pineapple: "",
    bacon: "",
    extraCheese: "",
    hotPeppers: "",
    anchovies: "",
    specialInstructions: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const validateChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [event.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0],
        });
      });
  };

  const [order, setOrder] = useState([]);

  const formSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then((response) => {
        setOrder(response.data);

        setFormState({
          name: "",
          size: "",
          sauce: "",
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const inputChange = (event) => {
    event.persist();
    const newFormData = {
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    };
    validateChange(event);
    setFormState(newFormData);
  };

  const FormHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3%;
    color: #3d040b;
  `;

  return (
    <>
      <FormHeader>
        <h2>Order Form</h2>
        <div className="home-button">
          <Link to="/">
            <button>Home</button>
          </Link>{" "}
        </div>
      </FormHeader>

      <form onSubmit={formSubmit} className="form-container">
        <label htmlFor="size">
          Choice of size Required
          <select id="size" name="size" onChange={inputChange}>
            <option value="">--Please choose an option--</option>
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
          </select>
        </label>

        <label htmlFor="sauce">
          Choice of sauce Required
          <select id="sauce" name="sauce" onChange={inputChange}>
            <option value="">--Please choose an option--</option>
            <option value="Original">Original</option>
            <option value="Garlic Ranch">Garlic Ranch</option>
            <option value="BBQ Sauce">BBQ Sauce</option>
            <option value="Spinach Alfredo">Spinach Alfredo</option>
          </select>
        </label>

        <label htmlFor="toppings-header">Choose up to 6 toppings</label>
        <label htmlFor="pepperoni" className="toppings">
          Peppperoni
          <input
            type="checkbox"
            name="pepperoni"
            checked={formState.pepperoni}
            onChange={inputChange}
          />
        </label>
        <label htmlFor="sausage" className="toppings">
          Sausage
          <input
            type="checkbox"
            name="sausage"
            checked={formState.sausage}
            onChange={inputChange}
          />
        </label>
        <label htmlFor="mushrooms" className="toppings">
          Mushrooms
          <input
            type="checkbox"
            name="mushrooms"
            checked={formState.mushrooms}
            onChange={inputChange}
          />
        </label>
        <label htmlFor="peppers" className="toppings">
          Peppers
          <input
            type="checkbox"
            name="peppers"
            checked={formState.peppers}
            onChange={inputChange}
          />
        </label>
        <label htmlFor="onions" className="toppings">
          Onions
          <input
            type="checkbox"
            name="onions"
            checked={formState.onions}
            onChange={inputChange}
          />
        </label>
        <label htmlFor="pineapple" className="toppings">
          Pineapple
          <input
            type="checkbox"
            name="pineapple"
            checked={formState.pineapple}
            onChange={inputChange}
          />
        </label>
        <label htmlFor="bacon" className="toppings">
          Bacon
          <input
            type="checkbox"
            name="bacon"
            checked={formState.bacon}
            onChange={inputChange}
          />
        </label>
        <label htmlFor="extraCheese" className="toppings">
          Extra Cheese
          <input
            type="checkbox"
            name="extraCheese"
            checked={formState.extraCheese}
            onChange={inputChange}
          />
        </label>
        <label htmlFor="hotPeppers" className="toppings">
          Hot Peppers
          <input
            type="checkbox"
            name="hotPeppers"
            checked={formState.hotPeppers}
            onChange={inputChange}
          />
        </label>
        <label htmlFor="anchovies" className="toppings">
          Anchovies
          <input
            type="checkbox"
            name="anchovies"
            checked={formState.anchovies}
            onChange={inputChange}
          />
        </label>
        <label htmlFor="special-instructions">
          Special instructions
          <textarea
            name="specialInstructions"
            onChange={inputChange}
            value={formState.specialInstructions}
            data-cy="special-instructions"
          />
        </label>
        <button
          disabled={buttonDisabled}
          type="submit"
          data-cy="submit-order-button"
        >
          Add to order
        </button>
        <br />
        <br />
      </form>
      <pre>
        <h3>Order Summary:</h3>

        <br />
        {JSON.stringify(order, null, 2)}
        <p>Congrats! Pizza is on it's way</p>
        <p>An order confirmation was emailed to you</p>
      </pre>
      <br />
      <br />
      <Link to="/pizza-tracker">
        <button
          disabled={formSubmit}
          type="submit"
          data-cy="track-order-button"
        >
          Track your order
        </button>
      </Link>
    </>
  );
};
export default PizzaForm;