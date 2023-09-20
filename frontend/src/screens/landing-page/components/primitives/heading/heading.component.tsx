import styled from "styled-components";
import Highlighter from "../../../assets/Backgound/Highlighter_png.png";

interface HeadingComponentProps {
  text: string;
  className?: string;
}

export const Heading = (props: HeadingComponentProps) => {
  return (
    <HeadingContainer className={props.className}>
      <img src={Highlighter} alt="pattern" />
      <p>{props.text}</p>
    </HeadingContainer>
  );
};

export const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    display: block;
    width: fit-content;
  }

  p {
    position: absolute;
    text-transform: uppercase;
    top: 45px;
    font-weight: bold;
  }
`;
