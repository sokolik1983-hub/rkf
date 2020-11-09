import React from "react";
import { SvgIcon } from "@progress/kendo-react-common";
import { filePdf } from "@progress/kendo-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/ru";
import './styles.scss';

moment.locale('ru');

const DocumentItemReadOnly = ({ id, name, date_create }) => {

    return <div className="col-md-6 mb-3">
        <Link
            to={`/docs/${id}`}
            target="_blank"
            className="d-flex align-items-center"
            rel="noopener noreferrer"
        >
            <SvgIcon icon={filePdf} size="default" />
            <div className="d-flex flex-column">{name}
                <span className="DocumentItem__date">
                    {`Добавлено ${moment(date_create).format('D MMMM YYYY')} в ${moment(date_create).format('HH:mm')}`}
                </span>
            </div>
        </Link>
    </div>;
};

export default React.memo(DocumentItemReadOnly);