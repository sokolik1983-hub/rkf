import React from "react";
import Card from "../../../../components/Card";
import {Form} from "../../../../components/Form";
import RenderFields from "./RenderFields";
import {newsArticleFormConfig} from "../../config";
import {connectAuthVisible} from "../../../../apps/Auth/connectors";
import './index.scss';


const ClubAddArticle = ({isAuthenticated, profile_id, clubId, logo, setPage, setNeedRequest}) => {
    const onSuccess = () => {
        setPage(1);
        setNeedRequest(true);
    };

    const transformValues = values => {
        return {...values, club_id: clubId};
    };

    return !isAuthenticated || profile_id !== clubId ?
        null :
        <Card className="club-page__add-article">
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
};

export default React.memo(connectAuthVisible(ClubAddArticle));