import React, { useState, useEffect } from "react";

import styled from "@emotion/styled";

import { withScroll } from "react-window-decorators";

export const HeaderWrapper = styled.header`
  width: 100vw;
  height: 10vh;
  color: ${(props) => props.theme.colors.primaryDark};
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
  position: fixed;
  z-index: 50;
  top: 0;
  margin: auto;
  box-sizing: border-box;
  box-shadow: 0 8px 6px -6px lightgrey;
`;
const DivLine = styled.div`
  position: absolute;
  bottom: 0;
  height: 4px;
  width: ${(props) => props.width}%;
  background: ${(props) => props.theme.colors.primaryLight};
`;
const Header = ({ children }, props) => {
  const size = () => {
    const body = document.body,
      html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    return height;
  };

  const [scrollPosition, setSrollPosition] = useState(0);
  const width = (scrollPosition / size()) * 100;
  const handleScroll = () => {
    const position = window.pageYOffset;
    setSrollPosition(position);
    return position;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HeaderWrapper data-testid="testHeader">
      {children}
      <DivLine width={width} />
    </HeaderWrapper>
  );
};

export default withScroll(Header);
