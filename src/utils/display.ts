import { useMediaQuery } from 'react-responsive';

export const MOBILE_WIDTH = 650;

export const isMobile = () => useMediaQuery({ maxWidth: MOBILE_WIDTH });
