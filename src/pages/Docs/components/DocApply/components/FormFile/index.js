import React, {useState} from "react";
import { FormField } from "components/Form";
import {connect, getIn} from "formik";
import ls from "local-storage";
import HideIf from "components/HideIf";
import Loading from "components/Loading";
import DocLink from "../../components/DocLink";
import {Request} from "utils/request";

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
    <HideIf cond={disabled || loading}>
        <FormField name={name} label={label} accept={accept} fieldType="file"
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
        {form && <a download={form.filename} href={form.href}>{form.linkText}</a>}
    </HideIf>
    <HideIf cond={!loading}>
        <Loading/>
    </HideIf>
    <DocLink distinction={distinction} docId={docId || getIn(formik.values, `${name}_id`)} label={label} showLabel={disabled} />
</div>
}

export default React.memo(connect(FormFile));
