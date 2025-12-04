import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <h1 className="font-display text-8xl md:text-9xl font-bold text-gradient">404</h1>
            <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like this route doesn't exist. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" asChild>
              <Link to="/">
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
