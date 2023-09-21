import styled from "styled-components";
import { Heading } from "../primitives/heading/heading.component";

const faqData = [
  {
    question: "how do I submit my pitch?",
    answer: `Simply click on the "<a href="/auth">Submit</a>" link in the navigation menu and follow the instructions provided.`,
    // You can use HTML within the answer to create the link
  },
  {
    question: "what type of pitches are accepted?",
    answer: `We're open to all genres, but make sure your idea is original, interesting, and able to stand out amongst the guaranteed disaster.`,
  },
  {
    question: "When is the Submission deadline?",
    answer:
      "You have until October 31, 2023, to submit your idea. Don't miss your chance to be a part of Television history or infamy.",
  },
  {
    question: "What happens if my pitch is selected?",
    answer: `If we miraculously find your pitch interesting, we'll produce it for our show and give you the credit you deserve. Dreams do come true.`,
  },
];

export const FAQSection = () => {
  return (
    <FaqContainer>
      <Heading text="burning Questions" className="heading" />

      <div className="faq-list">
        {faqData.map((q, i) => (
          <div className="faq" key={i}>
            <p className="question">{q.question}</p>
            <div
              className="answer"
              dangerouslySetInnerHTML={{ __html: q.answer }}
            />
            {/* Use dangerouslySetInnerHTML to render HTML within the answer */}
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
    .answer {
      text-align: center;
      a {
        color: #007bff;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;
