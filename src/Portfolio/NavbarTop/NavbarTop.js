import changeCase from "change-case";
import React from "react";
import posed from "react-pose";
import { Box, Flex, Heading, Text } from "rebass";
import styled from "styled-components";
import { color, space, width, minHeight } from "styled-system";

// graveyard
// import { Link as BaseLink, Router } from "@reach/router";
// import { navList } from "./navList";

const SidebarBase = posed.nav({
  open: {
    x: "0%",
    // animate child components with 100ms between entries
    staggerChildren: 100
  },
  closed: { x: "-150%" }
});

const NavbarTop = styled(Flex)`
  ${color}
  ${space}
  ${width}
  ${minHeight}
  position: fixed;
  display: block;

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
  // border: 2px dotted black;
  display: inline-block;
  ${space}
  ${width}
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

const NavItemPosed = posed(StyledLi)({
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

// minWHeight="100vh"

export default ({ isOpen, navItems }) => (
  <NavbarTop
    as="navbar"
    id="navbar"
    px={3}
    bg="blue"
    width={1}
    pose={isOpen ? "open" : "closed"}
    alignItems="center"
    flexDirection="row"
  >
    <Box width="50px" />
    <StyledList>
      {navItems.map(({ link, section, text }, index) => (
        <NavItem key={text} my={3} mx={3}>
          <Link
            id={link ? "profile-link" : index}
            className="nav-link"
            href={link}
            target={text === "Portfolio" ? "_blank" : null}
          >
            <Text color="white">{text}</Text>
          </Link>
        </NavItem>
      ))}
    </StyledList>
  </NavbarTop>
);
