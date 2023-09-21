import styled from "styled-components";
import { Heading } from "../primitives/heading/heading.component";
import Thumbnail01 from "../../assets/Backgound/thumbnail-1.jpg";
import Thumbnail02 from "../../assets/Backgound/thumbnail-2.jpg";
import Thumbnail03 from "../../assets/Backgound/thumbnail-3.jpg";

export const VideoSection = () => {
  return (
    <VideoContainer>
      <Heading text="Videos" className="heading" />
      <p>Take a look at them</p>
      <div className="video-list">
        <img src={Thumbnail01} className="video-thumbnail" alt="thumbnail" />
        <img src={Thumbnail02} className="video-thumbnail" alt="thumbnail" />
        <img src={Thumbnail03} className="video-thumbnail" alt="thumbnail" />
      </div>
    </VideoContainer>
  );
};

export const VideoContainer = styled.section`
  p {
    text-align: center;
  }

  border-top: 1px solid #454545;

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
      width: 350px;
      height: 200px;
      object-fit: cover;
      border-radius: 10px;
      background: black;
      cursor: pointer;
    }
  }
`;
