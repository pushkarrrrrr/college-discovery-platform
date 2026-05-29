"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { School, Loader2, Mail, User as UserIcon, ShieldCheck } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const rawCallback = searchParams.get("callbackUrl") || "/saved";
  
  // Validate redirect callback target to prevent Open Redirect vulnerabilities
  const cleanCallbackUrl = (url: string) => {
    if (url.startsWith("/") && !url.startsWith("//")) return url;
    return "/saved";
  };
  const callbackUrl = cleanCallbackUrl(rawCallback);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(callbackUrl);
    }
  }, [isAuthenticated, router, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        name,
        email,
        password: "password123", // mock password
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setError("Failed to sign in. Please try again.");
        setLoading(false);
      } else {
        router.replace(callbackUrl);
      }
    } catch {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  const handleSocialMockLogin = async (provider: string) => {
    setLoading(true);
    setError("");
    
    try {
      await signIn("credentials", {
        name: `Mock ${provider} Student`,
        email: `student@${provider.toLowerCase()}.com`,
        password: "password123",
        redirect: false,
        callbackUrl,
      });
      router.replace(callbackUrl);
    } catch {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-border/80 bg-card/75 backdrop-blur-md shadow-xl overflow-hidden animate-fade-in relative z-10">
      {/* Visual Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-[#FBB4A5] to-[#FFE893]" />
      
      <CardHeader className="space-y-1.5 pt-6 pb-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-3">
          <School aria-hidden="true" className="h-6 w-6 stroke-[2]" />
        </div>
        <CardTitle className="text-2xl font-extrabold tracking-tight">Welcome back</CardTitle>
        <CardDescription className="text-xs">
          Sign in to access saved shortlists and application pipelines.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {error && (
            <div role="alert" className="p-3 text-xs font-bold text-destructive bg-destructive/10 border border-destructive/20 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="name" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <UserIcon aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Mercer"
                disabled={loading}
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-background text-sm font-semibold placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.mercer@internship.edu"
                disabled={loading}
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-background text-sm font-semibold placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 transition-all"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-10 font-bold gap-1.5 mt-2">
            {loading ? (
              <>
                <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Continue with Email</span>
            )}
          </Button>
        </form>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
            <span className="bg-card px-3 text-muted-foreground">Or connect with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => handleSocialMockLogin("Google")}
            className="h-10 text-xs border-border/80 hover:bg-accent/40 font-bold gap-1.5 cursor-pointer"
          >
            <svg aria-hidden="true" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span>Google</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => handleSocialMockLogin("GitHub")}
            className="h-10 text-xs border-border/80 hover:bg-accent/40 font-bold gap-1.5 cursor-pointer"
          >
            <svg aria-hidden="true" className="h-4 w-4 mr-1 text-foreground" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span>GitHub</span>
          </Button>
        </div>
      </CardContent>

      <CardFooter className="pb-6 pt-2 justify-center border-t border-border/30 bg-accent/5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <ShieldCheck aria-hidden="true" className="h-4 w-4 text-emerald-500" />
          <span>Demo Authentication Environment</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-8 relative">
      {/* Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/15 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-[#FBB4A5]/20 rounded-full blur-3xl -z-10" />

      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center p-8 bg-card border border-border rounded-2xl w-full max-w-md h-[400px]">
            <Loader2 aria-hidden="true" className="h-8 w-8 text-primary animate-spin" />
            <p className="text-xs text-muted-foreground mt-3 font-semibold">Loading portal...</p>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
