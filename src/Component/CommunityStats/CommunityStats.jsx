import React from "react";

const stats = [
  { label: "Stories Shared", value: 5000, icon: "📖" },
  { label: "Active Writers", value: 2000, icon: "👥" },
  { label: "Likes Given", value: 20000, icon: "❤️" },
  { label: "Countries Represented", value: 30, icon: "🌍" },
];

const CommunityStats = () => {
  return (
    <section className="py-20 bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Community Impact
          </h2>
          <p className="text-lg text-indigo-100">
            See how our platform has grown and how many lives have been
            touched.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-8 bg-indigo-700 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <div className="text-5xl mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold mb-2">{stat.value.toLocaleString()}</h3>
              <p className="text-indigo-200">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CommunityStats;
