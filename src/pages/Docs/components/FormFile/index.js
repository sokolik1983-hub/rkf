import React from "react";
import { FormField } from "components/Form";
import HideIf from "components/HideIf";
import DocLinkInNewTab from "../../components/DocLinkInNewTab";

const FormFile = ({name, label, docId, disabled, form, distinction}) => {
    return (
        <div className="form-file">
            <HideIf cond={disabled}>
                <FormField name={name} label={label} accept=".pdf, .jpg, .jpeg" fieldType="file" />
                {form && <a download={form.filename} href={form.href}>{form.linkText}</a>}
            </HideIf>
            <DocLinkInNewTab distinction={distinction} docId={docId} label={label} showLabel={disabled} />
        </div>
    );
}

export default React.memo(FormFile);
