import React from "react";
import { FormField } from "components/Form";
import HideIf from "components/HideIf";
import DocLink from "../../components/DocLink";

const accept = ".pdf, .jpg, .jpeg";

const FormFile = ({name, label, docId, disabled, form, distinction}) => <>
    <HideIf cond={disabled}>
        <FormField name={name} label={label} accept={accept} fieldType="file" />
        {form && <a download={form.filename} href={form.href}>{form.linkText}</a>}
    </HideIf>
    <DocLink distinction={distinction} docId={docId} label={label} showLabel={disabled} />
</>

export default React.memo(FormFile);
