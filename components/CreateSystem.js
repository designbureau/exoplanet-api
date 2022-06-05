import CreateBinary from "./CreateBinary";
import { useMemo } from "react";

const CreateSystem =  ({systemData, setCameraPosition, setFocus, setClicked, refs}) => {
  // return CreateBinary(systemData, setCameraPosition);

  let isBinary = systemData.binary && systemData.binary? true : false;
  return useMemo(() => CreateBinary(systemData, setCameraPosition, setFocus, setClicked, refs), [systemData, setCameraPosition, setFocus, setClicked, refs])

}


export default CreateSystem;
