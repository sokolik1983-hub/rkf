import React, { useState, useEffect } from "react";
import Alert from "components/Alert";
import { Form } from "components/Form";
import RenderFields from "./RenderFields";
import { formConfig, defaultValues, apiBreedsEndpoint } from "./config";
import { Request } from "utils/request";
import "./index.scss";

const EditForm = ({ id, text, img, videoLink, documents, history, isAd, adBreedId, adCost, adNumberOfPuppies, handleSuccess }) => {
    const [breeds, setBreeds] = useState([]);
    const [docs, setDocs] = useState(documents || []);
    const [categories, setCategories] = useState(null);
    const [isMating, setIsMating] = useState(false);
    const [isImageDelete, setIsImageDelete] = useState(false);
    const [showAlert, setShowAlert] = useState('');

    useEffect(() => {
        Request({
            url: apiBreedsEndpoint,
            method: "GET"
        }, data => setBreeds(data
            .filter(f => typeof f.id === 'number' && f.id !== 1)
            .map(m => ({ value: m.id, label: m.name }))
        ), e => console.log(e));
    }, []);

    const transformValues = values => {
        const {
            content,
            is_advert,
            advert_breed_id,
            advert_cost,
            advert_number_of_puppies,
            advert_type_id,
            video_link,
            file
        } = values;

        const documents = docs.map(item => {
            return {
                id: item.id,
                name: item.name
            }
        });

        return {
            content: content.replace(/<[^>]*>/g, ''),
            id,
            is_advert,
            advert_breed_id: is_advert ? advert_breed_id : '',
            advert_cost: is_advert ? advert_cost : '',
            advert_number_of_puppies: is_advert && !isMating ? advert_number_of_puppies : '',
            advert_type_id: is_advert ? advert_type_id : '',
            image: isImageDelete ? file : '',
            is_image_delete: isImageDelete,
            video_link: video_link || '',
            documents
        };
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
        <>
            <Form
                className="article-edit"
                withLoading={true}
                onSuccess={() => handleSuccess()}
                onError={onError}
                transformValues={transformValues}
                initialValues={{
                    ...defaultValues,
                    is_advert: isAd,
                    advert_breed_id: adBreedId,
                    advert_cost: adCost,
                    advert_number_of_puppies: adNumberOfPuppies,
                    content: text,
                    img: img,
                    video_link: videoLink
                }}
                {...formConfig}
            >
                <RenderFields
                    fields={formConfig.fields}
                    breeds={breeds}
                    text={text}
                    imgSrc={img}
                    videoLink={videoLink}
                    docs={docs}
                    setDocs={setDocs}
                    categories={categories}
                    setCategories={setCategories}
                    onCancel={() => history.replace(`/news/${id}`)}
                    isMating={isMating}
                    setIsMating={setIsMating}
                    setIsImageDelete={setIsImageDelete}
                />
            </Form>
            {showAlert && <Alert {...showAlert} />}
        </>
    )
};

export default React.memo(EditForm);