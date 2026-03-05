import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Section from "./Section";
import clsx from "clsx";
import { faqs } from "../../data/faqData";
import PublicButton from "../shared/PublicButton";

const Faq = ({ limit, hideHeader = false }) => {
  const displayedFaqs = limit ? faqs.slice(0, limit) : faqs;
  const [openIndex, setOpenIndex] = useState(0);

  const innerContent = (
    <>
      {!hideHeader && (
        <div className="w-full">
          <Section.Header
            title="Frequently Asked Questions"
            description="Find answers to common questions about our colleges and programs"
            badge="FAQ"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 w-full">
        {displayedFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={clsx(
                "border rounded-xl bg-white overflow-hidden transition-all duration-300",
                isOpen ? "border-college-gold shadow-md" : "border-gray-200"
              )}
            >
              <PublicButton
                variant="unstyled"
                size="none"
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:bg-gray-50/50 transition-colors group cursor-pointer"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-bold text-college-navy group-hover:text-college-gold transition-colors pr-6">
                  {faq.question}
                </span>
                <ChevronDown
                  className={clsx(
                    "w-5 h-5 flex-shrink-0 text-college-gold transition-transform duration-300",
                    isOpen ? "rotate-180" : ""
                  )}
                />
              </PublicButton>
              <div
                className={clsx(
                  "px-5 overflow-hidden transition-all duration-300",
                  isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <p className="text-gray-600 leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  // If hideHeader is true, we assume it's being embedded inside another Section (like in Home.jsx)
  if (hideHeader) {
    return innerContent;
  }

  return (
    <Section background="white" spacing="large">
      <div className="max-w-4xl mx-auto">{innerContent}</div>
    </Section>
  );
};

export default Faq;
