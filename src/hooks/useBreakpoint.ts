import { useState } from "react";
import { Grid } from "antd";
import { useDeepEffect } from "./useDeepEffect";

export enum DEVICE {
  DESKTOP = 1,
  TABLET = 2,
  MOBILE = 3,
}

const useBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(DEVICE.DESKTOP);
  const breakpoint = Grid.useBreakpoint();

  useDeepEffect(() => {
    if (breakpoint.lg || breakpoint.xxl || breakpoint.xl) {
      setCurrentBreakpoint(DEVICE.DESKTOP);
    } else if (breakpoint.md || breakpoint.sm) {
      setCurrentBreakpoint(DEVICE.TABLET);
    } else {
      setCurrentBreakpoint(DEVICE.MOBILE);
    }
  }, [breakpoint]);

  return currentBreakpoint;
};

export default useBreakpoint;
