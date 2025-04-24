import { db } from './config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const userProfilesCollection = 'userProfiles';

// Create or update a user profile
export const saveUserProfile = async (userId, profileData) => {
  try {
    // Check if profile already exists
    const profileRef = doc(db, userProfilesCollection, userId);
    const profileSnap = await getDoc(profileRef);
    
    if (profileSnap.exists()) {
      // Update existing profile
      await updateDoc(profileRef, profileData);
      return { ...profileSnap.data(), ...profileData };
    } else {
      // Create new profile with default fields
      const newProfile = {
        userId,
        displayName: '',
        bio: '',
        interests: [],
        hobbies: [],
        skills: [],
        collaborationPreferences: [],
        completedProfile: false,
        createdAt: new Date().toISOString(),
        ...profileData
      };
      
      await setDoc(profileRef, newProfile);
      return newProfile;
    }
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

// Get a user profile by ID
export const getUserProfile = async (userId) => {
  try {
    const profileRef = doc(db, userProfilesCollection, userId);
    const profileSnap = await getDoc(profileRef);
    
    if (profileSnap.exists()) {
      return profileSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Check if a user has completed their profile
export const hasCompletedProfile = async (userId) => {
  try {
    const profile = await getUserProfile(userId);
    return profile && profile.completedProfile === true;
  } catch (error) {
    console.error('Error checking profile completion:', error);
    return false;
  }
};

// Available interests categories for the platform
export const interestCategories = [
  "Sports & Athletics",
  "Arts & Creative",
  "Technology & Programming",
  "Music & Performance",
  "Academic & Learning",
  "Games & Recreation",
  "Outdoor & Adventure",
  "Social & Community"
];

// Sample interests data by category
export const interestsByCategory = {
  "Sports & Athletics": [
    "Football", "Basketball", "Volleyball", "Tennis", "Swimming", 
    "Cricket", "Badminton", "Running", "Cycling", "Yoga", "Martial Arts"
  ],
  "Arts & Creative": [
    "Painting", "Drawing", "Photography", "Graphic Design", "Sculpture", 
    "Creative Writing", "Poetry", "Film Making", "Animation"
  ],
  "Technology & Programming": [
    "Web Development", "Mobile App Development", "Data Science", 
    "Artificial Intelligence", "Game Development", "Cybersecurity",
    "Robotics", "Blockchain"
  ],
  "Music & Performance": [
    "Singing", "Guitar", "Piano", "Drums", "Violin", "Dance", "Theater", 
    "DJ", "Band", "Music Production"
  ],
  "Academic & Learning": [
    "Study Groups", "Research", "Debates", "Language Learning", 
    "Literature", "Physics", "Mathematics", "Chemistry", "Biology", 
    "History", "Philosophy"
  ],
  "Games & Recreation": [
    "Video Games", "Board Games", "Chess", "Card Games", 
    "Puzzle Solving", "Esports", "Role-playing Games"
  ],
  "Outdoor & Adventure": [
    "Hiking", "Camping", "Fishing", "Rock Climbing", "Kayaking", 
    "Biking", "Bird Watching", "Photography", "Traveling"
  ],
  "Social & Community": [
    "Volunteering", "Cultural Clubs", "Environmental Groups", 
    "Social Justice", "Debate Teams", "Public Speaking", "Events Planning"
  ]
};

// Collaboration preferences
export const collaborationTypes = [
  "Study Partners", 
  "Project Collaborators", 
  "Workout Buddies",
  "Practice Partners",
  "Mentorship", 
  "Team Members",
  "Casual Meetups", 
  "Skill Exchange"
];