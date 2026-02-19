export async function getGithubRepos() {
  const username = "Kunjsoni2505";
  
  // 🛰️ The Expanded "Heavy Hitters" list
  const FEATURED_NAMES = [
    "Sentiment_Analyzer",
    "Advanced-sorting-visualizer",
    "Ai_chatbot-", 
    "SpringBoot_Project",
    "ethareal_canvas",
    "order-management",
    "youtube_helper_chrome_extension_BACKEND",
    "youtube_helper_chrome_extension_FRONTEND",
    "text_summerizer",
    "Student-performance-prediction",
    "movie-recommend-system",
    "Analysis-and-visualization-on-video-game-sales",
    "Spam-Filtering"
  ];

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        Authorization: process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : "",
      },
      next: { revalidate: 3600 } 
    });

    if (!response.ok) return [];

    const repos = await response.json();

    // 1. Filter and Map
    return repos
      .filter((repo: any) => !repo.fork && FEATURED_NAMES.includes(repo.name))
      .map((repo: any) => {
        // --- 🛰️ SYSTEM OVERRIDE: Force Render link for Sentiment Analysis ---
        let finalLiveLink = repo.homepage;
        if (repo.name === "Sentiment_Analyzer") {
          finalLiveLink = "https://sentiment-analyzer-2h3q.onrender.com";
        }

        return {
          id: repo.id,
          name: repo.name,
          title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
          description: repo.description,
          githubLink: repo.html_url,
          liveLink: finalLiveLink,
          topics: repo.topics || [], 
          stars: repo.stargazers_count,
          updatedAt: repo.updated_at,
          language: repo.language
        };
      })
      // 2. Custom Sort: Featured order first, then by stars
      .sort((a: any, b: any) => {
        const indexA = FEATURED_NAMES.indexOf(a.name);
        const indexB = FEATURED_NAMES.indexOf(b.name);
        return indexA - indexB;
      });
  } catch (error) {
    console.error("Critical GitHub sync error:", error);
    return [];
  }
}