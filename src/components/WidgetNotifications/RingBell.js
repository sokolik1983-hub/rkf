import React from 'react'

export const RingBellSVG = ({fill = '#9DAFBD'}) => <svg width="17" height="20" viewBox="0 0 17 20" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
    <path
        d="M13 15H4V8.5C4 6 6 4 8.5 4C11 4 13 6 13 8.5V15ZM15 14V8.5C15 5.43 12.86 2.86 10 2.18V1.5C10 1.10218 9.84196 0.720644 9.56066 0.43934C9.27936 0.158035 8.89782 0 8.5 0C8.10218 0 7.72064 0.158035 7.43934 0.43934C7.15804 0.720644 7 1.10218 7 1.5V2.18C4.13 2.86 2 5.43 2 8.5V14L0 16V17H17V16L15 14ZM8.5 20C9.03043 20 9.53914 19.7893 9.91421 19.4142C10.2893 19.0391 10.5 18.5304 10.5 18H6.5C6.5 18.5304 6.71071 19.0391 7.08579 19.4142C7.46086 19.7893 7.96957 20 8.5 20Z"
        fill={fill}/>
</svg>;

export const RingBell = ({notifications, onClick}) => <div
    onClick={onClick}
    className={`notifications-widget__bell${notifications ? ' notifications-widget__bell--active' : ''}`}
>
    <RingBellSVG/>
</div>;
