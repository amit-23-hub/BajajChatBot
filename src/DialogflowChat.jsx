import { useEffect, useState } from "react";

const DialogflowChat = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const scriptUrl = "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";

    // Check if script already exists
    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.onload = () => setIsScriptLoaded(true); // Mark script as loaded
      document.body.appendChild(script);
    } else {
      setIsScriptLoaded(true);
    }
  }, []);

  if (!isScriptLoaded) return null; // Wait for script to load before rendering

  return (
    <df-messenger
      project-id="bajajbotravi"
      agent-id="33597351-07ab-4638-addd-fe1bda397df0"
      language-code="en"
      max-query-length="-1"
      allow-feedback="all"
      style={{
        zIndex: 999,
        position: "fixed",
        bottom: "16px",
        right: "16px",
        "--df-messenger-font-color": "#000",
        "--df-messenger-font-family": "Google Sans",
        "--df-messenger-chat-background": "#f3f6fc",
        "--df-messenger-message-user-background": "#d3e3fd",
        "--df-messenger-message-bot-background": "#fff",
      }}
    >
      <df-messenger-chat-bubble chat-title="BajajBP"></df-messenger-chat-bubble>
    </df-messenger>
  );
};

export default DialogflowChat;
