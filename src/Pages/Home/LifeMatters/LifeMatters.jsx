import React from 'react';

const LifeMatters = () => {
  const benefits = [
    {
      title: "Learn from Real Experience",
      desc: "Life teaches lessons no book can provide.",
    },
    {
      title: "Boost Problem-Solving Skills",
      desc: "Every challenge helps you think smarter.",
    },
    {
      title: "Better Decision Making",
      desc: "Experience helps you choose wisely.",
    },
    {
      title: "Grow Confidence",
      desc: "Learning from life builds self-belief.",
    },
  ];
  return (
    <section className="py-12 bg-base-200">
      <h2 className="text-3xl font-bold text-center mb-8">
        Why Learning From Life Matters
      </h2>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {benefits.map((b, i) => (
          <div key={i} className="card bg-base-100 shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
            <p className="text-sm text-gray-600">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LifeMatters;