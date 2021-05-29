import React, { Component } from "react";
import styled from "@emotion/styled";

import List from "../List/List";
import Button from "../Button/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  width: 700px;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.white};

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Header = styled.header`
  padding-bottom: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightDark};
`;

class SideNav extends Component {
  render() {
    const { markers, handleSort, handleDelete, handleDownload } = this.props;

    return (
      <Container>
        <Header data-testid="header">
          <h1>Komoot Route Builder</h1>
        </Header>

        <List
          markers={markers}
          handleSort={handleSort}
          handleDelete={handleDelete}
        />

        <Button handleClick={handleDownload}>Download your Route</Button>
      </Container>
    );
  }
}

export default SideNav;
