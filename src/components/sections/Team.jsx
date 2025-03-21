import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';

const Team = () => {
  const teamMembers = [
    {
      name: "Abhinavpreet Singh",
      role: "Full-Stack Developer",
      image: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with actual image
      github: "https://github.com/abhinavpreet-singh",
      linkedin: "https://linkedin.com/in/abhinavpreet-singh",
      bio: "Passionate about creating seamless user experiences and solving complex problems."
    },
    {
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      image: "https://randomuser.me/api/portraits/women/44.jpg", 
      github: "https://github.com/sarahjohnson",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      bio: "Creative designer focused on intuitive interfaces and beautiful visual experiences."
    },
    {
      name: "Michael Chen",
      role: "Backend Developer",
      image: "https://randomuser.me/api/portraits/men/36.jpg", 
      github: "https://github.com/michaelchen",
      linkedin: "https://linkedin.com/in/michaelchen",
      bio: "Building robust and scalable systems that power modern applications."
    },
    {
      name: "Priya Patel",
      role: "Product Manager",
      image: "https://randomuser.me/api/portraits/women/37.jpg", 
      github: "https://github.com/priyapatel",
      linkedin: "https://linkedin.com/in/priyapatel",
      bio: "Turning ideas into reality through strategic planning and user-focused development."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="team" className="py-16 px-4 md:px-6 lg:px-10 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Developing</span> Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Meet the talented individuals who are building and shaping Find Your Vibe.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary-purple dark:text-primary-gold mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {member.bio}
                </p>
                <div className="flex gap-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <motion.a 
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-purple dark:hover:text-primary-gold"
                    whileHover={{ scale: 1.2 }}
                  >
                    <FiGithub size={20} />
                  </motion.a>
                  <motion.a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-purple dark:hover:text-primary-gold"
                    whileHover={{ scale: 1.2 }}
                  >
                    <FiLinkedin size={20} />
                  </motion.a>
                  <motion.a 
                    href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@findyourvibe.com`}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-purple dark:hover:text-primary-gold"
                    whileHover={{ scale: 1.2 }}
                  >
                    <FiMail size={20} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;