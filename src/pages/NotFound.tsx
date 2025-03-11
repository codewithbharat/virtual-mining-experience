
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      
      <main className="pt-20 pb-24 min-h-screen gradient-bg flex items-center justify-center">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <div className="glass-card rounded-xl p-8 md:p-12 max-w-lg mx-auto animate-scale-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-mining-default">404</h1>
            <p className="text-lg md:text-xl mb-6 text-gray-600 dark:text-gray-300">
              Oops! The page you're looking for doesn't exist.
            </p>
            <Link
              to="/"
              className="inline-block bg-mining-default hover:bg-mining-dark text-white font-medium px-5 py-2 rounded-lg transition-all duration-300"
            >
              Return to Mining
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
