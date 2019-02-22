import React, { Component } from "react";
import { Box as BoxBase, Button, Flex, Text } from "rebass";

import { Link as BaseLink } from "@reach/router";
import styled from "styled-components";
import {
  color,
  space,
  width,
  minHeight,
  minWidth,
  borders
} from "styled-system";

const StickyBox = styled(Flex)`
  position: fixed;
  display: block;
  ${minHeight}
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavUl = styled.ul`
  list-style-type: none;
`;

const NavItem = styled.li`
  display: inline-block;
  ${space}
`;

export const navList = [
  { url: "/", name: "Home" },
  { url: "markdown", name: "Markdown Previewer" },
  { url: "drummachine", name: "Drum machine" },
  { url: "pomodoro", name: "Pomodoro" },
  { url: "heatmap", name: "Heatmap" },
  { url: "treemap", name: "Treemap" },
  { url: "surveyform", name: "Survey Form" },
  { url: "productlandingpage", name: "Product Landing Page" },
  { url: "technicaldocumentation", name: "Technical Documentation Page" }
];

export const Header = () => (
  <StickyBox
    flexDirection="row"
    as="header"
    minHeight="40px"
    width={1}
    bg="blue"
    id="header"
  >
    <BoxBase as="nav" id="nav-bar">
      <NavUl>
        <img alt="logo" id="header-img" src="../logo.svg" />
        {navList.map(linkString => (
          <NavItem mx="4px" key={Math.random()}>
            <a className="nav-link" href={linkString.url}>
              <Text color="white">{linkString.name}</Text>
            </a>
          </NavItem>
        ))}
      </NavUl>
    </BoxBase>
  </StickyBox>
);
