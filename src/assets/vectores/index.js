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