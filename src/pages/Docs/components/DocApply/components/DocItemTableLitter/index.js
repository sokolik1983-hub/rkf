import React from "react";
import { connect } from "formik";
import DeleteButton from "../../components/DeleteButton";
import moment from "moment";
import "../DocItemLitter/index.scss";
import "./index.scss";

// litter
const DocTableItem = ({date_created, statuses, status_id, id, last_name, first_name, second_name, email, documents, activateClick, onDelete, father_foreign, mother_foreign}) => {
    const docConst = 3 + Number(father_foreign);
    let st = statuses.find(f => status_id === f.id)
    return <tr className={`DocItem table caps`}>
        <td onClick={activateClick}>{date_created ? moment(date_created).format("DD.MM.YYYY") : ''}</td>
        <td onClick={activateClick} className="no-caps"><i>{st && st.name}</i></td>
        <td onClick={activateClick}>{id || ''}</td>
        <td onClick={activateClick}>{[last_name, first_name, second_name].filter(f=>f).join(' ')}</td>
        <td onClick={activateClick}>{email}</td>
        <td onClick={activateClick}>{documents ? documents.length + docConst : docConst}</td>
        <td><img className={`DocItem__chevron`} src="/static/icons/pen-gray.svg" alt=""/></td>
        <td>
        {/*<img className={`DocItem__chevron ${active && 'active'}`} src="/static/icons/chevron_left.svg" alt=""/>*/}
        <DeleteButton onClick={e => onDelete(e)} />
        </td>
    </tr>;
}

export default connect(DocTableItem);
