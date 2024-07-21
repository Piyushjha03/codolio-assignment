import { create } from "zustand";

export const useStore = create((set) => ({
  theme: window.localStorage.getItem("theme") || "light",
  toggleTheme: () => {
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" }));
  },
}));

export function toggleThemeFunc() {
  useStore.getState().toggleTheme();
  window.localStorage.setItem("theme", useStore.getState().theme);
  if (useStore.getState().theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
