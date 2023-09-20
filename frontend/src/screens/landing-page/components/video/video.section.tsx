import styled from "styled-components";
import { Heading } from "../primitives/heading/heading.component";

export const VideoSection = () => {
  return (
    <VideoContainer>
      <Heading text="Videos" className="heading" />
      <p>Take a look at them</p>
      <div className="video-list">
        <div className="video-thumbnail"></div>
        <div className="video-thumbnail"></div>
        <div className="video-thumbnail"></div>
      </div>
    </VideoContainer>
  );
};

export const VideoContainer = styled.section`
  p {
    text-align: center;
  }

  border-top: 1px solid #0c090a;

  .heading {
    margin-top: 2rem;
  }

  .video-list {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 4rem;
    gap: 2rem;
    .video-thumbnail {
      width: 300px;
      height: 150px;
      border-radius: 10px;
      background: black;
    }
  }
`;
