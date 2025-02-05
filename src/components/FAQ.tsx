import { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is HeartBids?",
      answer:
        "HeartBids is an auction platform where users can donate and bid on items, services, and handcrafted goods. The proceeds go toward charitable initiatives, ensuring that contributions make a real impact.",
    },
    {
      question: "How do I participate?",
      answer:
        "To join, you need to register for an account. New users receive 1,000 credits, which can be used to place bids. You can also list your own items for auction, earning credits when they sell.",
    },
    {
      question: "Who can list items for auction?",
      answer:
        "Any registered user can create an auction listing, whether they are donating physical items, services, or handcrafted goods.",
    },
    {
      question: "How does the bidding process work?",
      answer:
        "Users place bids on active listings. When the auction ends, the highest bidder wins the item and the transaction is completed according to the listing terms.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Answers to our frequently asked questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 pb-4">
            <h3
              className="text-lg font-bold text-gray-800 cursor-pointer flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{openIndex === index ? "↑" : "↓"}</span>
            </h3>
            {openIndex === index && <p className="text-gray-600 mt-2">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
