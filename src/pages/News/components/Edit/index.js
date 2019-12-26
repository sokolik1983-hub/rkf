import React from "react";
import {Form} from "../../../../components/Form";
import RenderFields from "./RenderFields";
import {formConfig, endpointDeleteNewsPicture, endpointAddNewsPicture} from "../../config";
import {Request} from "../../../../utils/request";
import "./index.scss";


const Edit = ({id, text, img, setIsEdit, setNeedRequest}) => {
    const onSuccess = async (data, values) => {
        if(img && !values.file) {
            await Request({
                url: endpointDeleteNewsPicture + id,
                method: "DELETE"
            });
        } else if(img !== values.file) {
            let data = new FormData();
            data.append('id', id);
            data.append('file',  values.file);

            await Request({
                url: endpointAddNewsPicture,
                method: "POST",
                data: data,
                isMultipart: true
            });
        }

        setNeedRequest(true);
        setIsEdit(false);
    };

    const transformValues = values => {
        return {content: values.content, /*change_date: new Date(),*/ id}; //Request error if add change_date
    };

    return (
        <Form
            onSuccess={onSuccess}
            transformValues={transformValues}
            {...formConfig}
            className="article-edit"
        >
            <RenderFields fields={formConfig.fields} text={text} imgSrc={img} onCancel={() => setIsEdit(false)} />
        </Form>
    )
};

export default React.memo(Edit);