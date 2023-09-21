import styled from "styled-components";
import { Heading } from "../primitives/heading/heading.component";
import { useNavigate } from "react-router-dom";

export const ChallangeSection = () => {
  const navigate = useNavigate();
  return (
    <ChallangeContainer>
      <div className="challenge-container">
        <div className="left">
          <div className="thumbnail"></div>
        </div>

        <div className="right">
          <Heading text="The chalenge" />

          <p>Send in your ideas and if it's actually good,</p>
          <p>we will produce it this time.</p>
          <p>Are you talanted enough to make us eat our words?</p>
          <button onClick={() => navigate("/auth")}>Submit your pitch</button>
        </div>
      </div>
    </ChallangeContainer>
  );
};

export const ChallangeContainer = styled.section`
  margin-bottom: 4rem;
  .challenge-container {
    display: flex;
    align-items: center;
    gap: 2rem;
    justify-content: center;

    .left {
      .thumbnail {
        background-color: black;
        height: 300px;
        width: 200px;
        border-radius: 10px;
      }
    }

    .right {
      display: flex;
      align-items: center;
      flex-direction: column;

      p {
        text-align: center;
      }

      button {
        background-color: #d8d8d8;
        padding: 0.6rem 2rem;
        border-radius: 50px;
        margin-top: 2rem;
        border: 1px solid #464646;
        -webkit-box-shadow: -15px 14px 11px -1px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: -15px 14px 11px -1px rgba(0, 0, 0, 0.75);
        box-shadow: -15px 14px 11px -1px rgba(0, 0, 0, 0.75);
      }
    }
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (max-width: 544px) {
    padding: 1rem;
    .left {
      display: none;
    }
  }
`;
