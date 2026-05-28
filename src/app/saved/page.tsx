"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/store/useAuthStore";
import { CollegeService } from "@/services/api";
import { College } from "@/types";
import { Button } from "@/components/ui/button";
import { Bookmark, ShieldAlert, LogIn, Trash2, ArrowRight } from "lucide-react";

export default function SavedPage() {
  const { data: session, status } = useSession();
  const nextAuthIsAuthenticated = status === "authenticated";

  const { savedCollegeIds, toggleSaveCollege, syncSessionUser } = useAuthStore();
  const [savedColleges, setSavedColleges] = useState<College[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Sync NextAuth session with store for correct namespaced shortlist retrieval
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      syncSessionUser(session.user.email, session.user.name);
    }
  }, [session, status, syncSessionUser]);

  useEffect(() => {
    async function loadSaved() {
      if (!nextAuthIsAuthenticated) return;
      setLoading(true);
      try {
        const response = await CollegeService.getColleges();
        // Filter colleges that match saved IDs
        const filtered = response.colleges.filter((c) => savedCollegeIds.includes(c.id));
        setSavedColleges(filtered);
      } catch (err) {
        console.error("Failed to load saved colleges", err);
      } finally {
        setLoading(false);
      }
    }
    loadSaved();
  }, [nextAuthIsAuthenticated, savedCollegeIds]);

  // Hydration Mount Guard
  if (!mounted) {
    return (
      <div className="flex flex-col gap-6 py-6">
        <div className="h-8 w-48 rounded bg-muted/60 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="h-44 rounded-xl border border-border bg-card animate-pulse" />
          <div className="h-44 rounded-xl border border-border bg-card animate-pulse" />
        </div>
      </div>
    );
  }

  // Auth Guard Gate (Visual fallback - Middleware handles page protection)
  if (!nextAuthIsAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto px-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 mb-6">
          <ShieldAlert className="h-7 w-7" />
        </div>
         <h2 className="text-2xl font-bold tracking-tight">Protected Area</h2>
         <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
           You need to be signed in to access your saved colleges dashboard and shortlist programs.
         </p>
         <Link href="/login?callbackUrl=/saved" className="w-full mt-6">
           <Button className="gap-1.5 w-full font-bold cursor-pointer">
             <LogIn className="h-4 w-4" />
             <span>Sign In to Your Account</span>
           </Button>
         </Link>
       </div>
     );
   }
 
   return (
     <div className="flex flex-col gap-6 py-6">
       <div>
         <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
           <Bookmark className="h-7 w-7 text-primary fill-current" />
           <span>Saved Colleges</span>
         </h1>
         <p className="text-sm text-muted-foreground mt-1">
           Your personalized shortlist of bookmarks.
         </p>
       </div>
 
       {loading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[1, 2].map((i) => (
             <div key={i} className="h-44 rounded-xl border border-border bg-card animate-pulse" />
           ))}
         </div>
       ) : savedColleges.length === 0 ? (
         <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border rounded-2xl bg-card/30 text-center px-4">
           <Bookmark className="h-12 w-12 text-muted-foreground/60 stroke-[1.2]" />
           <h3 className="font-bold text-lg mt-4">Your shortlist is empty</h3>
           <p className="text-sm text-muted-foreground mt-1 max-w-sm">
             Save colleges from the discovery catalog to bookmark them for quick access later.
           </p>
           <Link href="/colleges" className="mt-6">
             <Button size="sm" className="gap-1.5">
               <span>Browse Catalog</span>
               <ArrowRight className="h-4 w-4" />
             </Button>
           </Link>
         </div>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {savedColleges.map((college) => (
             <div
               key={college.id}
               className="relative rounded-xl border border-border bg-card p-5 shadow-sm flex items-start gap-4"
             >
               <div className="h-12 w-12 overflow-hidden rounded bg-muted flex-shrink-0">
                 <Image
                   src={college.logo}
                   alt={college.name}
                   width={48}
                   height={48}
                   className="h-full w-full object-cover"
                 />
               </div>
              <div className="flex-1 min-w-0 pr-8">
                <Link href={`/colleges/${college.id}`}>
                  <h3 className="font-bold text-sm text-foreground hover:text-primary truncate transition-colors">
                    {college.name}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">{college.location.city}, {college.location.state}</p>
                <div className="mt-3 flex items-center gap-4 text-xs font-semibold">
                  <div>
                    <span className="text-muted-foreground font-normal">Fees:</span> ₹{(college.feesRange.min / 100000).toFixed(1)}L - ₹{(college.feesRange.max / 100000).toFixed(1)}L / yr
                  </div>
                  <div>
                    <span className="text-muted-foreground font-normal">Average package:</span> {college.placementStats.averageSalary} LPA
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleSaveCollege(college.id)}
                className="absolute top-5 right-5 text-muted-foreground hover:text-destructive transition-colors"
                title="Remove from bookmarks"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
