import React from "react";

const steps = [
  {
    step: "01",
    title: "Create an Account",
    description:
      "Sign up in seconds to start sharing and exploring real life stories.",
    icon: "👤",
  },
  {
    step: "02",
    title: "Write Your Story",
    description:
      "Share your life experiences — career, love, travel, or personal growth.",
    icon: "✍️",
  },
  {
    step: "03",
    title: "Publish & Share",
    description:
      "Publish your story and let others read, like, and save it.",
    icon: "🚀",
  },
  {
    step: "04",
    title: "Engage & Connect",
    description:
      "Read stories, support writers, and connect through shared experiences.",
    icon: "❤️",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Start sharing and exploring stories in just a few simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-50 p-8 rounded-2xl border hover:shadow-lg transition"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                {item.step}
              </div>

              {/* Icon */}
              <div className="text-5xl mb-5 mt-6">{item.icon}</div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
