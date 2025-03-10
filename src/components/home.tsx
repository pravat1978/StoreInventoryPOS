import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <p>Redirecting to login...</p>
    </div>
  );
}

export default Home;
