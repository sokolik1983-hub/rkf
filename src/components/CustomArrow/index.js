import React from "react";

const CustomArrow = ({ className, alt, onClick }) => (
    <img className={className} onClick={onClick} src="/static/images/slider/slider-button.svg" alt={alt} />
);

export default CustomArrow;
