import { GITHUB_CONFIG } from '../../config/github.config.js';

export const initiateGitHubOAuth = () => {
  const params = new URLSearchParams({
    client_id: GITHUB_CONFIG.clientId,
    redirect_uri: GITHUB_CONFIG.redirectUri,
    scope: GITHUB_CONFIG.scope,
    state: generateRandomState()
  });

  const authUrl = `${GITHUB_CONFIG.authUrl}?${params.toString()}`;
  window.location.href = authUrl;
};

export const handleOAuthCallback = async (code) => {
  try {
    const response = await fetch("http://localhost:5000/auth/github", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    });

    const data = await response.json();

    if (data.access_token) {
      return data.access_token;
    } else {
      throw new Error("Failed to obtain access token");
    }
  } catch (error) {
    console.error("OAuth callback error:", error);
    throw error;
  }
};


function generateRandomState() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export const logout = () => {
  sessionStorage.removeItem('github_token');
  sessionStorage.removeItem('github_user');
};
