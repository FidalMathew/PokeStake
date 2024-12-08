import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { Button } from "./components/ui/button";
import useGlobalContext from "./context/useGlobalContext";
import { useEffect, useState } from "react";
import { useOkto } from "okto-sdk-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  // const {  } = useGlobalContext();
  const { authenticate, createWallet } = useOkto()!;

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    authenticate(
      idToken!,
      (authResponse: { auth_token: string } | null, error: any) => {
        if (authResponse) {
          setAuthToken(authResponse.auth_token);
          console.log(
            "Authenticated successfully, auth token:",
            authResponse.auth_token
          );
        } else if (error) {
          console.error("Authentication error:", error);
        }
      }
    );
  };

  const [authToken, setAuthToken] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate("/game");
    }
  }, [authToken]);

  return (
    <div className="relative bg-gradient-to-r from-red-500 to-yellow-500 text-white overflow-hidden h-screen">
      {/* Left SVG */}
      <svg
        className="absolute left-0 top-0 h-full w-1/4 text-red-600 opacity-20"
        fill="currentColor"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <circle cx="0" cy="0" r="50" />
        <circle cx="100" cy="100" r="50" />
      </svg>

      {/* Right SVG */}
      <svg
        className="absolute right-0 bottom-0 h-full w-1/4 text-yellow-600 opacity-20"
        fill="currentColor"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <circle cx="100" cy="0" r="50" />
        <circle cx="0" cy="100" r="50" />
      </svg>

      {/* Overlaying Text */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent text-center py-4">
        <h2 className="text-2xl font-bold tracking-wider">
          Discover the World of Pokémon
        </h2>
      </div>

      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to PokéExplorer
          </h1>
          <p className="text-xl mb-6">
            Embark on a journey to explore, discover, and learn about your
            favorite Pokémon
          </p>
          <Button size="lg" variant="secondary">
            Start Your Adventure
          </Button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://media1.giphy.com/media/nAkHcWhKAKYpgmL8Df/200.webp?cid=790b76110xxxqsb0iyxew9ikrxlwpo3j8nk3d8hu0yr3sr6u&ep=v1_gifs_search&rid=200.webp&ct=g"
            alt="Pikachu"
            className="w-full max-w-md rounded-full border-4 border-white shadow-lg"
          />

          <h1>Login</h1>
          {!authToken ? (
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.error("Login Failed")}
            />
          ) : (
            <p>Authenticated</p>
          )}
        </div>
      </div>
    </div>
  );
}
