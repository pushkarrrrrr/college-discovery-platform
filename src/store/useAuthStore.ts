import { create } from "zustand";

interface UserProfile {
  name: string;
  email: string;
}

interface AuthState {
  user: UserProfile | null;
  savedCollegeIds: string[];
  isAuthenticated: boolean;
  login: (name: string, email: string) => void;
  logout: () => void;
  toggleSaveCollege: (collegeId: string) => { success: boolean; isSaved: boolean };
  syncSessionUser: (email: string | null | undefined, name?: string | null) => void;
}

// Initial state helpers for mock persistence
const getInitialState = () => {
  if (typeof window === "undefined") {
    return { user: null, savedCollegeIds: [], isAuthenticated: false };
  }
  
  try {
    const savedUserStr = localStorage.getItem("college_app_user");
    const user = savedUserStr ? JSON.parse(savedUserStr) : null;
    
    if (user && user.email) {
      const savedIds = localStorage.getItem(`college_app_saved_ids_${user.email}`);
      return {
        user,
        savedCollegeIds: savedIds ? JSON.parse(savedIds) : [],
        isAuthenticated: true,
      };
    }
    
    return { user: null, savedCollegeIds: [], isAuthenticated: false };
  } catch {
    return { user: null, savedCollegeIds: [], isAuthenticated: false };
  }
};

export const useAuthStore = create<AuthState>((set, get) => ({
  ...getInitialState(),

  login: (name, email) => {
    const user = { name, email };
    let savedCollegeIds: string[] = [];

    if (typeof window !== "undefined") {
      localStorage.setItem("college_app_user", JSON.stringify(user));
      // Retrieve user-specific shortlist if it exists
      const savedIds = localStorage.getItem(`college_app_saved_ids_${email}`);
      if (savedIds) {
        savedCollegeIds = JSON.parse(savedIds);
      }
    }
    
    set({ user, isAuthenticated: true, savedCollegeIds });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("college_app_user");
      // Note: We deliberately do NOT remove the user-specific saved IDs list
      // so it persists for their next session!
    }
    set({ user: null, savedCollegeIds: [], isAuthenticated: false });
  },

  syncSessionUser: (email, name) => {
    if (!email) {
      set({ user: null, isAuthenticated: false, savedCollegeIds: [] });
      return;
    }
    let savedCollegeIds: string[] = [];
    if (typeof window !== "undefined") {
      const savedIds = localStorage.getItem(`college_app_saved_ids_${email}`);
      if (savedIds) {
        savedCollegeIds = JSON.parse(savedIds);
      }
    }
    set({
      user: { name: name || "", email },
      isAuthenticated: true,
      savedCollegeIds
    });
  },

  toggleSaveCollege: (collegeId) => {
    const { isAuthenticated, savedCollegeIds, user } = get();

    if (!isAuthenticated || !user) {
      return { success: false, isSaved: false };
    }

    const exists = savedCollegeIds.includes(collegeId);
    let updated: string[];

    if (exists) {
      updated = savedCollegeIds.filter((id) => id !== collegeId);
    } else {
      updated = [...savedCollegeIds, collegeId];
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(`college_app_saved_ids_${user.email}`, JSON.stringify(updated));
    }

    set({ savedCollegeIds: updated });
    return { success: true, isSaved: !exists };
  },
}));
