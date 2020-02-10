import React from "react";
import Card from "../../../../components/Card";
import "./index.scss";

const docs = [
    {
        id: 1,
        name: 'Свидетельсство №123 Of Documents.pdf',
        url: 'https://yandex.ru/'
    },
    {
        id: 2,
        name: 'Свидетельсство №123 Of Documents.pdf',
        url: 'https://yandex.ru/'
    },
    {
        id: 3,
        name: 'Свидетельсство №123 Of Documents.pdf',
        url: 'https://yandex.ru/'
    },
    {
        id: 4,
        name: 'Свидетельсство №123 Of Documents.pdf',
        url: 'https://yandex.ru/'
    },
];

const DocumentsComponent = () => (
    <Card className="documents-component">
        <h4 className="documents-component__title">Документы</h4>
        <ul className="documents-component__list">
            {docs.map(doc =>
                <li className="documents-component__item" key={doc.id}>
                    <a href={doc.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="documents-component__link"
                       title={doc.name}
                    >
                        {doc.name.slice(0, 22) + '...pdf'}
                    </a>
                </li>
            )}
        </ul>
    </Card>
);

export default React.memo(DocumentsComponent);