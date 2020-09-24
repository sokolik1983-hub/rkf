import React, { useState, useEffect } from "react";
import { Form } from "../../../../components/Form";
import RenderFields from "./RenderFields";
import { formConfig, defaultValues, endpointDeleteNewsPicture, endpointAddNewsPicture, apiBreedsEndpoint } from "../../config";
import { Request } from "../../../../utils/request";
import "./index.scss";


const Edit = ({ id, text, img, videoLink, history, isAd, adBreedId, adCost, adNumberOfPuppies }) => {
    const [breeds, setBreeds] = useState([]);
    const [isMating, setIsMating] = useState(false);

    useEffect(() => {
        Request({
            url: apiBreedsEndpoint,
            method: "GET"
        }, data => setBreeds(data
            .filter(f => typeof f.id === 'number' && f.id !== 1)
            .map(m => ({ value: m.id, label: m.name }))
        ), e => console.log(e));
    }, []);

    const onSuccess = async (data, values) => {
        if (img && !values.file) {
            await Request({
                url: endpointDeleteNewsPicture + id,
                method: "DELETE"
            });
        } else if (img !== values.file) {
            let data = new FormData();
            data.append('id', id);
            data.append('file', values.file);

            await Request({
                url: endpointAddNewsPicture,
                method: "POST",
                data: data,
                isMultipart: true
            });
        }

        history.replace(`/news/${id}`);
    };

    const transformValues = values => {
        const { content,
            is_advert,
            advert_breed_id,
            advert_cost,
            advert_number_of_puppies,
            advert_type_id,
            video_link
        } = values;
        return {
            content: content.replace(/<[^>]*>/g, ''),
            id,
            is_advert,
            advert_breed_id: is_advert ? advert_breed_id : null,
            advert_cost: is_advert ? advert_cost : null,
            advert_number_of_puppies: is_advert && !isMating ? advert_number_of_puppies : null,
            advert_type_id: is_advert ? advert_type_id : null,
            video_link
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
            onSuccess={onSuccess}
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
                onCancel={() => history.replace(`/news/${id}`)}
                isMating={isMating}
                setIsMating={setIsMating}
            />
        </Form>
    )
};

export default React.memo(Edit);