

import { GoogleGenerativeAI } from "@google/generative-ai";

const config = {
  client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  project_id: import.meta.env.VITE_GOOGLE_PROJECT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET
};

async function getAccessToken() {
  try {
    const response = await fetch(config.token_uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: config.client_id,
        client_secret: config.client_secret,
        redirect_uri: 'http://localhost:5175/',
        code: '', // You'll need to implement OAuth flow to get this authorization code
        scope: 'https://www.googleapis.com/auth/dialogflow'
      })
    });

    if (!response.ok) {
      throw new Error(`Token error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

async function runChat(prompt) {
  try {
    const accessToken = await getAccessToken();
    const sessionId = Date.now().toString();
    
    const response = await fetch(`https://dialogflow.googleapis.com/v2/projects/${config.project_id}/agent/sessions/${sessionId}:detectIntent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        queryInput: {
          text: {
            text: prompt,
            languageCode: 'en'
          }
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Dialogflow API error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("resp from dialogflow", data);
    
    if (!data.queryResult || !data.queryResult.fulfillmentText) {
      throw new Error('Invalid response format from Dialogflow');
    }
    
    return data.queryResult.fulfillmentText;
    
  } catch (error) {
    console.error('Error in runChat:', error);
    return 'Sorry, I encountered an error processing your request. Please try again later.';
  }
}

export default runChat;