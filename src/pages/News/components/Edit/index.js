import React, { useState, useEffect } from "react";
import { Form } from "../../../../components/Form";
import RenderFields from "./RenderFields";
import { formConfig, defaultValues, apiBreedsEndpoint } from "../../config";
import { Request } from "../../../../utils/request";
import "./index.scss";


const Edit = ({ id, text, img, videoLink, documents, history, isAd, adBreedId, adCost, adNumberOfPuppies }) => {
    const [breeds, setBreeds] = useState([]);
    const [docs, setDocs] = useState(documents || []);
    const [isMating, setIsMating] = useState(false);
    const [isImageDelete, setIsImageDelete] = useState(false);

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

        console.log('file', file);

        const documents = docs.map(item => {
            if (!item.file) item.file = '';
            return item;
        });

        return {
            content: content.replace(/<[^>]*>/g, ''),
            id,
            is_advert,
            advert_breed_id: is_advert ? advert_breed_id : '',
            advert_cost: is_advert ? advert_cost : '',
            advert_number_of_puppies: is_advert && !isMating ? advert_number_of_puppies : '',
            advert_type_id: is_advert ? advert_type_id : '',
            file: isImageDelete ? file : '',
            is_image_delete: isImageDelete,
            video_link: video_link || '',
            documents
        };
    };

    const initialValues = {
        ...defaultValues,
        is_advert: isAd,
        advert_breed_id: adBreedId,
        advert_cost: adCost,
        advert_number_of_puppies: adNumberOfPuppies,
        content: text,
        img: img,
        video_link: videoLink
    };

    return (
        <Form
            onSuccess={() => history.replace(`/news/${id}`)}
            transformValues={transformValues}
            initialValues={initialValues}
            {...formConfig}
            className="article-edit"
        >
            <RenderFields
                fields={formConfig.fields}
                breeds={breeds}
                text={text}
                imgSrc={img}
                videoLink={videoLink}
                docs={docs}
                setDocs={setDocs}
                onCancel={() => history.replace(`/news/${id}`)}
                isMating={isMating}
                setIsMating={setIsMating}
                setIsImageDelete={setIsImageDelete}
            />
        </Form>
    )
};

export default React.memo(Edit);