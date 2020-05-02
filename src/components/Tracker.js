import React from "react";
import dog from "../images/pizza-dog.gif";
import styled from "styled-components";

const TrackerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Tracker = () => {
  return (
    <>
      <TrackerContainer>
        <h2>Your pizza is on the way....unless this doggo got to it first!!</h2>
        <img alt="delicious-pizza" className="pizza-hero" src={dog} />
      </TrackerContainer>
    </>
  );
};
export default Tracker;