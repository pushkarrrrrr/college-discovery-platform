import { create } from "zustand";
import { College } from "@/types";

interface CompareState {
  selectedColleges: College[];
  isDrawerOpen: boolean;
  addCollege: (college: College) => { success: boolean; message?: string };
  removeCollege: (collegeId: string) => void;
  clearCompare: () => void;
  setDrawerOpen: (isOpen: boolean) => void;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  selectedColleges: [],
  isDrawerOpen: false,

  addCollege: (college) => {
    const { selectedColleges } = get();
    
    // Check if already selected
    if (selectedColleges.some((c) => c.id === college.id)) {
      return { success: false, message: "College is already selected for comparison." };
    }

    // Limit to 3 colleges maximum
    if (selectedColleges.length >= 3) {
      return { success: false, message: "You can compare up to 3 colleges at a time." };
    }

    set({
      selectedColleges: [...selectedColleges, college],
      isDrawerOpen: true, // Automatically open the comparison bar
    });
    return { success: true };
  },

  removeCollege: (collegeId) => {
    const { selectedColleges } = get();
    const updated = selectedColleges.filter((c) => c.id !== collegeId);
    
    set({
      selectedColleges: updated,
      // Automatically hide drawer if list becomes empty
      isDrawerOpen: updated.length > 0 ? get().isDrawerOpen : false,
    });
  },

  clearCompare: () => {
    set({ selectedColleges: [], isDrawerOpen: false });
  },

  setDrawerOpen: (isOpen) => {
    set({ isDrawerOpen: isOpen });
  },
}));
