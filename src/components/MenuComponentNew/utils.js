import React, {useEffect, useState} from "react";
import {Request} from "../../utils/request";
import {useTimeout} from "react-use";





export const getPresidium = (e, setShowModal) => {
    e.preventDefault();
    setShowModal('presidium');
};
