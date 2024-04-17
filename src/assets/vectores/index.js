import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ArrowLeft = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M11.6666 -1.33514e-05L13.7447 2.04165L5.57805 10.2083L23.3333 10.2083V13.125L5.57805 13.125L13.7447 21.2916L11.6666 23.3333L-7.43866e-05 11.6666L11.6666 -1.33514e-05Z" fill="black"/>
  </Svg>
);

export const IconPlus = () => (
    <Svg width="20" height="20" viewBox="0 0 24 23" fill="none" >
        <Path d="M12.3636 10.0625V0H10.5V10.0625H0V11.9846H10.5V23L12.3636 23V11.9846L24 11.9846V10.0625L12.3636 10.0625Z" fill="black" />
        <Path d="M12.3636 10.0625V0H10.5V10.0625H0V11.9846H10.5V23L12.3636 23V11.9846L24 11.9846V10.0625L12.3636 10.0625Z" troke="black" />
    </Svg>
);

export const IconTrash = ({width, height, color}) => (
    <Svg width={width} height={height} viewBox="0 0 116 116" fill="none">
      <Path d="M43.4855 43.4856H50.7331V86.9711H43.4855V43.4856Z" fill={color} />
      <Path d="M65.2283 43.4856H72.4759V86.9711H65.2283V43.4856Z" fill={color} />
      <Path
        d="M14.4951 21.7427V28.9903H21.7427V101.466C21.7427 103.388 22.5063 105.232 23.8655 106.591C25.2247 107.95 27.0681 108.714 28.9903 108.714H86.971C88.8931 108.714 90.7366 107.95 92.0958 106.591C93.455 105.232 94.2186 103.388 94.2186 101.466V28.9903H101.466V21.7427H14.4951ZM28.9903 101.466V28.9903H86.971V101.466H28.9903Z"
        fill={color}
      />
      <Path d="M43.4855 7.24756H72.4758V14.4951H43.4855V7.24756Z" fill={color} />
    </Svg>
);

export const AlertIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M13 13H11V7H13V13ZM13 17H11V15H13V17ZM12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z" fill="white"/>
  </Svg>
);

export const StarIcon = (props) => {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.01135 0L10.3233 5.48516L16 6.12418L11.7497 10.1297L12.9255 16L7.98699 12.9902L3.037 15.9795L4.23497 10.1137L0 6.09081L5.67875 5.47543L8.01135 0Z"
        fill="#FFB400"
      />
    </Svg>
  );
};

export const InfoIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <Path 
      d="M11 0.5C5.20156 0.5 0.5 5.20156 0.5 11C0.5 16.7984 5.20156 21.5 11 21.5C16.7984 21.5 21.5 16.7984 21.5 11C21.5 5.20156 16.7984 0.5 11 0.5ZM11.75 16.0625C11.75 16.1656 11.6656 16.25 11.5625 16.25H10.4375C10.3344 16.25 10.25 16.1656 10.25 16.0625V9.6875C10.25 9.58438 10.3344 9.5 10.4375 9.5H11.5625C11.6656 9.5 11.75 9.58438 11.75 9.6875V16.0625ZM11 8C10.7056 7.99399 10.4253 7.87282 10.2192 7.6625C10.0132 7.45218 9.89773 7.16945 9.89773 6.875C9.89773 6.58055 10.0132 6.29782 10.2192 6.0875C10.4253 5.87718 10.7056 5.75601 11 5.75C11.2944 5.75601 11.5747 5.87718 11.7808 6.0875C11.9868 6.29782 12.1023 6.58055 12.1023 6.875C12.1023 7.16945 11.9868 7.45218 11.7808 7.6625C11.5747 7.87282 11.2944 7.99399 11 8Z" 
      fill="#509AF8"
    />
  </Svg>
);

export const DolarIcon = () => (
  <Svg width="25" height="25" viewBox="0 0 63 63" fill="none">
    <Path d="M44.743 39.9089C44.743 30.9308 37.3896 29.9077 31.4814 29.087C25.0423 28.1904 21.3989 27.414 21.3989 21.8698C21.3989 17.2146 26.276 15.5628 30.4521 15.5628C32.5335 15.4954 34.6012 15.9239 36.4845 16.8127C38.3678 17.7016 40.0128 19.0253 41.284 20.6749L44.3113 18.232C42.95 16.4816 41.2561 15.0175 39.3271 13.9238C37.3981 12.8302 35.272 12.1285 33.0709 11.8592V5.83606H29.1802V11.7149C22.1474 12.1413 17.5082 16.1114 17.5082 21.8696C17.5082 31.071 24.9588 32.1073 30.9456 32.9386C37.2729 33.8194 40.8523 34.5773 40.8523 39.9089C40.8523 45.8078 34.7583 46.6882 31.1256 46.6882C24.4542 46.6882 21.6358 44.8131 19.0218 41.5761L15.9945 44.019C17.5368 46.0513 19.5315 47.6961 21.8203 48.8229C24.1091 49.9497 26.6291 50.5275 29.1802 50.5105V56.415H33.0709V50.4916C40.3185 49.8998 44.743 45.9644 44.743 39.9089Z" fill="black" />
  </Svg>
);