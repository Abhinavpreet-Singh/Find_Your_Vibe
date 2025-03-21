const Hobbies = () => {
  return (
    <section id="hobbies" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            Discover shared <span className="gradient-text">hobbies</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with people who enjoy the same activities as you do.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200 dark:bg-gray-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Photography</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Connect with fellow photographers, join photo walks, and share your work.
              </p>
              <button className="text-primary-purple dark:text-primary-gold font-medium">
                Explore Photography Groups →
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200 dark:bg-gray-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Gaming</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Find gaming buddies for your favorite titles and join local tournaments.
              </p>
              <button className="text-primary-purple dark:text-primary-gold font-medium">
                Find Gaming Groups →
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200 dark:bg-gray-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Outdoor Adventures</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Join hiking, camping, and other outdoor activity groups in your area.
              </p>
              <button className="text-primary-purple dark:text-primary-gold font-medium">
                Browse Adventure Groups →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hobbies;