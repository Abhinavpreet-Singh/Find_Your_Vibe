import { collection, query, orderBy, limit, getDocs, getDoc, doc, where, getCountFromServer } from 'firebase/firestore';
import { db } from './config';

/**
 * Service to handle leaderboard functionality while respecting Firestore security rules
 */
export const leaderboardService = {
  /**
   * Get top users from leaderboard with current user rank
   * @param {string} currentUserId - The current user's ID
   * @param {number} topCount - Number of top users to fetch (default: 10)
   * @returns {Promise<{topUsers: Array, currentUserRank: number, totalUsers: number}>}
   */
  getLeaderboard: async (currentUserId, topCount = 10) => {
    try {
      // Get all users ordered by score
      const usersRef = collection(db, 'users');
      const totalUsersSnapshot = await getCountFromServer(usersRef);
      const totalUsers = totalUsersSnapshot.data().count;
      
      // Get top users
      const topQuery = query(usersRef, orderBy('totalScore', 'desc'), limit(topCount));
      const topSnapshot = await getDocs(topQuery);
      
      const topUsers = topSnapshot.docs.map((doc, index) => ({
        id: doc.id,
        rank: index + 1,
        displayName: doc.data().nickname || 'Anonymous',
        score: doc.data().totalScore || 0,
        photoURL: doc.data().profileImageUrl || null
      }));
      
      // Find current user's rank
      let currentUserRank = null;
      let currentUserData = null;
      
      // Check if current user is in top users
      const currentUserInTop = topUsers.find(user => user.id === currentUserId);
      
      if (currentUserInTop) {
        currentUserRank = currentUserInTop.rank;
      } else if (currentUserId) {
        // If not in top, get current user's data and determine their rank
        const currentUserDoc = await getDoc(doc(db, 'users', currentUserId));
        
        if (currentUserDoc.exists()) {
          currentUserData = currentUserDoc.data();
          const currentUserScore = currentUserData.totalScore || 0;
          
          // Query to count users with higher scores
          const higherScoresQuery = query(
            usersRef, 
            where('totalScore', '>', currentUserScore)
          );
          const higherScoresSnapshot = await getDocs(higherScoresQuery);
          
          // User's rank is the number of users with higher scores + 1
          currentUserRank = higherScoresSnapshot.size + 1;
        }
      }
      
      return {
        topUsers,
        currentUserRank,
        totalUsers
      };
    } catch (error) {
      console.error("Error in leaderboard service:", error);
      throw error;
    }
  },
  
  /**
   * Get all users for complete leaderboard 
   * @param {number} limit - Optional limit for number of users to fetch
   * @returns {Promise<Array>} Array of users sorted by score
   */
  getAllUsersRanked: async (limitCount = 100) => {
    try {
      console.log("Starting getAllUsersRanked with limit:", limitCount);
      
      // Check if we can access the users collection
      const usersRef = collection(db, 'users');
      const countSnapshot = await getCountFromServer(usersRef);
      const totalCount = countSnapshot.data().count;
      console.log(`Found ${totalCount} total users in collection`);

      if (totalCount === 0) {
        console.log("No users found in the collection");
        return []; // Return empty array if no users
      }
      
      // Query users ordered by totalScore instead of score
      const q = query(usersRef, orderBy('totalScore', 'desc'), limit(limitCount));
      const querySnapshot = await getDocs(q);
      
      console.log(`Query returned ${querySnapshot.size} documents`);
      
      // If no results, try without ordering to see if the collection works
      if (querySnapshot.empty) {
        console.log("No ranked users found with totalScore ordering, checking if collection is accessible");
        const basicQuery = query(usersRef, limit(5));
        const basicSnapshot = await getDocs(basicQuery);
        console.log(`Basic query returned ${basicSnapshot.size} documents`);
        
        // If we get results here, then users don't have scores
        if (!basicSnapshot.empty) {
          console.log("Collection is accessible but users might not have totalScore field");
        }
      }
      
      // Map documents to user objects with rank
      const rankedUsers = querySnapshot.docs.map((doc, index) => {
        const data = doc.data();
        console.log(`User ${doc.id} has score:`, data.totalScore);
        return {
          id: doc.id,
          rank: index + 1,
          displayName: data.nickname || 'Anonymous',
          score: data.totalScore || 0,
          photoURL: data.profileImageUrl || null
        };
      });
      
      console.log(`Returning ${rankedUsers.length} ranked users`);
      return rankedUsers;
    } catch (error) {
      console.error("Error getting all users ranked:", error);
      console.error("Error details:", error.code, error.message);
      
      // Try a simpler query as fallback
      try {
        console.log("Attempting fallback query without ordering");
        const usersRef = collection(db, 'users');
        const fallbackQuery = query(usersRef, limit(limitCount));
        const fallbackSnapshot = await getDocs(fallbackQuery);
        
        // Create basic ranking for fallback results
        const fallbackUsers = fallbackSnapshot.docs
          .map(doc => ({
            id: doc.id,
            displayName: doc.data().nickname || 'Anonymous',
            score: doc.data().totalScore || 0,
            photoURL: doc.data().profileImageUrl || null
          }))
          .sort((a, b) => b.score - a.score)
          .map((user, index) => ({...user, rank: index + 1}));
          
        console.log(`Fallback returned ${fallbackUsers.length} users`);
        return fallbackUsers;
      } catch (fallbackError) {
        console.error("Fallback query also failed:", fallbackError);
        throw error; // Throw the original error
      }
    }
  }
};