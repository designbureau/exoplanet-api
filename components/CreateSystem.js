import CreateBinary from "./CreateBinary";
import { useMemo } from "react";

const CreateSystem =  ({systemData, setFocus, setClicked, refs, setViewState, viewState, setRefsArray}) => {

  // let isBinary = systemData.binary && systemData.binary? true : false;
  return useMemo(() => CreateBinary(systemData, setFocus, setClicked, refs, setViewState, setRefsArray), [systemData, setFocus, setClicked, refs, setViewState, setRefsArray]);

}


export default CreateSystem;
