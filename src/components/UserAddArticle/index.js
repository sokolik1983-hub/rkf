import React, { useState } from "react";
import { number, object, string } from "yup";
import Card from "../Card";
import Alert from "../Alert";
import { Form } from "../Form";
import RenderFields from "./RenderFields";
import { newsArticleFormConfig } from "./config";
import "./index.scss";


const AddArticle = ({ id, logo, setNeedRequest, userPage, profileInfo, setProfileInfo }) => {
    const [isAd, setIsAd] = useState(false);
    const [videoLink, setVideoLink] = useState('');
    const [documents, setDocuments] = useState([]);
    const [isMating, setIsMating] = useState(false);
    const [showAlert, setShowAlert] = useState('');
    const [loadFile, setLoadFile] = useState(false);

    const transformValues = values => {
        if (isAd) {
            return {
                ...values,
                advert_number_of_puppies: isMating ? `` : +values.advert_number_of_puppies,
                is_advert: true,
                club_id: id,
                documents
            }
        } else {
            return {
                content: values.content,
                file: values.file,
                video_link: values.video_link || '',
                club_id: id,
                documents
            }
        }
    };

    const onSuccess = () => {
        console.log(newsArticleFormConfig.fields);
        console.log(transformValues.values);
        console.log(documents);
        if(!!setProfileInfo){
            setProfileInfo({...profileInfo, 
                counters: {
                    ...profileInfo.counters,
                    publications_count: profileInfo.counters.publications_count + 1,
                    photos_count: loadFile ? profileInfo.counters.photos_count + 1 : profileInfo.counters.photos_count
                }});
        }
        setVideoLink('');
        setDocuments([]);
        setLoadFile(false);
        setNeedRequest(true);
    };

    const onError = e => {
        if (e.response) {
            let errorText = e.response.data.errors
                ? Object.values(e.response.data.errors)
                : `${e.response.status} ${e.response.statusText}`;
            setShowAlert({
                title: `Ошибка: ${errorText}`,
                text: 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.',
                autoclose: 7.5,
                onOk: () => setShowAlert(false)
            });
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
                        advert_type_id: isAd ? number().nullable().required('Выберите категорию') : '',
                        advert_cost: isAd ? number().required('Введите цифры. Поле не может быть пустым').typeError('Введите цифры. Поле не может быть пустым') : ''
                    })}
                initialValues={{
                    advert_breed_id: '',
                    advert_cost: '',
                    advert_number_of_puppies: '',
                    advert_type_id: ''
                }}
                {...newsArticleFormConfig}
                transformValues={transformValues}
                onSuccess={onSuccess}
                onError={onError}
            >
                <RenderFields
                    fields={newsArticleFormConfig.fields}
                    logo={logo}
                    isAd={isAd}
                    setIsAd={setIsAd}
                    videoLink={videoLink}
                    setVideoLink={setVideoLink}
                    documents={documents}
                    setDocuments={setDocuments}
                    isMating={isMating}
                    setIsMating={setIsMating}
                    userPage={userPage}
                    setLoadFile = {setLoadFile}
                />
            </Form>
            {showAlert && <Alert {...showAlert} />}
        </Card>
    )
};

export default React.memo(AddArticle);