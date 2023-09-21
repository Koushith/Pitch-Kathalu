import styled from "styled-components";
import { Heading } from "../primitives/heading/heading.component";
import YoutubeIcon from "../../assets/icons/youtube.png";
import InstagramIcon from "../../assets/icons/instagram.png";
import TwitterIcon from "../../assets/icons/twitter.png";

const socialData = [
  {
    name: "Youtube",
    icon: YoutubeIcon,
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
  },
  {
    name: "Twitter",
    icon: TwitterIcon,
  },
];

export const SocialSection = () => {
  return (
    <SocialContainer>
      <Heading text="Social Media" className="social" />

      <div className="social-links">
        {socialData.map((d, index) => (
          <img key={index} src={d.icon} alt={d.name} />
        ))}
      </div>
    </SocialContainer>
  );
};

export const SocialContainer = styled.div`
  border-top: 1px solid #454545;
  /* border-bottom: 1px solid #0c090a; */
  margin-bottom: 4rem;
  .social {
    margin: 2rem 0;
  }

  .social-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    img {
      height: 2rem;
      width: 2rem;
      cursor: pointer;
    }
  }
`;
