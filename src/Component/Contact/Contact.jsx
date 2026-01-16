import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600">
            Have a question, feedback, or idea? We’d love to hear from you.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              Contact Information
            </h3>
            <p className="text-gray-600">
              Reach out to us for support, collaboration, or general inquiries.
              We usually respond within 24 hours.
            </p>

            <div className="space-y-4 text-gray-700">
              <p><strong>Email:</strong> jahidpcbd@gmail.com</p>
              <p><strong>Phone:</strong> +880 1829 972560</p>
              <p><strong>Location:</strong> Bangladesh</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-400 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-400 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-400 text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
