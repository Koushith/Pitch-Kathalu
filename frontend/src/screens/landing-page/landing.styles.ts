import styled, { css } from "styled-components";

import backgroundImg from "./assets/Backgound/background.jpg";

const CourbFont = css`
  @font-face {
    font-family: "Courier New";
    src: local("Courb"), url("./fonts/cour.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }
`;

export const LandingPageContainer = styled.div`
  font-family: "Courier Prime", monospace;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover; /* Full content coverage */
`;
