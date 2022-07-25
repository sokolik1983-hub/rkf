import React, {memo} from "react";
import Card from "../../../../../components/Card";
import {FormField, FormGroup, SubmitButton} from "../../../../../components/Form";
import UploadDocsEditPage from "../../../../../components/UploadDocsEditPage/UploadDocsEditPage";
import {editFormFields} from "../config";


const MainSection = ({errors}) => {
    const {name, alias, comment, web_site} = editFormFields;

    return (
        <Card className="nbc-edit__main-section">
            <h3>Основная информация</h3>
            <div>
                <FormField {...name} />
                <FormField {...alias} />
                <FormField {...comment} />
            </div>
            <FormGroup inline>
                <FormField {...web_site} />
            </FormGroup>
            <div className="nbc-edit__documents main-info">
                <UploadDocsEditPage />
            </div>
            <SubmitButton>Сохранить</SubmitButton>
            {errors && !!Object.keys(errors).length &&
                <div className="nbc-edit__is-valid">Не все необходимые поля заполнены</div>
            }
        </Card>
    );
};

export default memo(MainSection);