import CreateBinary from "./CreateBinary";
import { useMemo } from "react";

const CreateSystem =  ({systemData, setCameraPosition, setFocus, refs}) => {
  // return CreateBinary(systemData, setCameraPosition);

  let isBinary = systemData.binary && systemData.binary? true : false;
  return useMemo(() => CreateBinary(systemData, setCameraPosition, setFocus, refs, isBinary), [systemData, setCameraPosition, setFocus, refs, isBinary])

}


export default CreateSystem;
