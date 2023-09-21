//@ts-nocheck
import styled from "styled-components";
import { Heading } from "../primitives/heading/heading.component";
import Thumbnail01 from "../../assets/Backgound/thumbnail-1.jpg";
import Thumbnail02 from "../../assets/Backgound/thumbnail-2.jpg";
import Thumbnail03 from "../../assets/Backgound/thumbnail-3.jpg";

export const VideoSection = () => {
  const openYouTubeLink = (videoId: string) => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      window.location.href = videoId;
    } else {
      window.open(`${videoId}`, "_blank");
    }
  };
  return (
    <VideoContainer>
      <Heading text="Videos" className="heading" />
      <p>Take a look at them</p>
      <div className="video-list">
        <img
          src={Thumbnail01}
          onClick={() => openYouTubeLink("https://youtu.be/T3KCKOSi-hA")}
          className="video-thumbnail"
          alt="thumbnail"
        />
        <img
          src={Thumbnail02}
          onClick={() => openYouTubeLink("https://youtu.be/HF1TJrD7vYM")}
          className="video-thumbnail"
          alt="thumbnail"
        />
        <img
          src={Thumbnail03}
          onClick={() => openYouTubeLink("https://youtu.be/lcDQpn5N6Mk")}
          className="video-thumbnail"
          alt="thumbnail"
        />
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

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (max-width: 544px) {
    padding: 0.1rem;
    .video-list {
      flex-direction: column;
    }
  }
`;
