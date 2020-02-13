import React from "react";
import Card from "../Card";
import "./index.scss";


const DocumentsComponent = ({documents}) => (
    <Card className="documents-component">
        <h4 className="documents-component__title">Документы</h4>
        <ul className="documents-component__list">
            {documents.map(doc =>
                <li className="documents-component__item" key={doc.id}>
                    <a href={doc.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="documents-component__link"
                       title={doc.name}
                    >
                        {doc.name}
                    </a>
                </li>
            )}
        </ul>
    </Card>
);

export default React.memo(DocumentsComponent);