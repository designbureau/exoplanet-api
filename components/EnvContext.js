import { createContext } from "react";

// 1047.35

export const Constants = {
  mass: {
    sol: 1,
    jupiter: 1047.35,
    earth: 332946,
  },
  radius: {
    sol: 11,
    jupiter: 1,
    earth: 11.209,
    scale: 4,
  },
  distance: {
    au: 215.032 * 11,
    au_sol_radius: 215.032,
  }
};

export const EnvContext = createContext();
