
  import { createContext } from "react";

  export const Constants = {
    mass: {
      sol: 1,
      jupiter: .1,
      earth: .01
    },
    radius:{
      sol: 1,
      jupiter: .2,
    },
    distance: {
      au: 5,
    }
  };


  export const EnvContext = createContext();