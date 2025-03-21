
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Sample FAQs
const faqItems = [
  {
    question: "How long will my order take to arrive?",
    answer: "Domestic orders typically arrive within 3-5 business days. International shipping can take 7-14 business days, depending on the destination country and customs processing."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unworn items in their original packaging. Please visit our Returns page to initiate a return or exchange."
  },
  {
    question: "How do I care for my Pillowel items?",
    answer: "Most of our items can be machine washed on a gentle cycle with similar colors. We recommend air-drying to maintain the quality and shape of the garments. Always refer to the specific care instructions on the product label."
  },
  {
    question: "Do you offer gift wrapping?",
    answer: "Yes, we offer complimentary gift wrapping for all orders. Simply select the gift wrapping option during checkout and add your personalized message."
  }
];

const FAQs = () => {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="mb-8">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-pillowel-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center">
            <Link to="/faq" className="inline-flex items-center text-sm font-medium hover:underline">
              View all FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
