import React from "react";
import Card from "../Card";
import WikiHelp from "../WikiHelp";
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
            <div className="add-article__help">
                <WikiHelp
                    url="https://help.rkf.online/ru/knowledge_base/art/53/cat/3/#/"
                    title="Инструкция по добавлению новости"
                />
            </div>
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
