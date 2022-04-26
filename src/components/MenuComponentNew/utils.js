import React, {useEffect, useState} from "react";

export const getPresidium = (e, setShowModal) => {
    e.preventDefault();
    setShowModal('presidium');
};
