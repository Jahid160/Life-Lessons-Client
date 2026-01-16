import React from "react";
import { Link } from "react-router";

const categories = [
  {
    title: "Life Lessons",
    description:
      "Real experiences that teach meaningful lessons and personal growth.",
    icon: "🧠",
  },
  {
    title: "Career & Business",
    description:
      "Stories about career struggles, success, failures, and professional growth.",
    icon: "💼",
  },
  {
    title: "Love & Relationships",
    description:
      "Heartfelt stories of love, heartbreak, marriage, and relationships.",
    icon: "❤️",
  },
  {
    title: "Travel Experiences",
    description:
      "Adventures, cultures, and unforgettable moments from around the world.",
    icon: "🌍",
  },
  {
    title: "Failure & Comeback",
    description:
      "Stories of falling down, learning lessons, and rising stronger.",
    icon: "💔",
  },
  {
    title: "Personal Growth",
    description:
      "Journeys of self-discovery, confidence, and mental strength.",
    icon: "🌱",
  },
];

const StoryCategories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Story Categories
          </h2>
          <p className="text-lg text-gray-600">
            Discover stories across different aspects of life — written by
            real people, for real inspiration.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group bg-gray-50 p-8 rounded-2xl border hover:shadow-lg transition"
            >
              <div className="text-5xl mb-5">{category.icon}</div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {category.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {category.description}
              </p>

              <Link to={'/life-lessons'} className="mt-6 text-indigo-600 font-medium group-hover:underline">
                Explore Stories →
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StoryCategories;
