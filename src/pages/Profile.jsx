import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronDown, FiPlus, FiX, FiArrowRight, FiSkipForward } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import DashboardNavbar from '../components/DashboardNavbar';
import Loader from '../components/Loader';
import { 
  saveUserProfile, 
  getUserProfile, 
  interestCategories,
  interestsByCategory,
  collaborationTypes
} from '../firebase/profileService';

// Common universities for dropdown
const universities = [
  "MIT", 
  "Harvard University", 
  "Stanford University", 
  "Yale University",
  "Princeton University", 
  "University of Oxford", 
  "University of Cambridge", 
  "University of Toronto",
  "Chitkara University", // Added Chitkara University
  "University of California, Berkeley",
  "New York University",
  "Columbia University",
  "University of Chicago",
  "Other"
];

// Common programs/majors for dropdown
const programs = [
  "Computer Science",
  "Engineering", 
  "Business Administration", 
  "Psychology",
  "Biology", 
  "Communications", 
  "Economics", 
  "Political Science",
  "Mathematics",
  "English Literature",
  "Physics",
  "Chemistry",
  "Art & Design",
  "Other"
];

export default function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [skipping, setSkipping] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [customUniversity, setCustomUniversity] = useState('');
  const [customProgram, setCustomProgram] = useState('');
  const [universityDropdownOpen, setUniversityDropdownOpen] = useState(false);
  const [programDropdownOpen, setProgramDropdownOpen] = useState(false);
  
  // Profile state
  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    interests: [],
    hobbies: [],
    skills: [],
    collaborationPreferences: [],
    university: '',
    program: '',
    year: '',
    profileImage: '',
    completedProfile: false
  });

  // Get existing profile data if it exists
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const existingProfile = await getUserProfile(currentUser.uid);
        if (existingProfile) {
          setProfile(prevProfile => ({
            ...prevProfile,
            ...existingProfile
          }));
          
          if (existingProfile.completedProfile) {
            setProfileComplete(true);
          }
        } else if (currentUser.displayName) {
          // Set display name from Google auth if available
          setProfile(prevProfile => ({
            ...prevProfile,
            displayName: currentUser.displayName || '',
            profileImage: currentUser.photoURL || ''
          }));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleUniversitySelect = (university) => {
    if (university === 'Other') {
      setProfile(prevProfile => ({
        ...prevProfile,
        university: customUniversity || 'Other'
      }));
    } else {
      setProfile(prevProfile => ({
        ...prevProfile,
        university: university
      }));
      setCustomUniversity('');
    }
    setUniversityDropdownOpen(false);
  };

  const handleProgramSelect = (program) => {
    if (program === 'Other') {
      setProfile(prevProfile => ({
        ...prevProfile,
        program: customProgram || 'Other'
      }));
    } else {
      setProfile(prevProfile => ({
        ...prevProfile,
        program: program
      }));
      setCustomProgram('');
    }
    setProgramDropdownOpen(false);
  };

  const handleInterestToggle = (interest) => {
    setProfile(prevProfile => {
      const interests = [...prevProfile.interests];
      
      if (interests.includes(interest)) {
        return {
          ...prevProfile,
          interests: interests.filter(i => i !== interest)
        };
      } else {
        return {
          ...prevProfile,
          interests: [...interests, interest]
        };
      }
    });
  };

  const handleCollaborationToggle = (type) => {
    setProfile(prevProfile => {
      const preferences = [...prevProfile.collaborationPreferences];
      
      if (preferences.includes(type)) {
        return {
          ...prevProfile,
          collaborationPreferences: preferences.filter(p => p !== type)
        };
      } else {
        return {
          ...prevProfile,
          collaborationPreferences: [...preferences, type]
        };
      }
    });
  };

  const handleHobbyAdd = (e) => {
    e.preventDefault();
    const hobbyInput = e.target.elements.hobby;
    const hobby = hobbyInput.value.trim();
    
    if (hobby && !profile.hobbies.includes(hobby)) {
      setProfile(prevProfile => ({
        ...prevProfile,
        hobbies: [...prevProfile.hobbies, hobby]
      }));
      hobbyInput.value = '';
    }
  };

  const handleSkillAdd = (e) => {
    e.preventDefault();
    const skillInput = e.target.elements.skill;
    const skill = skillInput.value.trim();
    
    if (skill && !profile.skills.includes(skill)) {
      setProfile(prevProfile => ({
        ...prevProfile,
        skills: [...prevProfile.skills, skill]
      }));
      skillInput.value = '';
    }
  };

  const handleRemoveItem = (type, item) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      [type]: prevProfile[type].filter(i => i !== item)
    }));
  };

  const nextStep = () => {
    setActiveStep(prevStep => Math.min(prevStep + 1, 3));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setActiveStep(prevStep => Math.max(prevStep - 1, 0));
    window.scrollTo(0, 0);
  };

  // Simple direct approach without async calls
  const handleNext = () => {
    // Just move to next step directly
    nextStep();
  };

  const handleSkip = () => {
    // Just move to next step directly
    nextStep();
  };

  // Save only at completion
  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      console.log("Saving profile...", profile);
      
      // Mark as completed if at final step
      if (activeStep >= 3) {
        // Create a fresh copy of the profile with completedProfile flag
        const finalProfile = { 
          ...profile,
          completedProfile: true,
          updatedAt: new Date().toISOString(),
          // Make sure displayName is included if it's empty
          displayName: profile.displayName || currentUser.displayName || 'User'
        };
        
        console.log("Saving final profile:", finalProfile);
        
        // First save the profile data
        await saveUserProfile(currentUser.uid, finalProfile);
        console.log("Profile saved successfully");
        
        // Then update local state
        setProfile(finalProfile);
        setProfileComplete(true);
        
        // Delay navigation slightly to ensure state updates
        setTimeout(() => {
          console.log("Redirecting to dashboard");
          navigate('/dashboard');
        }, 500);
      } else {
        // Otherwise just go to next step
        console.log("Moving to next step");
        nextStep();
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("There was an error saving your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Custom dropdown component
  const Dropdown = ({ 
    label, 
    options, 
    value, 
    isOpen, 
    setIsOpen, 
    onSelect, 
    customValue, 
    setCustomValue,
    placeholder = "Select an option..."
  }) => (
    <div className="relative">
      <label className="block text-sm font-medium mb-1 text-gray-700">
        {label}
      </label>
      <button
        type="button"
        className="w-full px-4 py-2 border border-gray-300 rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <FiChevronDown className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 hover:bg-pink-50 cursor-pointer ${
                  option === value ? 'bg-pink-50 text-pink-700' : 'text-gray-800'
                }`}
                onClick={() => onSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          
          {/* Custom input for "Other" option */}
          {value === 'Other' && (
            <div className="p-2 border-t border-gray-200">
              <input
                type="text"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder={`Enter custom ${label.toLowerCase()}`}
                onBlur={() => {
                  if (customValue) {
                    onSelect('Other');
                  }
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (loading) {
    return <Loader />;
  }

  const renderStepIndicator = () => (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex justify-between">
        {["Basic Info", "Interests", "Preferences", "Review"].map((step, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col items-center ${idx <= activeStep ? "text-pink-500" : "text-gray-400"}`}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                ${idx < activeStep ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white" : 
                  idx === activeStep ? "border-2 border-orange-400" : "border-2 border-gray-300"}`}
            >
              {idx < activeStep ? "✓" : idx + 1}
            </div>
            <span className="text-xs sm:text-sm">{step}</span>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="absolute h-1 w-full bg-gray-200 rounded"></div>
        <div 
          className="absolute h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded transition-all duration-300"
          style={{ width: `${(activeStep / 3) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const renderBasicInfoStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Display Name
          </label>
          <input
            type="text"
            name="displayName"
            value={profile.displayName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="How you'd like to be known"
            required
          />
          {currentUser?.providerData?.[0]?.providerId === 'google.com' && profile.displayName && (
            <p className="mt-1 text-xs text-gray-500">
              Using name from your Google account. You can change it if you'd like.
            </p>
          )}
        </div>
        
        {/* University dropdown */}
        <Dropdown 
          label="University/College"
          options={universities}
          value={profile.university}
          isOpen={universityDropdownOpen}
          setIsOpen={setUniversityDropdownOpen}
          onSelect={handleUniversitySelect}
          customValue={customUniversity}
          setCustomValue={setCustomUniversity}
          placeholder="Select your institution"
        />
        
        <div className="grid grid-cols-2 gap-4">
          {/* Program dropdown */}
          <Dropdown 
            label="Program/Major"
            options={programs}
            value={profile.program}
            isOpen={programDropdownOpen}
            setIsOpen={setProgramDropdownOpen}
            onSelect={handleProgramSelect}
            customValue={customProgram}
            setCustomValue={setCustomProgram}
            placeholder="Select your major"
          />
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Year
            </label>
            <select
              name="year"
              value={profile.year}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="Graduate">Graduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            About Me
          </label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Share a little about yourself..."
          />
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <button
          onClick={handleSkip}
          disabled={skipping || !profile.displayName}
          className="py-2 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition flex items-center disabled:opacity-50"
        >
          {skipping ? "Skipping..." : (
            <>
              Skip for now <FiSkipForward className="ml-1.5" />
            </>
          )}
        </button>
        <button
          onClick={handleNext}
          disabled={saving || !profile.displayName}
          className="py-2 px-6 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium rounded-lg hover:opacity-90 transition flex items-center disabled:opacity-50"
        >
          {saving ? "Saving..." : (
            <>
              Next <FiArrowRight className="ml-1.5" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  const renderInterestsStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold mb-6">Your Interests</h2>
      
      <div className="space-y-6">
        {/* Interest categories in grid with active state */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select interest categories
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {interestCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`py-2 px-3 rounded-lg text-sm text-center transition
                  ${selectedCategory === category 
                    ? 'bg-gradient-to-r from-pink-500 to-orange-400 text-white' 
                    : 'bg-white border border-gray-300 hover:border-pink-400'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Specific interests for selected category */}
        {selectedCategory && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-gray-700">
              Select specific interests in {selectedCategory}
            </label>
            <div className="flex flex-wrap gap-2">
              {interestsByCategory[selectedCategory].map((interest, index) => (
                <button
                  key={index}
                  onClick={() => handleInterestToggle(interest)}
                  className={`py-1 px-3 rounded-full text-sm transition
                    ${profile.interests.includes(interest) 
                      ? 'bg-gradient-to-r from-pink-500 to-orange-400 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Selected interests display */}
        {profile.interests.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Selected interests ({profile.interests.length})</p>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <div 
                  key={index}
                  className="group bg-gradient-to-r from-pink-500 to-orange-400 text-white py-1 px-3 rounded-full text-sm flex items-center gap-1"
                >
                  <span>{interest}</span>
                  <button 
                    onClick={() => handleRemoveItem('interests', interest)}
                    className="text-white hover:bg-white/20 rounded-full h-4 w-4 flex items-center justify-center ml-1"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Custom hobbies input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Add custom hobbies or activities
          </label>
          <form onSubmit={handleHobbyAdd} className="flex gap-2">
            <input
              name="hobby"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="E.g., Drone photography, Cooking Italian food"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium rounded-lg hover:opacity-90 transition flex items-center"
            >
              <FiPlus className="mr-1" /> Add
            </button>
          </form>
          
          {profile.hobbies.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Your custom hobbies:</p>
              <div className="flex flex-wrap gap-2">
                {profile.hobbies.map((hobby, index) => (
                  <div 
                    key={index}
                    className="group bg-orange-100 text-orange-800 py-1 px-3 rounded-full text-sm flex items-center gap-1"
                  >
                    <span>{hobby}</span>
                    <button 
                      onClick={() => handleRemoveItem('hobbies', hobby)}
                      className="text-orange-800 hover:bg-orange-200 rounded-full h-4 w-4 flex items-center justify-center ml-1"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <button
          onClick={prevStep}
          className="py-2 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
        >
          Back
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={handleSkip}
            disabled={skipping}
            className="py-2 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition flex items-center"
          >
            {skipping ? "Skipping..." : (
              <>
                Skip for now <FiSkipForward className="ml-1.5" />
              </>
            )}
          </button>
          <button
            onClick={handleNext}
            disabled={saving}
            className="py-2 px-6 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium rounded-lg hover:opacity-90 transition flex items-center disabled:opacity-50"
          >
            {saving ? "Saving..." : (
              <>
                Next <FiArrowRight className="ml-1.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderPreferencesStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold mb-6">Collaboration Preferences</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            How would you like to collaborate with others?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {collaborationTypes.map((type, index) => (
              <button
                key={index}
                onClick={() => handleCollaborationToggle(type)}
                className={`py-2 px-3 rounded-lg text-sm text-center transition
                  ${profile.collaborationPreferences.includes(type) 
                    ? 'bg-gradient-to-r from-pink-500 to-orange-400 text-white' 
                    : 'bg-white border border-gray-300 hover:border-pink-400'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Selected collaboration preferences display */}
        {profile.collaborationPreferences.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Selected preferences ({profile.collaborationPreferences.length})</p>
            <div className="flex flex-wrap gap-2">
              {profile.collaborationPreferences.map((pref, index) => (
                <div 
                  key={index}
                  className="group bg-gradient-to-r from-pink-500 to-orange-400 text-white py-1 px-3 rounded-full text-sm flex items-center gap-1"
                >
                  <span>{pref}</span>
                  <button 
                    onClick={() => handleRemoveItem('collaborationPreferences', pref)}
                    className="text-white hover:bg-white/20 rounded-full h-4 w-4 flex items-center justify-center ml-1"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Add skills you'd like to share or develop
          </label>
          <form onSubmit={handleSkillAdd} className="flex gap-2">
            <input
              name="skill"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="E.g., Guitar, Python programming, Public speaking"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium rounded-lg hover:opacity-90 transition flex items-center"
            >
              <FiPlus className="mr-1" /> Add
            </button>
          </form>
          
          {profile.skills.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Your skills:</p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="group bg-pink-100 text-pink-800 py-1 px-3 rounded-full text-sm flex items-center gap-1"
                  >
                    <span>{skill}</span>
                    <button 
                      onClick={() => handleRemoveItem('skills', skill)}
                      className="text-pink-800 hover:bg-pink-200 rounded-full h-4 w-4 flex items-center justify-center ml-1"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <button
          onClick={prevStep}
          className="py-2 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
        >
          Back
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={handleSkip}
            disabled={skipping}
            className="py-2 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition flex items-center"
          >
            {skipping ? "Skipping..." : (
              <>
                Skip for now <FiSkipForward className="ml-1.5" />
              </>
            )}
          </button>
          <button
            onClick={handleNext}
            disabled={saving}
            className="py-2 px-6 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium rounded-lg hover:opacity-90 transition flex items-center"
          >
            {saving ? "Saving..." : (
              <>
                Next <FiArrowRight className="ml-1.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderReviewStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold mb-6">Review Your Profile</h2>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {profile.profileImage ? (
            <img 
              src={profile.profileImage} 
              alt={profile.displayName}
              className="w-20 h-20 rounded-full object-cover border-2 border-pink-300"
            />
          ) : (
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {profile.displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold">{profile.displayName}</h3>
            <p className="text-gray-600">
              {[profile.program, profile.university, profile.year].filter(Boolean).join(', ')}
            </p>
          </div>
        </div>
        
        {profile.bio && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase mb-1">About</h4>
            <p className="text-gray-800">{profile.bio}</p>
          </div>
        )}
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 uppercase mb-1">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {profile.interests.length > 0 ? profile.interests.map((interest, index) => (
              <span 
                key={index}
                className="bg-gradient-to-r from-pink-500 to-orange-400 text-white py-1 px-3 rounded-full text-sm"
              >
                {interest}
              </span>
            )) : (
              <p className="text-sm text-gray-500 italic">No interests selected</p>
            )}
          </div>
        </div>
        
        {profile.hobbies.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase mb-1">Hobbies</h4>
            <div className="flex flex-wrap gap-2">
              {profile.hobbies.map((hobby, index) => (
                <span 
                  key={index}
                  className="bg-orange-100 text-orange-800 py-1 px-3 rounded-full text-sm"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {profile.skills.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase mb-1">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-pink-100 text-pink-800 py-1 px-3 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {profile.collaborationPreferences.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase mb-1">Looking For</h4>
            <div className="flex flex-wrap gap-2">
              {profile.collaborationPreferences.map((pref, index) => (
                <span 
                  key={index}
                  className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-sm"
                >
                  {pref}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between pt-4">
        <button
          onClick={prevStep}
          className="py-2 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
        >
          Back
        </button>
        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className="py-2 px-6 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : profileComplete ? "Update Profile" : "Complete Profile"}
        </button>
      </div>
    </motion.div>
  );

  // Steps content mapping
  const steps = [
    renderBasicInfoStep,
    renderInterestsStep,
    renderPreferencesStep,
    renderReviewStep
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      <DashboardNavbar />
      {/* Added padding-top to prevent navbar overlap */}
      <div className="container mx-auto px-4 py-8 pt-28">
        {renderStepIndicator()}
        
        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
          {steps[activeStep]()}
        </div>
      </div>
    </div>
  );
}