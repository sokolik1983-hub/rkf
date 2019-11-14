import React from "react";

const CustomFooter = ({ columns, rows }) => {
    if(!columns.find(col => col.footer)) return null;

    return (
        <tfoot>
            <tr>
                {columns.map((column, i) =>
                    <td key={`footer-${i}`}>{column.footer ? column.footer(rows) : null}</td>
                )}
            </tr>
        </tfoot>
    );
};

export default CustomFooter;