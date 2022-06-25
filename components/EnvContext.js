import { createContext } from "react";

// 1047.35

export const Constants = {
  mass: {
    sol: 1,
    jupiter: 1047.35,
    earth: 332946,
  },
  radius: {
    sol: 10,
    jupiter: 1,
    earth: 11.209,
  },
  distance: {
    au: 5,
  }
};

export const EnvContext = createContext();
