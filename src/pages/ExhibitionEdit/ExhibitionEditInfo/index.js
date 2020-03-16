import React, {useEffect, useState} from "react";
import {Form} from "../../../components/Form";
import RenderFields from "./RenderFields";
import {exhibitionInfoForm, pictureTypes} from "../config";
import {Request} from "../../../utils/request";
import {endpointEditExhibitionPicture} from "../config";
import "./index.scss";

const ExhibitionEditInfo = ({history, exhibition, documents_links, schedule_link, catalog_link}) => {
    const [initialValues, setInitialValues] = useState(null);
    const {
        id,
        name,
        description,
        rank_types,
        class_types,
        breed_types,
        city_id,
        address,
        exhibition_map_link,
        exhibition_avatar_link,
        dates,
        additional_info,
        address_additional_info
    } = exhibition;

    useEffect(() => {
        let values = {
            name,
            description,
            rank_types,
            class_types,
            breed_types,
            city_id,
            address,
            schedule_url: schedule_link ? schedule_link.url : '',
            schedule_name: schedule_link ? schedule_link.name : '',
            catalog_url: catalog_link ? catalog_link.url : '',
            catalog_name: catalog_link ? catalog_link.name : '',
            additional_info: additional_info || '',
            address_additional_info: address_additional_info || ''
        };

        if(documents_links && documents_links.length) {
            documents_links.forEach(item => {
                values[`docs_url_${item.id}`] = item.url;
                values[`docs_name_${item.id}`] = item.name;
            });
        }

        if(dates && dates.length) {
            dates.forEach(date => {
                values[`time_start_${date.id}`] = date.time_start || '';
                values[`time_end_${date.id}`] = date.time_end || '';
            });
        }

        setInitialValues(values);
    }, []);

    const addImg = async (value, type) => {
        let data = new FormData();
        data.append('exhibition_id', id);
        data.append('picture_type', type);
        data.append('file',  value);

        await Request({
            url: endpointEditExhibitionPicture + 'full',
            method: "POST",
            data: data,
            isMultipart: true
        });
    };

    const deleteImg = async type => {
        await Request({
            url: endpointEditExhibitionPicture + 'bytype',
            method: "DELETE",
            data: JSON.stringify({
                "exhibition_id": id,
                "picture_type": type
            })
        });
    };

    const transformValues = values => {
        let docLinks = [];
        let newDates = [...dates];
        Object.keys(values).forEach(key => {
            if(/docs_url/.test(key)) {
                const id = key.split('_')[2];

                docLinks.push({
                    name: values[`docs_name_${id}`],
                    url: values[key]
                });
            }

            if(/time_start/.test(key)) {
                const id = +key.split('_')[2];

                newDates.find(date => date.id === id).time_start = values[key] || null;
            }
            if(/time_end/.test(key)) {
                const id = +key.split('_')[2];

                newDates.find(date => date.id === id).time_end = values[key] || null;
            }
        });

         const data = {
            exhibition: {
                id,
                name: values.name,
                description: values.description,
                rank_types: values.rank_types,
                class_types: values.class_types,
                breed_types: values.breed_types,
                city_id: values.city_id,
                address: values.address,
                dates: newDates,
                additional_info: values.additional_info,
                address_additional_info: values.address_additional_info
            },
             documents_links: docLinks
        };

         if(values.schedule_url) {
             data.schedule_link = {
                 name: values.schedule_name,
                 url: values.schedule_url
             }
         }

         if(values.catalog_url) {
             data.catalog_link = {
                 name: values.catalog_name,
                 url: values.catalog_url
             }
         }

         return data;
    };

    const onSuccess = async (data, values) => {
        if(exhibition_avatar_link && !values.avatar) {
            await deleteImg(pictureTypes.AVATAR);
        }  else if(exhibition_avatar_link !== values.avatar) {
            await addImg(values.avatar, pictureTypes.AVATAR);
        }

        if(exhibition_map_link && !values.map) {
            await deleteImg(pictureTypes.MAP);
        } else if(exhibition_map_link !== values.map) {
            await addImg(values.map, pictureTypes.MAP);
        }

        history.push(`/exhibitions/${id}`);
    };

    if(!initialValues) return null;

    return (
        <Form
            className="exhibition-edit__info-form"
            initialValues={initialValues}
            transformValues={transformValues}
            onSuccess={onSuccess}
            {...exhibitionInfoForm}
        >
            <RenderFields
                avatar={exhibition_avatar_link}
                map={exhibition_map_link}
                documents={documents_links}
                dates={dates}
                onCancel={() => history.push(`/exhibitions/${id}`)}
                setInitialValues={setInitialValues}
            />
        </Form>
    )
};

export default React.memo(ExhibitionEditInfo);