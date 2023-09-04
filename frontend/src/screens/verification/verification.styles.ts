import { keyframes, styled } from "styled-components";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const VerificationContainer = styled.div`
  align-items: center;
  justify-content: center;

  .qr-code {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;

    .react-qr {
      height: 200px;
      width: 200px;
    }
  }

  .loader {
    animation: ${spinAnimation} 1s linear infinite;
  }
`;
