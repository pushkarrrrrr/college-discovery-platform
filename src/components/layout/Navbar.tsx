"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCompareStore } from "@/store/useCompareStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import {
  School,
  GitCompare,
  Bookmark,
  User,
  LogOut,
  Menu,
  X,
  LogIn
} from "lucide-react";

import { useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  
  // NextAuth Session Hooks
  const { data: session, status } = useSession();
  const nextAuthUser = session?.user;
  const nextAuthIsAuthenticated = status === "authenticated";

  // Zustand State Hooks
  const selectedColleges = useCompareStore((state) => state.selectedColleges);
  const { savedCollegeIds, syncSessionUser } = useAuthStore();

  // Sync session with Zustand store for saved list badges
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      syncSessionUser(session.user.email, session.user.name);
    } else if (status === "unauthenticated") {
      syncSessionUser(null);
    }
  }, [session, status, syncSessionUser]);

  interface NavLink {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | null;
    protected?: boolean;
  }

  const navLinks: NavLink[] = [
    { name: "Explore Colleges", href: "/colleges", icon: School },
    { name: "Compare", href: "/compare", icon: GitCompare, badge: selectedColleges.length },
    { name: "Saved", href: "/saved", icon: Bookmark, badge: nextAuthIsAuthenticated ? savedCollegeIds.length : null, protected: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary transition-opacity hover:opacity-90" aria-label="EduDiscover Home">
            <School className="h-6 w-6 stroke-[2]" aria-hidden="true" />
            <span>EduDiscover</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            // Hide protected links if not authenticated (or show disabled/login state)
            if (link.protected && (!mounted || !nextAuthIsAuthenticated)) return null;

            const ariaLabel = typeof link.badge === "number" && link.badge > 0
              ? `${link.name} (${link.badge} items)`
              : link.name;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-label={ariaLabel}
                className={`relative flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{link.name}</span>
                {typeof link.badge === "number" && link.badge > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-pulse" aria-hidden="true">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          {!mounted ? (
            <div className="w-[100px] h-8 rounded-lg bg-accent/40 animate-pulse border border-border/40" />
          ) : nextAuthIsAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground border border-border">
                  <User className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground leading-none">{nextAuthUser?.name}</span>
                  <span className="text-[10px] leading-tight">{nextAuthUser?.email}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut({ callbackUrl: "/" })}
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="h-4 w-4 text-muted-foreground hover:text-destructive" aria-hidden="true" />
              </Button>
            </div>
          ) : (
            <Button size="sm" className="gap-1.5 cursor-pointer" render={<Link href={`/login?callbackUrl=${pathname}`} aria-label="Sign in to your account" />}>
              <LogIn className="h-4 w-4" aria-hidden="true" />
              <span>Sign In</span>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 py-4 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              if (link.protected && (!mounted || !nextAuthIsAuthenticated)) return null;

              const ariaLabel = typeof link.badge === "number" && link.badge > 0
                ? `${link.name} (${link.badge} items)`
                : link.name;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label={ariaLabel}
                  className={`flex items-center justify-between rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                    isActive ? "bg-accent text-accent-foreground font-semibold" : "text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{link.name}</span>
                  </div>
                  {typeof link.badge === "number" && link.badge > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground" aria-hidden="true">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          
          <hr className="border-border" />
          
          {!mounted ? (
            <div className="w-full h-8 rounded-lg bg-accent/40 animate-pulse border border-border/40" />
          ) : nextAuthIsAuthenticated ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground border border-border">
                  <User className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground leading-none">{nextAuthUser?.name}</span>
                  <span className="text-[10px] text-muted-foreground leading-tight">{nextAuthUser?.email}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setMobileMenuOpen(false);
                }}
                className="gap-1.5 text-muted-foreground hover:text-destructive"
                aria-label="Sign Out"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span>Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button size="sm" className="w-full gap-1.5 cursor-pointer" render={<Link href={`/login?callbackUrl=${pathname}`} onClick={() => setMobileMenuOpen(false)} className="w-full" aria-label="Sign in to your account" />}>
              <LogIn className="h-4 w-4" aria-hidden="true" />
              <span>Sign In</span>
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
