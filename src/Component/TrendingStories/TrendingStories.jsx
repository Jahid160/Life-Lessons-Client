import React from "react";

// Example stories (replace with dynamic API data later)
const trendingStories = [
  {
    title: "How I Overcame My Career Setback",
    author: "Rahim",
    likes: 120,
    saves: 60,
    image: "https://via.placeholder.com/400x250?text=Career+Story",
  },
  {
    title: "Traveling Alone Changed My Life",
    author: "Nusrat",
    likes: 98,
    saves: 45,
    image: "https://via.placeholder.com/400x250?text=Travel+Story",
  },
  {
    title: "Lessons From My First Love",
    author: "Jahid",
    likes: 150,
    saves: 80,
    image: "https://via.placeholder.com/400x250?text=Love+Story",
  },
  {
    title: "From Failure to Success in 2 Years",
    author: "Sara",
    likes: 200,
    saves: 95,
    image: "https://via.placeholder.com/400x250?text=Life+Lesson",
  },
];

const TrendingStories = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trending Stories
          </h2>
          <p className="text-lg text-gray-600">
            Discover the most liked and saved stories from our community.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingStories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              {/* Image */}
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-48 object-cover"
              />

              {/* Story Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {story.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">by {story.author}</p>

                {/* Likes & Saves */}
                <div className="flex justify-between text-gray-600 text-sm">
                  <div className="flex items-center gap-1">
                    <span>❤️</span>
                    <span>{story.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🔖</span>
                    <span>{story.saves}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrendingStories;
