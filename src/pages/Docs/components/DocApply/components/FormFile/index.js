import React, {useState} from "react";
import { FormField, FormGroup, FormInput } from "components/Form";
import {connect, getIn} from "formik";
import ls from "local-storage";
import HideIf from "components/HideIf";
import Loading from "components/Loading";
import Error from "components/Form/Field/Error";
import DocLink from "../../components/DocLink";
import {Request} from "utils/request";
import "./index.scss";

const accept = ".pdf, .jpg, .jpeg, .png";

const FormFile = ({formik, name, label, docId, disabled, form, distinction, document_type_id, declarant_uid}) => {
    const clubId = ls.get('profile_id') ? ls.get('profile_id') : '';
    const [loading, setLoading] = useState(false),
          [touched, setTouched] = useState(false);
    return <div style={{
    display: 'flex',
    flexDirection: 'column',
    marginRight: '16px',
    width: 'calc(50% - 16px)'
}}>
    <FormInput name={`${name}_id`}>
            <label>{!!label ? label : "\u00a0"} {form && "("}{form && <a download={form.filename} href={form.href}>{form.linkText}</a>}{form && ")"}</label>
<FormGroup inline>
    <HideIf cond={disabled || loading}>
                <label htmlFor={`${name}_id`} disabled={!document_type_id} className={`btn btn-primary ${!document_type_id ? 'disabled' : ''}`}>
<input className="hidden-file" id={`${name}_id`} name={name} disabled={!document_type_id} accept={accept} type="file"
            onChange={e => {
                formik.setTouched(`${name}_id`);
                let file =  e.target.files[0]
                if (!file) {
                    formik.setFieldValue(`${name}_id`, null);
                    return;
                }
                let fd = new FormData();
                fd.append("document", file);
                fd.append("document_type_id", document_type_id);
                fd.append("club_id", clubId);
                declarant_uid && fd.append("declarant_uid", declarant_uid);
                setLoading(true);
                Request({
                    isMultipart: true,
                    url: `/api/requests/pedigree_request/PedigreeDocument${declarant_uid ? '/additional' : ''}`,
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
    <Error name={`${name}_id`} noTouch/>
</FormInput>
</div>
}

export default React.memo(connect(FormFile));
