import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import GreenStepsLogo from "../assets/GreenSteps-removebg-preview.png";

export const LandingPage = () => {
  const videos = ["/video1.mp4", "/video2.mp4", "/video3.mp4"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const currentVideo = document.getElementById(`video-${activeIndex}`) as HTMLVideoElement;
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play();
    }
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 7000); // Change video every 7 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {!videoError ? (
        <div className="absolute top-0 left-0 w-full h-full">
          {videos.map((videoSrc, index) => (
            <video
              id={`video-${index}`}
              key={index}
              className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
              style={{ 
                opacity: activeIndex === index ? 1 : 0,
                zIndex: activeIndex === index ? 1 : 0
              }}
              muted
              playsInline
              preload="auto"
              onError={(e) => {
                console.log("Video error:", e);
                setVideoError(true);
              }}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      ) : (
        // Fallback background if video fails
        <div
          className="absolute top-0 left-0 w-full h-full z-0"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        ></div>
      )}

      <div className="relative z-20 flex items-center justify-center min-h-screen">
          <div
            className="ml-10vw mr-10vw rounded-2xl flex items-center flex-col backdrop-blur-sm w-110 p-8"
            style={{ backgroundColor: "rgba(16, 25, 53, 0.8)" }}
          >
              <h1 className="text-3xl text-white pb-2 font-extrabold text-center">
                Welcome to <span className="text-3xl text-green-600">GREENSTEPS</span>
              </h1>
            <img src={GreenStepsLogo} alt="GreenSteps logo" className="w-sm pb-2" />
              <p className="text-white font-bold text-xl text-center pb-8">
                Track your emissions from transport, food and shopping. Start your journey toward greener habits, one step at a time
              </p>
            <p className="text-white font-extrabold text-s pb-3 text-center">
              Take your First step in the right direction
            </p>
            <NavLink
              to={"/auth"}
              className={({ isActive }) =>
                isActive
                  ? "text-white text-2xl font-semibold bg-blue-900 px-8 py-3 rounded-lg transition-all duration-300 ease-in-out"
                  : "text-white text-2xl px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 ease-in-out"
              }
            >
              Sign up/Log in
            </NavLink>
          </div>
        </div>
    </div>
  );
};
