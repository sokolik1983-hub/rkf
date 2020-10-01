import React from "react";

export const listNoDataRender = (element) => {
    const noData = (
        <h4 style={{ fontSize: '14px' }}>
            <span className="k-icon k-i-warning" style={{ fontSize: '30px' }} />
            <br /><br />
            нет данных
        </h4>
    );
    return React.cloneElement(element, { ...element.props }, noData);
}