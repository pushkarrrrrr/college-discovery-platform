import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Search,
  GitCompare,
  Bookmark,
  TrendingUp,
  MapPin,
  Award
} from "lucide-react";

export default function Home() {
  const stats = [
    { value: "100+", label: "Top Cities", icon: MapPin },
    { value: "500+", label: "Verified Programs", icon: Award },
    { value: "18.5 LPA", label: "Average Top Package", icon: TrendingUp },
  ];

  const features = [
    {
      title: "Smart Search & Filters",
      description: "Instantly search colleges by location, maximum annual fees, program type, and student ratings.",
      icon: Search,
      color: "bg-[#FBB4A5]/20 text-[#A63B26] dark:bg-[#FBB4A5]/10 dark:text-[#FBB4A5]",
    },
    {
      title: "Side-by-Side Comparison",
      description: "Directly compare fees, courses, placements, and reviews of up to 3 colleges to find the best match.",
      icon: GitCompare,
      color: "bg-[#FB9EC6]/20 text-[#B83E71] dark:bg-[#FB9EC6]/10 dark:text-[#FB9EC6]",
    },
    {
      title: "Shortlist Favorites",
      description: "Save colleges of interest to your profile to track eligibility requirements and placement news.",
      icon: Bookmark,
      color: "bg-[#FFE893]/25 text-[#8B6700] dark:bg-[#FFE893]/10 dark:text-[#FFE893]",
    },
  ];

  return (
    <div className="flex flex-col gap-16 py-12 md:py-20">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary animate-fade-in">
          <span>Track B — Internship Assignment MVP</span>
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
          Find Your Perfect College. <br />
          <span className="bg-gradient-to-r from-primary to-[#FBB4A5] bg-clip-text text-transparent">
            Compare with Certainty.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Explore and filter top universities, courses, fees, and placements in India. Analyze institutions side-by-side to make data-backed academic decisions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <Link href="/colleges" className="w-full sm:w-auto">
            <Button size="lg" className="w-full gap-2 text-base font-semibold shadow-md">
              <Search className="h-5 w-5" />
              <span>Explore Colleges</span>
            </Button>
          </Link>
          <Link href="/compare" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full gap-2 text-base font-semibold">
              <GitCompare className="h-5 w-5" />
              <span>Compare Side-by-Side</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border py-12 bg-card/30 backdrop-blur-sm rounded-2xl px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground border border-border">
                  <Icon className="h-5 w-5 stroke-[1.5]" />
                </div>
                <span className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</span>
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Grid */}
      <section className="flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">Platform Capabilities</h2>
          <p className="text-sm text-muted-foreground">
            A production-ready set of tools helping students find engineering and management courses.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}>
                  <Icon className="h-6 w-6 stroke-[2]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
