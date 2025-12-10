

 function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Digital Life Lessons</h1>

        <ul className="flex gap-6 text-gray-600">
          <li className="hover:text-black cursor-pointer">Home</li>
          <li className="hover:text-black cursor-pointer">My Lessons</li>
          <li className="hover:text-black cursor-pointer">Explore</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mt-24 px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Collect Your Wisdom. Grow Every Day.
        </h2>

        <p className="text-gray-600 mb-8 text-lg">
          Save your important life lessons, reflect deeply, and explore wisdom shared by others.
        </p>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
          Create Your First Lesson
        </button>
      </div>

      {/* Popular Lessons Section */}
      <div className="max-w-5xl mx-auto mt-20 px-6">
        <h3 className="text-xl font-semibold mb-4">Popular Lessons</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-lg font-semibold mb-2">Be Patient With Yourself</h4>
            <p className="text-gray-600 text-sm">
              Growth takes time. Celebrate small steps forward...
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-lg font-semibold mb-2">Failures Are Lessons</h4>
            <p className="text-gray-600 text-sm">
              Every mistake teaches you something valuable...
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-lg font-semibold mb-2">Take Care of Your Mind</h4>
            <p className="text-gray-600 text-sm">
              Your mental health builds the foundation of your life...
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home