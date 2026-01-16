import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">LifeStories</h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            A platform where real people share real life experiences — to
            inspire, heal, and connect through stories.
          </p>
        </div>

        {/* Quick Links – All Home Sections */}
        <div>
          <h6 className="footer-title mb-4">Explore</h6>
          <ul className="space-y-2 text-sm">
            <li><a href="/#home" className="hover:underline">Home</a></li>
            <li><Link to={'/about'} className="hover:underline">About</Link></li>
            <li><a href="/#categories" className="hover:underline">Story Categories</a></li>
            <li><a href="/#features" className="hover:underline">Key Features</a></li>
            <li><a href="/#life-matters" className="hover:underline">Life Matters</a></li>
            <li><a href="/#how-it-works" className="hover:underline">How It Works</a></li>
            <li><a href="/#trending-stories" className="hover:underline">Trending Stories</a></li>
            <li><a href="/#community-stats" className="hover:underline">Community Impact</a></li>
            <li><a href="/#testimonials" className="hover:underline">Testimonials</a></li>
            <li><a href="/#blogs" className="hover:underline">Blogs</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h6 className="footer-title mb-4">Support</h6>
          <ul className="space-y-2 text-sm">
            <li><a href="/#faq" className="hover:underline">FAQ</a></li>
            <li><a href="/#contact" className="hover:underline">Contact</a></li>
            <li><Link to="/stories" className="hover:underline">All Stories</Link></li>
            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h6 className="footer-title mb-4">Contact</h6>
          <p className="text-sm text-neutral-400 mb-2">
            📧 support@lifestories.com
          </p>
          <p className="text-sm text-neutral-400 mb-4">
            📍 Bangladesh
          </p>

          <div className="flex gap-4">
            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-white"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775..." />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-white"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246..." />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5..." />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-700 py-4 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} LifeStories. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
