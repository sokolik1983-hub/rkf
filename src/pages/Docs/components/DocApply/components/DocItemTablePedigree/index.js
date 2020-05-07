import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "components/Alert";
import { connect, FieldArray } from "formik";
import Button from "components/Button";
import DeleteButton from "../../components/DeleteButton";
import DocLink from "../../components/DocLink";
import VerkParent from "../../components/VerkParent";
import FormFile from "../../components/FormFile";
import Transliteratable from "../../components/Transliteratable";
import { FormGroup, FormField } from "components/Form";
import { apiPedigreeEverk } from "../../config.js";
import { Request } from "utils/request";
import transliterate from "utils/transliterate";
import HideIf from "components/HideIf";
import moment from "moment";
import "../DocItemPedigree/index.scss";
import "./index.scss";

const docConst = 6;

const DocTableItem = ({date_created, statuses, status_id, id, owner_last_name, owner_first_name, owner_second_name, email, documents, activateClick, onDelete}) => {
    let st = statuses.find(f => status_id === f.id)
    return <tr className={`DocItem table caps`}>
        <td onClick={activateClick}>{date_created ? moment(date_created).format("DD.MM.YYYY") : ''}</td>
        <td onClick={activateClick} className="no-caps"><i>{st && st.name}</i></td>
        <td onClick={activateClick}>{id || ''}</td>
        <td onClick={activateClick}>{[owner_last_name, owner_first_name, owner_second_name].filter(f=>f).join(' ')}</td>
        <td onClick={activateClick}>{email}</td>
        <td onClick={activateClick}>{documents ? documents.length + docConst : docConst}</td>
        <td>
        {/*<img className={`DocItem__chevron ${active && 'active'}`} src="/static/icons/chevron_left.svg" alt=""/>*/}
        <DeleteButton onClick={e => onDelete(e)} />
        </td>
    </tr>;
}

export default connect(DocTableItem);
