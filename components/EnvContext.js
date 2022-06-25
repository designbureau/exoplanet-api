import { createContext } from "react";

// 1047.35

export const Constants = {
  mass: {
    sol: 1,
    jupiter: 1047.35,
    earth: 332946,
  },
  radius: {
    sol: 1,
    jupiter: 0.10045,
    earth: 11.209,
  },
  distance: {
    au: 5,
  }
};

export const EnvContext = createContext();
