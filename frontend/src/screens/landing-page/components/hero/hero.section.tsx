import styled from "styled-components";
import Hero from "../../assets/Backgound/hero.png";

export const HeroSection = () => {
  return (
    <HeroContainer>
      <img src={Hero} alt="hero" />
    </HeroContainer>
  );
};

export const HeroContainer = styled.section`
  position: relative;
`;
