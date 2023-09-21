import styled from "styled-components";
import { Heading } from "../primitives/heading/heading.component";
import { MailIcon, PhoneIcon } from "lucide-react";

const contactData = [
  {
    name: "Email",
    icon: <MailIcon />,
    info: "pitchkathalu@gmail.com",
  },
  {
    name: "Phone",
    icon: <PhoneIcon />,
    info: "+91-9960972735",
  },
];

export const ContactSection = () => {
  return (
    <ContactContainer>
      <Heading text="Contact Us" className="contact" />

      <div className="contact-info">
        {contactData.map((d, index) => (
          <div key={index} className="contact-item">
            {d.icon}
            <p>{d.info}</p>
          </div>
        ))}
      </div>

      <p className="sub-text">
        If you still have any questions or facing any issues while uploading the
        script, feel free to drop us a text or call.
      </p>
    </ContactContainer>
  );
};

export const ContactContainer = styled.div`
  border-top: 1px solid #454545;
  margin-bottom: 4rem;

  .contact {
    margin: 2rem 0;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .contact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;

      img {
        height: 2rem;
        width: 2rem;
      }

      p {
        font-weight: bold;
      }
    }
  }

  .sub-text {
    text-align: center;
  }
`;
