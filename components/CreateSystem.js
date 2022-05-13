import CreateBinary from "./CreateBinary";
import { useMemo } from "react";

const CreateSystem =  ({systemData, setCameraPosition, setFocus}) => {
  // return CreateBinary(systemData, setCameraPosition);
  return useMemo(() => CreateBinary(systemData, setCameraPosition, setFocus), [systemData, setCameraPosition, setFocus])

}


export default CreateSystem;
