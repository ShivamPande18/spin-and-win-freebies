import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
      <div className="text-center">
        <div className="text-8xl mb-8">🎯</div>
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! This page doesn't exist</p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-gradient-primary text-primary-foreground font-semibold rounded-2xl hover:scale-105 transition-all duration-300 shadow-glow"
        >
          Return to Spin & Win
        </a>
      </div>
    </div>
  );
};

export default NotFound;
