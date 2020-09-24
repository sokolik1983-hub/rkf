import React, { useState } from "react";
import { number, object, string } from "yup";
import Card from "../Card";
import { Form } from "../Form";
import RenderFields from "./RenderFields";
import { newsArticleFormConfig } from "./config";
import './index.scss';


const AddArticle = ({ id, logo, setNeedRequest }) => {
    const [isAd, setIsAd] = useState(false);
    const [videoLink, setVideoLink] = useState('');
    const [isMating, setIsMating] = useState(false);

    const transformValues = values => {
        if (isAd) {
            return {
                ...values,
                advert_number_of_puppies: isMating ? `` : +values.advert_number_of_puppies,
                is_advert: true,
                club_id: id
            }
        } else {
            setVideoLink('');
            return {
                content: values.content,
                file: values.file,
                video_link: values.video_link,
                club_id: id
            }
        }
    };

    return (
        <Card className="add-article">
            <Form
                className="ArticleCreateForm"
                resetForm="true"
                isMultipart
                validationSchema={
                    object().shape({
                        content: string().required('Поле не может быть пустым'),
                        advert_breed_id: isAd ? number().required('Укажите породу').typeError('Укажите породу') : '',
                        advert_number_of_puppies: isAd && !isMating ? number().typeError('Поле не может быть пустым') : '',
                        advert_type_id: isAd ? number().nullable().required('Выберите категорию') : ''
                    })}
                initialValues={{
                    advert_breed_id: '',
                    advert_cost: '',
                    advert_number_of_puppies: '',
                    advert_type_id: ''
                }}
                {...newsArticleFormConfig}
                transformValues={transformValues}
                onSuccess={() => setNeedRequest(true)}
            >
                <RenderFields
                    fields={newsArticleFormConfig.fields}
                    logo={logo}
                    isAd={isAd}
                    setIsAd={setIsAd}
                    videoLink={videoLink}
                    setVideoLink={setVideoLink}
                    isMating={isMating}
                    setIsMating={setIsMating}
                />
            </Form>
        </Card>
    )
};

export default React.memo(AddArticle);
