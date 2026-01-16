import React from "react";

// Example blog data (replace with API data later)
const blogs = [
  {
    title: "5 Life Lessons Learned from Failure",
    excerpt:
      "Failure is not the end. These real-life lessons show how setbacks can shape a stronger future.",
    author: "Admin",
    date: "Jan 10, 2026",
    image: "https://via.placeholder.com/400x250?text=Life+Lessons",
  },
  {
    title: "How Sharing Your Story Can Heal You",
    excerpt:
      "Storytelling is powerful. Discover how sharing personal experiences helps emotional growth.",
    author: "Jahid",
    date: "Jan 15, 2026",
    image: "https://via.placeholder.com/400x250?text=Storytelling",
  },
  {
    title: "Travel Stories That Change Perspectives",
    excerpt:
      "Travel is more than destinations. Explore how journeys transform mindset and character.",
    author: "Nusrat",
    date: "Jan 20, 2026",
    image: "https://via.placeholder.com/400x250?text=Travel+Stories",
  },
];

const BlogSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest From Our Blog
          </h2>
          <p className="text-lg text-gray-600">
            Insights, tips, and thoughts on life, storytelling, and personal growth.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              {/* Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">
                  {blog.date} · {blog.author}
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {blog.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {blog.excerpt}
                </p>

                <button className="text-indigo-600 font-medium hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
