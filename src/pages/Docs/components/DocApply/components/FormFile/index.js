import React, {useState} from "react";
import { FormField, FormGroup } from "components/Form";
import {connect, getIn} from "formik";
import ls from "local-storage";
import HideIf from "components/HideIf";
import Loading from "components/Loading";
import DocLink from "../../components/DocLink";
import {Request} from "utils/request";
import "./index.scss";

const accept = ".pdf, .jpg, .jpeg, .png";

const FormFile = ({formik, name, label, docId, disabled, form, distinction, document_type_id}) => {
    const clubId = ls.get('profile_id') ? ls.get('profile_id') : '';
    const [loading, setLoading] = useState(false);
    return <div style={{
    display: 'flex',
    flexDirection: 'column',
    marginRight: '15px',
    width: '50%'
}}>
    <div className="FormInput">
            <label>{!!label ? label : "\u00a0"}</label>
<FormGroup inline>
    <HideIf cond={disabled || loading}>
                <label htmlFor={`${name}-file`} disabled={!document_type_id} className={`btn btn-primary ${!document_type_id ? 'disabled' : ''}`}>
<input className="hidden-file" id={`${name}-file`} name={name} disabled={!document_type_id} label={label} accept={accept} type="file"
            onChange={e => {
                let file =  e.target.files[0]
                if (!file) {
                    formik.setFieldValue(`${name}_id`, null);
                    return;
                }
                let fd = new FormData();
                fd.append("document", file);
                fd.append("document_type_id", document_type_id);
                fd.append("club_id", clubId);
                setLoading(true);
                Request({
                    isMultipart: true,
                    url: '/api/requests/pedigree_request/PedigreeDocument',
                    method: "POST",
                    data: fd
                }, id => {setLoading(false);formik.setFieldValue(`${name}_id`, id)}, e => {setLoading(false);formik.setFieldValue(name, '')})
            }}
        />

        Загрузить</label>
    </HideIf>
    <HideIf cond={!loading}>
        <Loading inline/>
    </HideIf>
    <DocLink distinction={distinction} docId={docId || getIn(formik.values, `${name}_id`)} label={label} showLabel={false} />
</FormGroup>
    {form && <a download={form.filename} href={form.href}>{form.linkText}</a>}
</div>
</div>
}

export default React.memo(connect(FormFile));
