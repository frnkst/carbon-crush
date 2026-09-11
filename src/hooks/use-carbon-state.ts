"use client";

import { useSyncExternalStore } from "react";
import { BaselineResult, calculateBaseline } from "@/lib/app-data";

export type Activity = {
  id: string;
  title: string;
  category: string;
  co2Min: number;
  co2Max: number;
  xp: number;
  date: string;
  icon: string;
};

export type CarbonState = {
  version: 1;
  profile: { name: string; email: string };
  onboardingComplete: boolean;
  answers: Record<string, string>;
  baseline: BaselineResult | null;
  xp: number;
  activeDays: number;
  avoidedMin: number;
  avoidedMax: number;
  activeChallengeId: string | null;
  completedChallenges: string[];
  completedLessons: string[];
  activities: Activity[];
  goalPercent: number;
  notifications: boolean;
};

const STORAGE_KEY = "wurzel-prototype-state-v1";

export const initialState: CarbonState = {
  version: 1,
  profile: { name: "Anna", email: "anna@beispiel.ch" },
  onboardingComplete: false,
  answers: {},
  baseline: null,
  xp: 180,
  activeDays: 3,
  avoidedMin: 8,
  avoidedMax: 12,
  activeChallengeId: null,
  completedChallenges: [],
  completedLessons: [],
  activities: [],
  goalPercent: 18,
  notifications: true,
};

let memoryState = initialState;
let initialized = false;
const listeners = new Set<() => void>();

function readBrowserState() {
  if (!initialized && typeof window !== "undefined") {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CarbonState;
        if (parsed.version === 1) memoryState = parsed;
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    initialized = true;
  }
  return memoryState;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function commit(nextState: CarbonState) {
  memoryState = nextState;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }
  listeners.forEach((listener) => listener());
}

export function useCarbonState() {
  const state = useSyncExternalStore(subscribe, readBrowserState, () => initialState);

  function update(patch: Partial<CarbonState>) {
    commit({ ...memoryState, ...patch });
  }

  function finishOnboarding(answers: Record<string, string>) {
    update({
      answers,
      baseline: calculateBaseline(answers),
      onboardingComplete: true,
    });
  }

  function reset() {
    window.localStorage.removeItem(STORAGE_KEY);
    commit(initialState);
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "carboncrush-klimadaten.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return { state, update, finishOnboarding, reset, exportData, hydrated: true };
}
