import React from "react";
import "../DocStatus/index.scss";

const DocHead = ({text, link, history}) => <div className="club-documents-status__head">
                <button className="btn-backward" onClick={() => link ? history.push(link) : history.goBack()}>Личный кабинет</button>
                &nbsp;/&nbsp;
                {text}
            </div>

export default React.memo(DocHead);
