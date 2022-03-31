import React from "react";
import { SvgIcon } from "@progress/kendo-react-common";
import { trash } from "@progress/kendo-svg-icons";
import DocumentLink from "../DocumentLink";

import "./index.scss";

const DocumentLinksArray = ({ documents, editable, onRemove }) => {

    return (
        <div className="DocumentLinksArray">
            {!!documents?.length &&
                documents.map(d => {
                    return <div className="DocumentLinksArray__item" key={d.id}>
                        <DocumentLink
                            docId={d.id}
                        />
                        {editable && !d.accept && <button
                            className="DocumentLinksArray__delete-btn"
                            type="button"
                            onClick={() => onRemove(d.id)}
                        >
                            <SvgIcon icon={trash} size="default" />
                        </button>}
                    </div>
                })
            }
        </div >
    )
};

export default React.memo(DocumentLinksArray);