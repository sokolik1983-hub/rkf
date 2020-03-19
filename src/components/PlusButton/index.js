import React from "react";
import './index.scss';

export default ({ large, small, onClick }) => <button onClick={onClick} type="button" className={`plus-button ${large ? 'plus-button--large':''} ${small ? 'plus-button--small':''}`}></button>
