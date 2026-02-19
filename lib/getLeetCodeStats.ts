export async function getLeetCodeStats(username: string) {
  // Verified fallback data based on your 200+ DSA achievements
  const resumeFallback = {
    isLive: false,
    status: "success",
    totalSolved: 200, 
    easySolved: 75,
    mediumSolved: 100,
    hardSolved: 25,
    totalQuestions: 3300,
  };

  // --- THE TIMEOUT FIX ---
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000); // 2-second limit

  try {
    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, {
      signal: controller.signal, // Connect the signal to the fetch
      next: { revalidate: 3600 }, 
    });
    
    // Clear the timeout if the fetch succeeds before the 2s limit
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn("LeetCode API returned an error, using fallback.");
      return resumeFallback;
    }
    
    const data = await response.json();
    return { ...data, isLive: true };

  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.warn("LeetCode API request timed out after 2s. Reverting to fallback.");
    } else {
      console.error("Network error fetching LeetCode stats:", error);
    }
    return resumeFallback;
  }
}