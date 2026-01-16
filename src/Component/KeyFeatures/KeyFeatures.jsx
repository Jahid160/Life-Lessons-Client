import React from "react";

const features = [
  {
    title: "Write & Publish Stories",
    description:
      "Create and publish your life stories easily using our simple editor.",
    icon: "✍️",
  },
  {
    title: "Like & Appreciate",
    description:
      "Show love and support to stories that resonate with you.",
    icon: "❤️",
  },
  {
    title: "Save for Later",
    description:
      "Bookmark stories and read them anytime you want.",
    icon: "🔖",
  },
  {
    title: "Share with Others",
    description:
      "Share inspiring stories with friends and on social platforms.",
    icon: "🔗",
  },
  {
    title: "Explore by Category",
    description:
      "Find stories by life, career, love, travel, and growth categories.",
    icon: "📂",
  },
  {
    title: "Safe & Respectful Community",
    description:
      "A moderated space focused on respect, positivity, and real experiences.",
    icon: "🛡️",
  },
];

const KeyFeatures = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to share, explore, and connect through real
            life stories.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border hover:shadow-lg transition"
            >
              <div className="text-5xl mb-5">{feature.icon}</div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default KeyFeatures;
