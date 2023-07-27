import React from 'react';

function SaleBar() {
  return (
    <svg
      enableBackground="new 0 0 300 300"
      version="1.1"
      viewBox="0 0 300 300"
      x="0px"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y="0px">
      <path
        d="M 150, 150 m -40, 0 a 40,40 0 0,1 80,0 a 40,40 0 0,1 -80,0 "
        id="circlePath"
      />
      <circle cx="150" cy="100" fill="none" r="75" />
      <text fill="#000">
        <textPath xlinkHref="#circlePath">
          SALE | SALE | SALE | SALE | SALE | SALE |
        </textPath>
      </text>
    </svg>
  );
}

export default SaleBar;
