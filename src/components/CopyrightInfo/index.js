import React from "react";
import "./index.scss";

const CopyrightInfo = () => (
    <div className="copyright-info">
        <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
        <p>Политика обработки персональных данных</p>
    </div>
);

export default CopyrightInfo;