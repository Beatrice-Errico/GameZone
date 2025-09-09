import React from 'react';
import styled from 'styled-components';

const Buttons4 = ({ children, onClick, type = 'button', ...props }) => {
  return (
    <StyledButton type={type} onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  padding: 17px 40px;
  border-radius: 50px;
  cursor: pointer;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(247, 37, 133);
  font-family: sans-serif;
  font-weight: bold;



  background-color: trasparent;
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #F72585;
  font-size: 15px;
  transition: all 0.5s ease;

  &:hover {
    letter-spacing: 3px;
    background-color: hsl(333, 93%, 56%);
    color: hsl(0, 0%, 100%);
    // box-shadow: rgb(247, 37, 133) 0px 7px 29px 0px;
  }

  &:active {
    letter-spacing: 3px;
    background-color: hsl(261deg 80% 48%);
    color: hsl(0, 0%, 100%);
    box-shadow: rgb(93 24 220) 0px 0px 0px 0px;
    transform: translateY(10px);
    transition: 100ms;
  }
`;

export default Buttons4;
