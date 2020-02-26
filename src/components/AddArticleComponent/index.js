import React from "react";
import Card from "../Card";
import {Form} from "../Form";
import RenderFields from "./RenderFields";
import {newsArticleFormConfig} from "./config";
import './index.scss';


const AddArticle = ({clubId, logo, setPage, setNeedRequest}) => {
    const onSuccess = () => {
        setPage(1);
        setNeedRequest(true);
    };

    const transformValues = values => {
        return {...values, club_id: clubId};
    };

    return (
        <Card className="add-article">
            <Form
                isMultipart
                onSuccess={onSuccess}
                transformValues={transformValues}
                resetForm="true"
                {...newsArticleFormConfig}
                className="ArticleCreateForm"
            >
                <RenderFields fields={newsArticleFormConfig.fields} clubLogo={logo} />
            </Form>
        </Card>
    )
};

export default React.memo(AddArticle);
