import styled from "styled-components";
import { Heading } from "../primitives/heading/heading.component";

const faqData = [
  {
    question: "how do i submit my pitch?",
    answer: `Simply click on th "Submit" link in the navigation menu and follow the instructions provided `,
  },
  {
    question: "what type of pitches are accepted?",
    answer: `we're open to all generes, but make sure your ide is original, intresting, and able to stand out amongst the guaranteed disaster.`,
  },
  {
    question: "When is the Submission deadline?",
    answer:
      "You have untill October 31, 2023 to submit your idea. Dont miss your chance to be a part of Telivison history or infamily.",
  },
  {
    question: "What happens if my pitch is selected?",
    answer: `If we miraculously find your pitch intresting, we'll produce it for our show and give you the credit you deserve. Dreams do come true`,
  },
];

export const FAQSection = () => {
  return (
    <FaqContainer>
      <Heading text="burining Questions" className="heading" />

      <div className="faq-list">
        {faqData.map((q, i) => (
          <div className="faq" key={i}>
            <p className="question">{q.question}</p>
            <p className="answer">{q.answer}</p>
          </div>
        ))}
      </div>
    </FaqContainer>
  );
};

export const FaqContainer = styled.section`
  border-top: 1px solid #464646;
  .heading {
    margin-top: 2rem;
  }

  p {
    text-align: center;
  }
  .faq {
    margin-top: 1rem;
    margin-bottom: 4rem;
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
    .question {
      font-weight: bold;
      margin-bottom: 0.8rem;
      text-transform: uppercase;
    }
  }
`;
