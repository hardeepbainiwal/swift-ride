import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/ui/StatCard";
import { Shield, Target, Users, Heart, Award, Globe } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Every driver is background-checked and every trip is monitored in real-time.",
  },
  {
    icon: Target,
    title: "Reliability",
    description: "We commit to getting you where you need to be, on time, every time.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a network where riders and drivers thrive together.",
  },
  {
    icon: Heart,
    title: "Care",
    description: "We genuinely care about every person who uses our platform.",
  },
];

const milestones = [
  { year: "2020", title: "Founded", description: "SwiftRide was born with a mission to transform urban mobility." },
  { year: "2021", title: "First Million", description: "Reached 1 million rides completed across 10 cities." },
  { year: "2022", title: "Driver First", description: "Launched industry-leading driver benefits program." },
  { year: "2023", title: "Global Expansion", description: "Expanded to 50+ cities worldwide." },
  { year: "2024", title: "AI Integration", description: "Introduced AI-powered matching for faster pickups." },
];

const team = [
  { name: "Sarah Chen", role: "CEO & Co-founder", initial: "SC" },
  { name: "Marcus Johnson", role: "CTO", initial: "MJ" },
  { name: "Elena Rodriguez", role: "COO", initial: "ER" },
  { name: "David Kim", role: "VP of Engineering", initial: "DK" },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Moving Cities <span className="text-gradient">Forward</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              SwiftRide is more than a ride-hailing platform. We're on a mission to make urban transportation safe, affordable, and sustainable for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value="10M+" label="Rides Completed" />
            <StatCard value="500K+" label="Active Drivers" />
            <StatCard value="50+" label="Cities" />
            <StatCard value="$2B+" label="Driver Earnings" />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  SwiftRide began in 2020 when our founders experienced firsthand the frustration of unreliable transportation. Long wait times, unclear pricing, and safety concerns were the norm.
                </p>
                <p>
                  We set out to build something different — a platform where technology serves people, not the other way around. Where drivers earn fair wages and riders get to their destinations safely.
                </p>
                <p>
                  Today, we're proud to serve millions of riders and provide income for hundreds of thousands of drivers across 50+ cities worldwide. But we're just getting started.
                </p>
              </div>
            </div>
            
            {/* Timeline */}
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="flex-1 w-px bg-gradient-to-b from-primary/50 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="text-sm text-primary font-semibold">{milestone.year}</p>
                    <h3 className="font-display font-bold text-foreground">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="p-6 rounded-2xl glass text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Leadership <span className="text-gradient">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the people driving SwiftRide's mission forward.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="p-6 rounded-2xl glass text-center group hover:-translate-y-1 transition-transform">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-primary font-display text-xl font-bold group-hover:bg-primary/30 transition-colors">
                  {member.initial}
                </div>
                <h3 className="font-display font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Available in 50+ Cities Worldwide
            </h2>
            <p className="text-muted-foreground mb-8">
              From New York to Tokyo, London to São Paulo — SwiftRide is connecting cities and communities around the globe.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["New York", "Los Angeles", "London", "Tokyo", "Paris", "Sydney", "Toronto", "Singapore"].map((city) => (
                <span key={city} className="px-4 py-2 rounded-full bg-secondary text-sm text-foreground">
                  {city}
                </span>
              ))}
              <span className="px-4 py-2 rounded-full bg-primary/10 text-sm text-primary font-semibold">
                +42 more
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
