import React from "react";
import styled from "@emotion/styled";

const CustomButton = styled.button`
  margin-top: auto;
  padding: 0.8rem 0.5rem;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.lightGreen};
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGreen};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default function Button({ handleClick, children }) {
  return (
    <CustomButton data-testid="custom-button" onClick={() => handleClick()}>
      {children}
    </CustomButton>
  );
}
