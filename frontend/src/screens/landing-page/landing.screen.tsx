import { ChallangeSection } from "./components/challange/challange.section";
import { FAQSection } from "./components/faq/faq.section";
import { FooterSection } from "./components/footer/footer.section";
import { HeroSection } from "./components/hero/hero.section";
import { SocialSection } from "./components/social-media/social.section";
import { VideoSection } from "./components/video/video.section";
import { LandingPageContainer } from "./landing.styles";
import "./landing.styles";

export const LandingPage = () => {
  return (
    <LandingPageContainer>
      <HeroSection />
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0.1rem" }}>
        <ChallangeSection />
        <VideoSection />
        <FAQSection />
        <SocialSection />
        <FooterSection />
      </div>
    </LandingPageContainer>
  );
};
