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

const docConst = 6;

const DocTableItem = ({date_created, status_name, id, owner_last_name, owner_first_name, owner_second_name, email, documents, activateClick}) => {
    return <tr className={`DocItem table caps`} onClick={activateClick}>
        <td>{date_created ? moment(date_created).format("DD.MM.YYYY") : ''}</td>
        <td className="no-caps"><i>{status_name}</i></td>
        <td>{id || ''}</td>
        <td>{[owner_last_name, owner_first_name, owner_second_name].filter(f=>f).join(' ')}</td>
        <td>{email}</td>
        <td>{documents ? documents.length + docConst : docConst}</td>
        <td>
        {/*<img className={`DocItem__chevron ${active && 'active'}`} src="/static/icons/chevron_left.svg" alt=""/>*/}
        <DeleteButton />
        </td>
    </tr>;
}

export default connect(DocTableItem);
