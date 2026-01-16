import React from "react";

const About = () => {
  return (
    <section id="about" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Stories That Shape Lives
          </h2>
          <p className="text-lg text-gray-600">
            A community-driven platform where people share real-life
            experiences to inspire, guide, and connect with others.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          
          {/* Left Content */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Why This Platform Exists
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Every person carries stories of struggle, growth, love, failure,
              and success. These stories are powerful — they teach lessons no
              textbook ever can.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Our platform gives everyone a voice to share their journey —
              whether it’s about career growth, relationships, travel, or
              personal transformation.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By sharing and engaging with stories, we create a supportive
              space where people learn from each other and grow together.
            </p>
          </div>

          {/* Right Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <h4 className="text-3xl font-bold text-indigo-600 mb-2">
                Real Stories
              </h4>
              <p className="text-gray-500">
                Authentic experiences shared by real people from around the world.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <h4 className="text-3xl font-bold text-indigo-600 mb-2">
                Multiple Topics
              </h4>
              <p className="text-gray-500">
                Life, career, love, travel, failure, and personal growth.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <h4 className="text-3xl font-bold text-indigo-600 mb-2">
                Community Driven
              </h4>
              <p className="text-gray-500">
                Like, save, and share stories that resonate with you.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <h4 className="text-3xl font-bold text-indigo-600 mb-2">
                Safe Space
              </h4>
              <p className="text-gray-500">
                Respectful environment for honest and meaningful storytelling.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
