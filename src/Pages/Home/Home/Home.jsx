import React from "react";
import Banner from "../Banner/Banner";
import LifeMatters from "../LifeMatters/LifeMatters";
import About from "../../../Component/about/About";
import StoryCategories from "../../../Component/StoryCategories/StoryCategories";
import KeyFeatures from "../../../Component/KeyFeatures/KeyFeatures";
import HowItWorks from "../../../Component/HowItWorks/HowItWorks";
import TrendingStories from "../../../Component/TrendingStories/TrendingStories";
import CommunityStats from "../../../Component/CommunityStats/CommunityStats";
import Testimonials from "../../../Component/Testimonials/Testimonials";
import BlogSection from "../../../Component/BlogSection/BlogSection";

import Faq from "../../../Component/Faq/Faq";
import Contact from "../../../Component/Contact/Contact";

const Home = () => {
  return (
    <div className="text-black">
      <Banner />


      <section id="categories">
        <StoryCategories />
      </section>

      <section id="features">
        <KeyFeatures />
      </section>

      <section id="life-matters">
        <LifeMatters />
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="trending-stories">
        <TrendingStories />
      </section>

      <section id="community-stats">
        <CommunityStats />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="blogs">
        <BlogSection />
      </section>

      <section id="faq">
        <Faq />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default Home;
