const Stats = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">
            Our <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Find Your Vibe has helped thousands of people connect and collaborate on projects they're passionate about.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 transform transition-transform hover:scale-105">
            <p className="text-4xl font-bold text-primary-purple mb-2">1,000+</p>
            <p className="text-gray-600 dark:text-gray-400">Active Users</p>
          </div>
          
          <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 transform transition-transform hover:scale-105">
            <p className="text-4xl font-bold text-primary-gold mb-2">250+</p>
            <p className="text-gray-600 dark:text-gray-400">Projects Created</p>
          </div>
          
          <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 transform transition-transform hover:scale-105">
            <p className="text-4xl font-bold text-primary-red mb-2">50+</p>
            <p className="text-gray-600 dark:text-gray-400">Hackathons Supported</p>
          </div>
          
          <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 transform transition-transform hover:scale-105">
            <p className="text-4xl font-bold gradient-text mb-2">100%</p>
            <p className="text-gray-600 dark:text-gray-400">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;