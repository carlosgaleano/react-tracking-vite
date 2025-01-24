import { useAuthStore } from "../../auth/store/auth";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";

import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Popover";

export const LogOut2 = () => {
  




  const logOut = useAuthStore((store) => store.logOut);
  const navigate = useNavigate();

  const close = () => {
    navigate("/");
    logOut();
  };

  return (
    <>
    
     
        <OverlayTrigger
          offset={[108, 15]}
          className="bg-dark text-white w-25"
          overlay={<Tooltip  className="bg-dark text-white mb-2" id="tooltip-disabled">Boton de Salida!</Tooltip>}
        >
          <span className="d-inline-block ">
            <Button
              
              className="d-inline-block bg-white text-black botton-exit"
              
              onClick={close}
            >
              Salir{" "}
              <AiOutlineLogout
                className="d-inline-block text-red exit"
                color="warning"
                sx={{ fontSize: 80 }}
               
              />
            </Button>
          </span>
        </OverlayTrigger>

    </>
  );
};
