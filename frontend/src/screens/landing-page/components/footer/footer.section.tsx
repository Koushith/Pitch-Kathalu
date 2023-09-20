import styled from "styled-components";
import { Heading } from "../primitives/heading/heading.component";
import Cross from "../../assets/icons/red-cross.png";

export const FooterSection = () => {
  return (
    <FoterContainer>
      <div className="end-container">
        <img src={Cross} alt="cross" />
        <p>The End</p>
      </div>
      <Heading text="This is Just the Begining" className="heading" />
    </FoterContainer>
  );
};

export const FoterContainer = styled.div`
  border-top: 1px solid #0c090a;
  border-bottom: 1px solid #0c090a;

  .end-container {
    margin-top: 2rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 70px;
    }

    p {
      position: absolute;
      top: 12px;
    }
  }

  .heading {
    margin-bottom: 2rem;
  }
`;
