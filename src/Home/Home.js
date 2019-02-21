import React, { Component } from "react";
import styled from "styled-components";
import camelCase from "camelcase";

import { projects } from "./projects_data";

const StyledList = styled.ul`
  list-style: none;
`;

const StyledLi = styled.li`
  border: 2px dotted black;
`;

const ProjectList = () => (
  <StyledList>
    {projects.map((project, index) => {
      let sumBitch = camelCase(project.name);
      return (
        <StyledLi key={sumBitch + "-" + index}>
          {project.name} - {project.description}
        </StyledLi>
      );
    })}
  </StyledList>
);
class Home extends Component {
  render() {
    return <ProjectList />;
  }
}

export { Home };
