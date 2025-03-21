import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiUsers, FiAward } from 'react-icons/fi';

const HackathonTeam = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Future date for next hackathon (as an example)
    const targetDate = new Date('2025-04-15T00:00:00Z').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const teams = [
    {
      name: "CodeCrusaders",
      project: "AI Health Assistant",
      members: 4,
      tags: ["Healthcare", "AI", "Mobile"]
    },
    {
      name: "DevDynamos",
      project: "Smart Learning Platform",
      members: 3,
      tags: ["Education", "Web3", "AR"]
    },
    {
      name: "ByteBrigade",
      project: "Environmental Tracker",
      members: 5,
      tags: ["IoT", "Environment", "Data"]
    },
    {
      name: "TechTitans",
      project: "Inclusive Gaming UI",
      members: 4,
      tags: ["Accessibility", "Gaming", "UI/UX"]
    }
  ];

  return (
    <section id="hackathon" className="py-16 px-4 md:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Build. Innovate. <span className="gradient-text">Win.</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Form your dream hackathon team with passionate developers, designers, and innovators.
          </p>
        </motion.div>
        
        {/* Countdown Timer */}
        <motion.div 
          className="mb-16 bg-gradient-to-r from-primary-purple/10 to-primary-red/10 dark:from-primary-purple/20 dark:to-primary-red/20 rounded-xl p-6 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
            Next Hackathon Starting In:
          </h3>
          <div className="flex justify-center gap-4 md:gap-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="w-16 md:w-24 h-16 md:h-24 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center mb-2">
                  <span className="text-2xl md:text-4xl font-bold gradient-text">
                    {value}
                  </span>
                </div>
                <span className="text-sm md:text-base capitalize text-gray-600 dark:text-gray-400">
                  {unit}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Teams Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {teams.map((team, index) => (
            <motion.div
              key={index}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)"
              }}
              viewport={{ once: true }}
            >
              <div className="h-2 w-full bg-gradient-to-r from-primary-purple to-primary-red rounded-t-xl absolute top-0 left-0"></div>
              <h3 className="font-bold text-xl mb-2">{team.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {team.project}
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <FiUsers className="mr-1" /> {team.members} members
              </div>
              <div className="flex flex-wrap gap-2">
                {team.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Button */}
        <motion.div 
          className="text-center"
          whileInView={{ scale: [0.9, 1] }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create a Team
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HackathonTeam;