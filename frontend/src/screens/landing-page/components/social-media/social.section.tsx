import styled from "styled-components";
import { Heading } from "../primitives/heading/heading.component";
import YoutubeIcon from "../../assets/icons/youtube.png";
import InstagramIcon from "../../assets/icons/instagram.png";
import TwitterIcon from "../../assets/icons/twitter.png";

const socialData = [
  {
    name: "Youtube",
    icon: YoutubeIcon,
    link: "https://www.youtube.com/watch?v=T3KCKOSi-hA",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    link: "https://www.youtube.com/watch?v=T3KCKOSi-hA",
  },
  {
    name: "Twitter",
    icon: TwitterIcon,
    link: "https://www.twitter.com/koushithAmin",
  },
];

export const SocialSection = () => {
  return (
    <SocialContainer>
      <Heading text="Social Media" className="social" />

      <div className="social-links">
        {socialData.map((d, index) => (
          <img
            key={index}
            src={d.icon}
            alt={d.name}
            onClick={() => window.open(`${d.link}`, "_blank")}
          />
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
