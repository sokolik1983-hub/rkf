import React, { useState, useEffect } from "react";
import Share from "components/Share";
import { SvgIcon } from "@progress/kendo-react-common";
import { filePdf, trash } from "@progress/kendo-svg-icons";
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/ru";
import './styles.scss';

moment.locale('ru');

const DocumentItem = ({ category_id, category_name, id, name, date_create, categories, setModal }) => {
    const [value, setValue] = useState({});
    const defaultValue = { id: 0, name: "Неотсортированные" };

    useEffect(() => {
        setValue(category_id ? { id: category_id, name: category_name } : defaultValue);
    }, []);

    return <div className="DocumentItem container p-0 mb-4">
        <div className="row d-flex align-items-center">
            <div className="col-6">
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
            <div className="col-4">
                <DropDownList
                    data={categories}
                    dataItemKey="id"
                    textField="name"
                    defaultItem={defaultValue}
                    value={value}
                    onChange={({ target }) => setValue(target.value)}
                />
            </div>
            <div className="col-1">
                <button
                    className="DocumentItem__delete-btn"
                    type="button"
                    title="Удалить"
                    onClick={() => setModal({ type: 'deleteDocument', documentId: id })}
                >
                    <SvgIcon icon={trash} size="default" />
                </button>
            </div>
        </div>
    </div>;
};

export default React.memo(DocumentItem);