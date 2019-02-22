import changeCase from "change-case";
import React from "react";
import posed from "react-pose";
import { Box, Flex, Heading, Text } from "rebass";
import { Link as BaseLink, Router } from "@reach/router";
import styled from "styled-components";
import { color, space, width, minWidth } from "styled-system";

import { navList } from "./navList";

const SidebarBase = posed.nav({
  open: {
    x: "0%",
    // animate child components with 100ms between entries
    staggerChildren: 100
  },
  closed: { x: "-150%" }
});

const SidebarTechnical = styled(SidebarBase)`
  ${color}
  ${space}
  ${width}
  ${minWidth}

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledList = styled.ul`
  ${space}
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StyledLi = styled.li`
  border: 2px dotted black;
`;

const Link = styled.a`
  ${space}
  ${width}
  text-decoration: none !important;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: goldenrod;
    transition: width 0.3s;
  }
  &:hover::after {
    width: 100%;
    //transition: width .3s;
  }
`;

const NavItemPosed = posed.li({
  open: { opacity: 1 },
  closed: { opacity: 0 }
});

const NavItem = styled(NavItemPosed)`
  ${space}
  ${width}
`;

// const Nav = ({ isOpen, navItems }) => (
//   <Sidebar pose={isOpen ? "open" : "closed"}>
//     <StyledList>
//       {navItems.map(({ url, name }) => (
//         <NavItem key={name}>
//           <a href={url}>{name}</a>
//         </NavItem>
//       ))}
//     </StyledList>
//   </Sidebar>
// );

export default ({ isOpen, navItems }) => (
  <SidebarTechnical
    as="nav"
    id="navbar"
    minWidth="170px"
    px={3}
    bg="blue"
    pose={isOpen ? "open" : "closed"}
  >
    <Heading as="header">Dogs and Cats</Heading>
    <StyledList pt="40px">
      {navItems.map(({ id, subject, description, header, text }) => (
        <NavItem key={header} my={3}>
          <Link className="nav-link" href={"#" + changeCase.snakeCase(subject)}>
            <Text color="white">{subject}</Text>
          </Link>
        </NavItem>
      ))}
    </StyledList>
  </SidebarTechnical>
);
