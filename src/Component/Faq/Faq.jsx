import React, { useState } from "react";

const faqs = [
  {
    question: "Is it free to share stories on this platform?",
    answer:
      "Yes, creating an account and sharing your life stories is completely free for everyone.",
  },
  {
    question: "Can I edit or delete my story after publishing?",
    answer:
      "Absolutely. You can edit or delete your stories anytime from your profile dashboard.",
  },
  {
    question: "Are my stories visible to everyone?",
    answer:
      "Yes, all published stories are public so others can read, like, save, and share them.",
  },
  {
    question: "How can I save stories to read later?",
    answer:
      "You can save stories by clicking the save (bookmark) icon available on each story.",
  },
  {
    question: "Is this platform safe and moderated?",
    answer:
      "Yes, we maintain community guidelines and moderate content to ensure a respectful and safe environment.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about sharing and exploring stories.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 cursor-pointer hover:shadow-md transition"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <span className="text-2xl text-indigo-600">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </div>

              {activeIndex === index && (
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Faq;
