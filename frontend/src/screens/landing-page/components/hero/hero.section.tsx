import styled from "styled-components";
import Hero from "../../assets/Backgound/hero.png";
import { Modal } from "../model/mode.component";
import { useState } from "react";

export const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <HeroContainer>
      <img src={Hero} alt="hero" />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="model-content">
          <h2>Refund Policy for Pitch Kathalu Application</h2>

          <p>
            At Pitch Kathalu, we provide a platform for creative storytellers to
            share their ideas and potentially bring them to life. Please review
            our refund policy for a clear understanding of how refunds are
            handled on our platform.
          </p>

          <h2>1. Uploading Fee</h2>

          <p>
            To upload your story idea to Pitch Kathalu and have the opportunity
            for it to be considered, an uploading fee of 200 Indian Rupees (INR)
            is required. This fee is non-refundable. Once you have paid the
            uploading fee, your story will be submitted for review, but it may
            or may not be shortlisted for production.
          </p>

          <h2>2. Refund Exceptions</h2>

          <p>
            We do not offer refunds for the uploading fee under any
            circumstances. This policy is in place to ensure fairness and
            consistency for all users. Whether or not your story is shortlisted,
            the uploading fee is non-refundable.
          </p>

          <h2>3. Reporting Errors</h2>

          <p>
            If you encounter any technical errors or issues while using the
            Pitch Kathalu application or during the uploading process, please
            promptly contact our support team via email at [Support Email]. We
            are committed to resolving any problems that may arise, and we will
            make every effort to assist you in a timely manner.
          </p>

          <h2>4. Contact Us</h2>

          <p>
            If you have any questions or concerns about our Refund Policy,
            please do not hesitate to contact us at [Contact Email]. We value
            your feedback and are here to provide assistance whenever needed.
          </p>

          <p>
            By using the Pitch Kathalu application, you agree to abide by this
            Refund Policy. We reserve the right to update or modify this policy
            at any time. Any changes will be communicated through our
            application or website.
          </p>

          <p>
            Thank you for choosing Pitch Kathalu. We appreciate your
            understanding and support as we work together to consider and
            potentially bring your stories to life.
          </p>
        </div>
      </Modal>
      <div className="menu">
        <button className="btn" onClick={openModal}>
          Submit
        </button>
        <button className="btn" onClick={openModal}>
          Contact
        </button>
        <button className="btn" onClick={openModal}>
          Refund Policy
        </button>
      </div>
    </HeroContainer>
  );
};

export const HeroContainer = styled.section`
  position: relative;

  .model-content {
    h2 {
      font-weight: bold;

      margin-bottom: 0.8rem;
    }
    p {
      margin-bottom: 2rem;
      margin-left: 2rem;
    }
  }

  .menu {
    position: absolute;
    bottom: 20%;
    display: flex;
    align-items: center;
    gap: 8rem;
    justify-content: center;

    width: 100%;

    .btn {
      background-color: #e9dcbf;
      padding: 0.6rem 2rem;
      border-radius: 50px;
      margin-top: 2rem;
      border: 1px solid #464646;
    }
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (max-width: 544px) {
    .menu {
      background-color: red;
      display: none;
    }
  }
`;
