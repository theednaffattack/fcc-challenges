import changeCase from "change-case";
import React, { Component } from "react";
import { Box, Button, Flex, Heading, Text } from "rebass";
import ReactFCCtest from "react-fcctest";
import styled from "styled-components";
import { color, space, width, minWidth, borders } from "styled-system";

import { Header } from "../Header";
import SideBarTechnical from "../SideBarTechnical";

const Ul = styled.ul`
  list-style-type: none;
`;

const sections = [
  {
    id: null,
    subject: "Dogs and stuff",
    description: "lovable dogs and their generally adorable nature",
    header: "Dogs",
    text: "Dogs",
    list: ["one", "two", "three", "four", "five"]
  },
  {
    id: null,
    subject: "Cats and stuff",
    description: "lovable cats and their generally adorable nature",
    header: "Cats",
    text: "Cats"
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

export class TechnicalDocumentation extends Component {
  state = {
    isOpen: true
  };
  render() {
    return (
      <Flex flexDirection="row" width={1}>
        {/* <Header /> */}
        <SideBarTechnical isOpen={this.state.isOpen} navItems={sections} />
        <Flex flexDirection="column" as="main" id="main-doc" mt="50px">
          {sections.map((section, i) => (
            <Box
              as="section"
              className="main-section"
              id={changeCase.snakeCase(section.subject)}
            >
              <Heading as="header">{section.subject}</Heading>
              <Text as="p">{section.description}</Text>
              <code />
              <Text as="p">{section.description}</Text>
              <Ul>
                {section.list
                  ? section.list.map(listItem => <li>{listItem}</li>)
                  : ""}
              </Ul>
            </Box>
          ))}
        </Flex>

        <ReactFCCtest />
      </Flex>
    );
  }
}
