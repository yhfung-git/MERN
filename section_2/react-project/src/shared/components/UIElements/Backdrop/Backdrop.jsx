import { createPortal } from "react-dom";

import "./Backdrop.css";

const Backdrop = (props) => {
  const content = <div className="backdrop" onClick={props.onClick}></div>;
  const backdropHook = document.getElementById("backdrop-hook");

  return createPortal(content, backdropHook);
};

export default Backdrop;
