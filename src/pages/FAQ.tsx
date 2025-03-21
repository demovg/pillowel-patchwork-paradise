
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. International shipping may take 7-14 business days depending on the destination."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unworn items in their original condition and packaging. Returns are free for customers in the US."
    },
    {
      question: "How do I care for my pillowel garments?",
      answer: "Most of our garments can be machine washed on a gentle cycle with cold water and laid flat to dry. Always check the care instructions on the specific product label."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping rates vary by location and will be calculated at checkout."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you will receive a confirmation email with tracking information. You can also log into your account to view your order status."
    },
    {
      question: "Are your products sustainable?",
      answer: "Yes, we prioritize sustainability in our manufacturing process. We use organic, recycled, and responsibly sourced materials wherever possible."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes, we offer gift wrapping services for an additional $5 per item. You can select this option during checkout."
    },
    {
      question: "What sizes do you offer?",
      answer: "We offer sizes XS to XXL in most of our clothing items. Please refer to our size guide for specific measurements to find your perfect fit."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">Frequently Asked Questions</h1>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-pillowel-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
