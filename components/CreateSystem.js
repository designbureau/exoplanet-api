import CreateBinary from "./CreateBinary";
import { useMemo } from "react";

const CreateSystem =  ({systemData, setCameraPosition}) => {
  // return CreateBinary(systemData, setCameraPosition);
  return useMemo(() => CreateBinary(systemData, setCameraPosition), [systemData, setCameraPosition])

}


export default CreateSystem;
