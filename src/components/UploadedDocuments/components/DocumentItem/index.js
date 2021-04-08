import React, { useState, useEffect } from "react";
import Share from "components/Share";
import { SvgIcon } from "@progress/kendo-react-common";
import { filePdf, trash } from "@progress/kendo-svg-icons";
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Link } from "react-router-dom";
import { getHeaders } from "../../../../utils/request";
import LightTooltip from "components/LightTooltip";
import moment from "moment";
import "moment/locale/ru";
import './styles.scss';

moment.locale('ru');

const DocumentItem = ({ category_id, category_name, id, name, date_create, categories, unsortedCategory, setModal, documentsToUpdate, setDocumentsToUpdate }) => {
    const [category, setCategory] = useState({});
    const initialCategory = category_id ? { id: category_id, name: category_name } : unsortedCategory;

    useEffect(() => {
        setCategory(initialCategory);
    }, []);

    const handleCategoryChange = ({ target }) => {
        const { value } = target;
        setCategory(value);
        if (value === initialCategory) {
            setDocumentsToUpdate(documentsToUpdate.filter(d => d.id !== id));
        } else {
            const updatedDocument = { id: id, category_id: value.id };
            setDocumentsToUpdate([
                ...documentsToUpdate.filter(d => d.id !== id),
                updatedDocument
            ]);
        }
    };

    const itemRender = (li) => {
        const itemChildren = <div style={{ textOverflow: 'ellipsis', display: 'block', overflow: 'hidden' }}>
            {li.props.children}
        </div >;
        return React.cloneElement(li, li.props, itemChildren);
    }

    const handleClick = async (e, id) => {
        e.preventDefault();
        await fetch(`/api/document/publicdocument?id=${id}`, {
            method: 'GET',
            headers: getHeaders()
        })
            .then(response => response.blob())
            .then(blob => {
                let url = window.URL.createObjectURL(blob),
                    a = document.createElement('a');
                a.href = url;
                a.download = `Документ ${id}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            });
    };

    return <div className="DocumentItem container p-0 mb-4">
        <div className="row d-flex align-items-center flex-row" >
            <div className="col-5">
                <Link
                    to={`/docs/${id}`}
                    target="_blank"
                    className="d-flex align-items-center"
                    rel="noopener noreferrer"
                >
                    <SvgIcon icon={filePdf} size="default" />
                    <div className="d-flex flex-column">{name}<span className="DocumentItem__date">
                        {`Добавлено ${moment(date_create).format('D MMMM YYYY')} в ${moment(date_create).format('HH:mm')}`}
                    </span>
                    </div>
                </Link>
            </div>
            <div className="col-1">
                <Share url={`//${window.location.host}/docs/${id}`} />
            </div>
            <div className="col-1">
                <LightTooltip title="Скачать документ" enterDelay={200} leaveDelay={200}>
                    <button
                        className="DocumentItem__download"
                        onClick={e => handleClick(e, id)}
                    >
                    </button>
                </LightTooltip>
            </div>
            <div className="col-4">
                <DropDownList
                    data={categories}
                    dataItemKey="id"
                    textField="name"
                    value={category}
                    itemRender={itemRender}
                    onChange={handleCategoryChange}
                />
            </div>
            <div className="col-1">
                <button
                    className="DocumentItem__delete-btn"
                    type="button"
                    //title="Удалить"
                    onClick={() => setModal({ type: 'deleteDocument', documentId: id })}
                >
                    <SvgIcon icon={trash} size="default" />
                </button>
            </div>
        </div>
    </div>;
};

export default React.memo(DocumentItem);