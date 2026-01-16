import React from "react";

// Example testimonials (replace with dynamic data later)
const testimonials = [
  {
    name: "Rahim",
    role: "Software Engineer",
    quote:
      "Sharing my story here changed my perspective on life. I learned so much from others’ experiences.",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Nusrat",
    role: "Traveler",
    quote:
      "Reading stories from people around the world inspired me to take the leap and travel solo.",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Jahid",
    role: "Entrepreneur",
    quote:
      "This platform helped me connect with people who faced similar challenges in their careers and life.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-gray-600">
            Hear from users who have shared and read life-changing stories.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition"
            >
              <div className="flex items-center mb-4">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-14 h-14 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                  <p className="text-gray-500 text-sm">{test.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{test.quote}"</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
