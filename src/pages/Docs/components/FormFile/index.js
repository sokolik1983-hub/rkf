import React from "react";
import { FormField } from "components/Form";
import HideIf from "components/HideIf";
import DocLink from "../../components/DocLink";

const accept = ".pdf, .jpg, .jpeg";

const FormFile = ({name, label, docId, disabled, statusAllowsUpdate, form}) => <>
    <HideIf cond={disabled || !statusAllowsUpdate}>
        <FormField name={name} label={label} accept={accept} fieldType="file" />
        {form && <a download={form.filename} href={form.href}>{form.linkText}</a>}
    </HideIf>
    <DocLink docId={docId} label={label} showLabel={disabled} />
</>

export default React.memo(FormFile);
