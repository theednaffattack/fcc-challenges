import React, { Component } from "react";
import ReactFCCtest from "react-fcctest";
import { Box as BoxBase, Button, Flex, Text } from "rebass";
import IconBase from "react-geomicons";
import styled from "styled-components";
import { minHeight, space } from "styled-system";

import logo from "../logo.svg";
import { Video } from "./Video";

const url = "https://www.youtube.com/embed/GNCd_ERZvZM";
const title = "Thundercat Video";

const StickyBox = styled(Flex)`
  position: fixed;
  display: block;
  ${minHeight}
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Icon = styled(IconBase)`
  ${space}
`;

const NavUl = styled.ul`
  list-style-type: none;
`;

const NavItem = styled.li`
  display: inline-block;
  ${space}
`;

export class ProductLandingPage extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      errors: { name: false, email: false },
      name: "",
      email: "",
      number: "",
      value: "",
      label: "",
      optionValue: { label: "", value: "valorum" },
      mood: null
    };
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name || target.id;
    const label = target.label;
    this.setState({
      [name]: value,
      [label]: label
    });
  }

  render() {
    return (
      <Flex flexDirection="column" width={1}>
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
              {["link-1", "link-2", "link-3", "link-4"].map(linkString => (
                <NavItem mx="4px" key={Math.random()}>
                  <a className="nav-link" href={"#" + linkString}>
                    {linkString}
                  </a>
                </NavItem>
              ))}
            </NavUl>
          </BoxBase>
        </StickyBox>
        <BoxBase mt="50px">
          <Video id="video" url={url} title={title} />
          <Video id="video" url={url} title={title} />
          <Video id="video" url={url} title={title} />
          <Video id="video" url={url} title={title} />
          <Video id="video" url={url} title={title} />
          <Video id="video" url={url} title={title} />
          {["link-1", "link-2", "link-3", "link-4"].map(sectionItem => (
            <section id={sectionItem}>
              <Text>{sectionItem}</Text>
              <Text>sample</Text>
            </section>
          ))}

          <form
            id="form"
            action="https://www.freecodecamp.com/email-submit"
            method="post"
          >
            <Flex flexDirection="column">
              <label id="email-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter a valid email address"
                value={this.state.email}
                onChange={this.handleInputChange}
                required={true}
              />
              <input id="submit" type="submit" value="submit" />
            </Flex>
          </form>
        </BoxBase>

        <ReactFCCtest />
      </Flex>
    );
  }
}
