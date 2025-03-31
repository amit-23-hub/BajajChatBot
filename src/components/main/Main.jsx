import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";
import Typewriter from "typewriter-effect";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleCardClick = (promptText) => {
    setInput(promptText);
  };

  const cardData = [
    {
      title: "Explain the latest tax-saving policies in India",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
      icon: assets.compass_icon,
    },
    {
      title: "Compare fixed deposits and mutual funds",
      image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6",
      icon: assets.message_icon,
    },
    {
      title: "How does inflation impact personal savings?",
      image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9",
      icon: assets.bulb_icon,
    },
    {
      title: "Steps to create a financial budget for 2024",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
      icon: assets.code_icon,
    },
    {
      title: "Steps to create a financial budget for 2024",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
      icon: assets.code_icon,
    },{
      title: "Steps to create a financial budget for 2024",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
      icon: assets.code_icon,
    },
  ];

  return (
    <div className="main">
      <div className="nav">
        <p>Bajaj AI</p>
        <img src={assets.user} alt="" />
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>
                  <Typewriter
                    options={{
                      strings: ["Hello, Amit "],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </span>
              </p>
              <p>How Can I Assist You with Financial Policies today?</p>
            </div>
            <div className="cards">
              {cardData.map((card, index) => (
                <div
                  key={index}
                  className="card"
                  onClick={() => handleCardClick(card.title)}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="card-image"
                  />
                  <p>{card.title}</p>
                  <img src={card.icon} alt="" className="card-icon" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;