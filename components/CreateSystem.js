import CreateBinary from "./CreateBinary";
import { useMemo } from "react";

const CreateSystem = ({systemData, setFocus, setClicked, setDragged, refs, setViewState, viewState, setRefsArray}) => {

  // let isBinary = systemData.binary && systemData.binary? true : false;
  return useMemo(() => CreateBinary(systemData, setFocus, setClicked, refs, setViewState, setRefsArray, setDragged), [systemData, setFocus, setClicked, refs, setViewState, setRefsArray, setDragged]);

}


export default CreateSystem;
