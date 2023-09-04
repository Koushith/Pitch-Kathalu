import { styled } from "styled-components";

export const HomeContainer = styled.div`
  .left {
    min-width: 800px;
  }

  .leader-board {
    min-width: 300px;
  }

  @media (max-width: 1200px) {
    flex-wrap: wrap;
    width: 100%;
    .right {
      width: 100% !important;
    }
    .left {
      min-width: 100%;
    }
  }

  @media (max-width: 800px) {
    /* .post-cards {
      grid-template-columns: 1fr;
    } */
    .leader-board {
      min-width: 100%;
    }
    .right {
      width: 100% !important;
    }
  }
`;
