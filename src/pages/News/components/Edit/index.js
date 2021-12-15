import React, { useState, useEffect } from "react";
import Alert from "../../../../components/Alert";
import { Form } from "../../../../components/Form";
import RenderFields from "./RenderFields";
import { formConfig, defaultValues, apiBreedsEndpoint, apiSexEndpoint, apiCityEndpoint } from "../../config";
import { Request } from "../../../../utils/request";
import "./index.scss";


const Edit = ({ id,
                  text,
                  img,
                  videoLink,
                  documents,
                  history,
                  isAd,
                  adBreedId,
                  adCost,
                  adNumberOfPuppies,
                  dogColor,
                  dogAge,
                  dogSex,
                  advertTypeId,
                  advertCategoryId,
                  isHalfBreed,
                  dogCity
    }) => {
    const [breeds, setBreeds] = useState([]);
    const [sex, setSex] = useState([]);
    const [docs, setDocs] = useState(documents || []);
    const [categories, setCategories] = useState(null);
    const [isMating, setIsMating] = useState(false);
    const [isImageDelete, setIsImageDelete] = useState(false);
    const [showAlert, setShowAlert] = useState('');

    console.log('advertCategoryId', advertCategoryId);
    // console.log('adBreedId', adBreedId, dogCity[0].id);

    useEffect(() => {
        Request({
            url: apiBreedsEndpoint,
            method: "GET"
        }, data => setBreeds(data
            .filter(f => typeof f.id === 'number' && f.id !== 1)
            .map(m => ({ value: m.id, label: m.name }))
        ), e => console.log(e));
    }, []);

    useEffect(() => {
        Request({
            url: apiSexEndpoint,
            method: "GET"
        }, data => setSex(data.map(m => ({ label: m.name }))
        ),      e => console.log(e));
    }, []);

    const transformValues = values => {

        const {
            content,
            is_advert,
            advert_breed_id,
            advert_cost,
            advert_number_of_puppies,
            advert_type_id,
            advert_category_id,
            video_link,
            dog_color,
            dog_age,
            dog_sex_type_id,
            // dog_city,
            file,
            // is_halfbreed
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
            advert_category_id: is_advert ? advert_category_id : '',
            dog_sex_type_id: dog_sex_type_id  ? dog_sex_type_id : '',
            // dog_city: is_advert  ? dog_city : '',
            // is_halfbreed: is_advert  ? is_halfbreed : '',
            dog_color: dog_color ? dog_color : '',
            dog_age: dog_age ? dog_age : '',
            advert_cost: is_advert ? advert_cost : '',
            advert_number_of_puppies: is_advert && !isMating ? advert_number_of_puppies : '',
            advert_type_id: is_advert ? advert_type_id : '',
            image: isImageDelete ? file : '',
            is_image_delete: isImageDelete,
            video_link: video_link || '',
            documents
        };
    };
    const transformValuesForOtherAdvert = values => {

        const {
            content,
            is_advert,
            advert_breed_id,
            advert_cost,
            advert_number_of_puppies,
            advert_type_id,
            advert_category_id,
            video_link,
            dog_color,
            dog_age,
            dog_sex_type_id,
            dog_city,
            file,
            is_halfbreed
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
            dog_city: is_advert  ? dog_city : '',
            advert_category_id: is_advert ? advert_category_id : '',
            dog_sex_type_id: dog_sex_type_id  ? dog_sex_type_id : '',
            is_halfbreed: is_advert  ? is_halfbreed : '',
            dog_color: dog_color ? dog_color : '',
            dog_age: dog_age ? dog_age : '',
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
                onSuccess={() => history.replace(`/news/${id}`)}
                onError={onError}
                isEditPage
                history={history}
                transformValues={(advertCategoryId === 1) ? transformValues : transformValuesForOtherAdvert}
                initialValues={{
                    ...defaultValues,
                    is_advert: isAd,
                    advert_breed_id: adBreedId,
                    advert_cost: adCost,
                    advert_number_of_puppies: adNumberOfPuppies,
                    content: text,
                    img: img,
                    video_link: videoLink,
                    dog_color: dogColor,
                    dog_age: dogAge,
                    dog_sex_type_id: dogSex,
                    dog_city: dogCity[0].id,
                    advert_type_id: advertTypeId,
                    advert_category_id: advertCategoryId,
                    is_halfBreed: isHalfBreed,
                }}
                {...formConfig}
            >
                <RenderFields
                    fields={formConfig.fields}
                    breeds={breeds}
                    sex={sex}
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
                    dogSex={dogSex}
                    advertTypeId={advertTypeId}
                    advertCategoryId={advertCategoryId}
                    isHalfBreed={isHalfBreed}
                />
            </Form>
            {showAlert && <Alert {...showAlert} />}
        </>
    )
};

export default React.memo(Edit);