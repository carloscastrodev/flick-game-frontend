import { useContext } from "react";
import { IOContext } from "../providers/IOProvider";

const useIOService = () => {
  const IOService = useContext(IOContext);

  return { IOService };
};

export default useIOService;
