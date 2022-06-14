import CreateBinary from "./CreateBinary";
import { useMemo } from "react";

const CreateSystem =  ({systemData, setCameraPosition, setFocus, setClicked, refs, setViewState, viewState, setRefsArray}) => {
  // return CreateBinary(systemData, setCameraPosition);

  // let isBinary = systemData.binary && systemData.binary? true : false;
  return useMemo(() => CreateBinary(systemData, setCameraPosition, setFocus, setClicked, refs, setViewState, setRefsArray), [systemData, setCameraPosition, setFocus, setClicked, refs, setViewState, setRefsArray]);

}


export default CreateSystem;
