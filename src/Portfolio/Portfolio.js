import React, { Component } from "react";
import ReactFCCtest from "react-fcctest";

import { Card, Flex as BaseFlex, Heading } from "rebass";
import styled from "styled-components";
import { borders, minHeight } from "styled-system";

import NavbarTop from "./NavbarTop";
// import { ReactComponent } from "*.svg";

const Flex = styled(BaseFlex)`
  ${minHeight}
  ${borders}
`;

const isOpen = true;

export class Portfolio extends Component {
  state = {
    isOpen: isOpen
  };
  render() {
    return (
      <Flex flexDirection="column" minHeight="100vh">
        <NavbarTop navItems={navItems} />
        <Flex
          as="section"
          id="welcome-propper-section"
          minHeight="100vh"
          height="70vh"
          flexDirection="column"
          // border="4px dashed crimson"
          width={1}
          mt="50px"
        >
          <Flex
            as="section"
            id="blerg"
            height="20vh"
            flexDirection="column"
            // border="1px dashed crimson"
            width={1}
          >
            <Flex
              as="section"
              id="welcome-section"
              height="100vh"
              minHeight="866px"
              flexDirection="column"
              // border="1px dashed crimson"
              alignItems="center"
              justifyContent="center"
              width={1}
            >
              <Heading as="h1">Welcome Section</Heading>
            </Flex>
            <Flex
              as="section"
              px={7}
              id="projects"
              flexDirection="row"
              justifyContent="center"
              width={1}
              border="5px goldenrod dashed"
            >
              {sections.map(project => (
                <Card
                  width={1 / 4}
                  mx={2}
                  className="project-tile"
                  border="2px green dashed"
                >
                  <Heading as="h2" fontSize="1.5em">
                    {project.header}
                  </Heading>
                  <a href={project.projectLink}>{project.subject}</a>
                </Card>
              ))}
            </Flex>

            <Flex
              as="section"
              px={7}
              id="about"
              flexDirection="row"
              justifyContent="center"
              width={1}
              border="5px goldenrod dashed"
            >
              whammy
            </Flex>
            <ReactFCCtest />
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

const navItems = [
  {
    text: "Portfolio",
    link: "https://github.com/theednaffattack",
    section: false
  },
  {
    text: "About",
    link: "#about",
    section: true
  }
];

const sections = [
  {
    id: null,
    subject: "Portfolio",
    description: "lovable dogs and their generally adorable nature",
    header: "Profile",
    text: "Dogs",
    list: ["one", "two", "three", "four", "five"],
    link: "https://github.com/theednaffattack"
  },
  {
    id: null,
    subject: "Build A Product Landing Page",
    description: "Build A Product Landing Page",
    header: "Dogs",
    text: "Dogs",
    list: ["one", "two", "three", "four", "five"],
    projectLink: "https://thawing-ridge-86455.herokuapp.com/productlandingpage"
  },
  {
    id: null,
    subject: "Cats and stuff",
    description: "lovable cats and their generally adorable nature",
    header: "Cats",
    text: "Cats",
    sectionLink: "whammy"
  },
  {
    id: null,
    subject: "Chinchillas",
    description: "lovable cats and their generally adorable nature",
    header: "Cats",
    text: "Cats",
    list: ["one", "two", "three", "four", "five"]
  },
  {
    id: null,
    subject: "Rabbits",
    description: "lovable cats and their generally adorable nature",
    header: "Cats",
    text: "Cats"
  },
  {
    id: null,
    subject: "Parrots",
    description: "lovable cats and their generally adorable nature",
    header: "Cats",
    text: "Cats"
  }
];
