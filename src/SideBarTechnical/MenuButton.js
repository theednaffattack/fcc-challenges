import React from "react";
import { Button as ButtonBase } from "rebass";

export const Button = ({ handleClick }) => (
  <ButtonBase ml="auto" height="55px" onClick={handleClick} width="100px">
    menu
  </ButtonBase>
);
