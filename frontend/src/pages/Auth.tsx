import logo from "../assets/GreenSteps-removebg-preview.png";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      const response = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        credentials: 'include', // Allow cookies to be sent/received
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential })
      });
      const data = await response.json();
      console.log("Login successful:", data);
      
      navigate('/app/dashboard');

    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img src={logo} alt="logo"></img>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Continue your green journey
          </p>
        </div>
        <div>
          <GoogleLogin 
            onSuccess={handleGoogleLogin} 
            onError={() => {console.log("Log in Failed")}}
          />
        </div>
      </div>
    </div>
  );
};
