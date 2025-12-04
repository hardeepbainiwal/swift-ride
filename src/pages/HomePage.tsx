import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { StepCard } from "@/components/ui/StepCard";
import { StatCard } from "@/components/ui/StatCard";
import { Layout } from "@/components/layout/Layout";
import {
  MapPin,
  Shield,
  Zap,
  Clock,
  DollarSign,
  Star,
  Users,
  Car,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Real-Time Tracking",
    description: "Track your ride in real-time from pickup to destination with precise GPS technology.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Verified drivers, emergency SOS button, and trip sharing with loved ones.",
  },
  {
    icon: Zap,
    title: "Quick Matching",
    description: "Our smart algorithm finds the nearest driver within seconds.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Know your fare upfront. No hidden charges, no surge surprises.",
  },
  {
    icon: Clock,
    title: "24/7 Available",
    description: "Rides available round the clock, rain or shine, day or night.",
  },
  {
    icon: Star,
    title: "Rated Drivers",
    description: "Choose from highly-rated drivers with verified reviews and credentials.",
  },
];

const steps = [
  {
    title: "Set Your Location",
    description: "Enter your pickup and drop-off points on the map. GPS auto-detects your current location.",
  },
  {
    title: "Choose Your Ride",
    description: "Select from Economy, Comfort, Express, or Premium based on your needs and budget.",
  },
  {
    title: "Get Matched",
    description: "Our algorithm finds the nearest available driver and connects you instantly.",
  },
  {
    title: "Track & Arrive",
    description: "Watch your driver approach in real-time. Rate your experience after the trip.",
  },
];

const stats = [
  { value: "10M+", label: "Happy Riders" },
  { value: "500K+", label: "Active Drivers" },
  { value: "50+", label: "Cities Covered" },
  { value: "4.9", label: "Average Rating" },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-6 animate-slide-down">
                <Zap className="w-4 h-4 text-primary" />
                <span>Fast, Safe & Reliable Rides</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
                Your Ride,{" "}
                <span className="text-gradient">Just a Tap Away</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
                Experience seamless urban mobility with real-time tracking, transparent pricing, and thousands of verified drivers ready to take you anywhere.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: "200ms" }}>
                <Button variant="hero" size="xl" asChild>
                  <Link to="/book">
                    Book a Ride
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="glass" size="xl" asChild>
                  <Link to="/driver">
                    Become a Driver
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "400ms" }}>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-semibold text-muted-foreground"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">From 10,000+ reviews</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: "3s" }} />
                <div className="absolute inset-8 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: "3s", animationDelay: "0.5s" }} />
                <div className="absolute inset-16 rounded-full border border-primary/40 animate-ping" style={{ animationDuration: "3s", animationDelay: "1s" }} />
                
                {/* Center car icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-3xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 animate-float">
                    <Car className="w-16 h-16 text-primary-foreground" />
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute top-8 right-0 p-4 rounded-xl glass animate-float" style={{ animationDelay: "0.5s" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">ETA</p>
                      <p className="font-display font-bold text-foreground">3 min</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-0 p-4 rounded-xl glass animate-float" style={{ animationDelay: "1s" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Driver Found</p>
                      <p className="font-display font-bold text-foreground">Alex K.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose <span className="text-gradient">SwiftRide</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've built a platform that prioritizes your safety, comfort, and convenience at every step of your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It <span className="text-gradient">Works</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Getting a ride has never been easier. Follow these simple steps and you'll be on your way in minutes.
              </p>

              <div className="space-y-2">
                {steps.map((step, index) => (
                  <StepCard key={index} step={index + 1} {...step} />
                ))}
              </div>
            </div>

            {/* App mockup placeholder */}
            <div className="relative hidden lg:block">
              <div className="w-72 h-[580px] mx-auto rounded-[3rem] border-4 border-border bg-card p-3 shadow-2xl">
                <div className="w-full h-full rounded-[2.5rem] bg-secondary overflow-hidden relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-card rounded-b-xl" />
                  <div className="p-6 pt-10">
                    <div className="w-full h-40 rounded-xl bg-muted mb-4" />
                    <div className="space-y-3">
                      <div className="h-12 rounded-lg bg-muted" />
                      <div className="h-12 rounded-lg bg-muted" />
                    </div>
                    <div className="mt-6 h-14 rounded-xl bg-primary/20" />
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="h-20 rounded-lg bg-muted" />
                      <div className="h-20 rounded-lg bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl glass p-8 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Get Moving?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join millions of riders who trust SwiftRide for their daily commute. Download the app or book directly from our website.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/book">
                    Book Your First Ride
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/driver">
                    <Users className="w-5 h-5" />
                    Drive With Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
