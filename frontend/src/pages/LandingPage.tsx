import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import GreenStepsLogo from "../assets/GreenSteps-removebg-preview.png";

export const LandingPage = () => {
  // Only use MP4 files for better browser compatibility
  const videos = ["/video1.mp4", "/video2.mp4"];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 7000); // Change video every 12 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      {!videoError ? (
        <video
          key={currentVideoIndex} // This key forces re-render when video changes
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          onError={(e) => {
            console.log("Video error:", e);
            setVideoError(true);
          }}
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        // Fallback background if video fails
        <div
          className="absolute top-0 left-0 w-full h-full z-0"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        ></div>
      )}

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <div className="ml-20vw mr-20vw mt-2vh mb-6">
          <div
            className="ml-10vw mr-10vw p-8 rounded-2xl flex items-center flex-col backdrop-blur-sm"
            style={{ backgroundColor: "rgba(16, 25, 53, 0.8)" }}
          >
            <div className="">
              <h1 className="text-2xl text-white pb-2 font-extrabold">
                Welcome to Greensteps
              </h1>
              <p className="text-white font-bold text-xl">
                The Greensteps application will help you imporove your daily
                life goals for climate change, rigister now and become the
                climate hero you deserve to be
              </p>
            </div>
            <img src={GreenStepsLogo} alt="GreenSteps logo" className="w-sm" />
            <p className="text-white font-extrabold text-xl pb-3">
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
              Log in
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
