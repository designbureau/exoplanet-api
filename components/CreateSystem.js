import CreateBinary from "./CreateBinary";
import { useMemo } from "react";

const CreateSystem =  ({systemData, setCameraPosition, setFocus, refs}) => {
  // return CreateBinary(systemData, setCameraPosition);
  return useMemo(() => CreateBinary(systemData, setCameraPosition, setFocus, refs), [systemData, setCameraPosition, setFocus, refs])

}


export default CreateSystem;
