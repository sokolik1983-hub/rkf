import React from 'react'

export const CheckBoxSVG = ({checked}) => checked ?
    <svg className="filter-checkbox__checkbox filter-checkbox__checkbox--checked" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd"
              clipRule="evenodd"
              d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM7 14L2 9L3.4 7.6L7 11.2L14.6 3.6L16 5L7 14Z"
              fill="#253C5E"/>
    </svg>
    :
    <svg className="filter-checkbox__checkbox" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M16 2V16H2V2H16ZM16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0Z"
              fill="#BABFC7"/>
    </svg>;
