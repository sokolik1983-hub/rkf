import React, { useState, useEffect } from "react";
import Alert from "../../../../components/Alert";
import { Form } from "../../../../components/Form";
import RenderFields from "./RenderFields";
import { formConfig, formConfigSecondCat, defaultValues, apiBreedsEndpoint, apiSexEndpoint, apiCityEndpoint } from "../../config";
import { Request } from "../../../../utils/request";
import {boolean, number, object, string, array} from "yup";
import ls from "local-storage";

import "./index.scss";

const Edit = ({ id,
                  text,
                  pictures,
                  videoLink,
                  documents,
                  history,
                  isAd,
                  adBreedId,
                  adCost,
                  adNumberOfPuppies,
                  dogColor,
                  dogName,
                  dogAge,
                  dogSex,
                  advertTypeId,
                  advertCategoryId,
                  isHalfBreed,
                  dogCity,
                isAllCities
    }) => {
    const [breeds, setBreeds] = useState([]);
    const [sex, setSex] = useState([]);
    const [docs, setDocs] = useState(documents || []);
    const [categories, setCategories] = useState(null);
    const [isMating, setIsMating] = useState(false);
    const [showAlert, setShowAlert] = useState('');
    const [cities, setCities] = useState(null);
    const [liveAdvertId, setLiveAdvertId] = useState(advertTypeId);
    const user_type = ls.get('user_info').user_type;
    const alias = ls.get('user_info').alias;

    const currentCityId = (advertTypeId !==6)
        ?
        (dogCity?.length > 0) ? dogCity[0].id : null
        :
        dogCity?.map(m => ({ value: m.id, label: m.name }));


    const CategoryNullSchema = object().shape({
        content: string().required('Поле не может быть пустым'),
    }); //Валидация для обычных новостей
    const CategoryOneSchema = object().shape({
        content: string().required('Поле не может быть пустым'),
        is_advert: boolean(),
        advert_breed_id: number()
            .when(['is_advert'], {
                is: true,
                then: number().required('Поле не может быть пустым'),
                otherwise: number().notRequired(),
            }),
        advert_number_of_puppies: number()
            .when(['is_advert'], {
                is: true,
                then: number().min(1, 'Значение не может быть меньше 1')
                    .max(99, 'Значение не может быть больше 99')
                    .typeError('Введите число'),
                otherwise: number().notRequired(),
            }),
        advert_type_id: number()
            .when(['is_advert'], {
                is: true,
                then: number().nullable().required('Выберите категорию'),
                otherwise: number().notRequired(),
            }),
        advert_cost: isAd ? number().required('Введите цифры.').typeError('Введите цифры.') : '',
    }); //Валидация для объявлений категории 1
    const CategoryTwoSchema = object().shape({
        content: string().required('Поле не может быть пустым'), //++
        dog_name: string().required('Поле не может быть пустым'),
        dog_sex_type_id: string().required('Поле не может быть пустым'),
        is_advert: boolean(),
        advert_breed_id: number()
            .when(['is_halfbreed'], {
                is: false,
                then: number().required('Поле не может быть пустым'),
                otherwise: number().notRequired(),
            }),
        dog_city: (liveAdvertId === 6)
            ?
            array()
            .when(['is_all_cities'], {
                is: false,
                then: array().nullable().required('Выберите категорию'),
                otherwise: array().notRequired(),
            })
            :
            number().required('Поле не может быть пустым'),
        advert_type_id: number()
            .when(['is_advert'], {
                is: true,
                then: number().nullable().required('Выберите категорию'),
                otherwise: number().notRequired(),
            }),
    }); //Валидация для объявлений категории 2
    const initialValueCatOne = {
        ...defaultValues,
        is_advert: isAd,
        advert_breed_id: adBreedId,
        advert_cost: adCost,
        advert_number_of_puppies: adNumberOfPuppies,
        content: text,
        pictures: pictures,
        video_link: videoLink,
        dog_color: dogColor,
        dog_age: dogAge,
        dog_sex_type_id: dogSex,
        advert_type_id: advertTypeId,
        advert_category_id: advertCategoryId,
    }; //Initial Values для объявлений категории 1
    const initialValueCatTwo = {
        ...defaultValues,
        is_advert: isAd,
        advert_breed_id: adBreedId,
        content: text,
        pictures: pictures,
        video_link: videoLink,
        dog_color: dogColor,
        dog_name: dogName,
        dog_age: dogAge,
        dog_sex_type_id: dogSex,
        dog_city: currentCityId,
        advert_type_id: advertTypeId,
        advert_category_id: advertCategoryId,
        is_halfBreed: isHalfBreed,
        is_all_cities: isAllCities
    } //Initial Values для объявлений категории 2
    const initialValueCatNull = {
        ...defaultValues,
        content: text
    }; //Initial Values для обычных новостей


    useEffect(() => {
        Request({
            url: apiBreedsEndpoint,
        }, data => setBreeds(data
            .filter(f => typeof f.id === 'number' && f.id !== 1)
            .map(m => ({ value: m.id, label: m.name }))
        ), e => console.log(e));
    }, []);

    useEffect(() => {
        Request({
            url: apiCityEndpoint,
        }, data => setCities(data
            .filter(f => typeof f.id === 'number' && f.id !== 1)
            .map(m => ({ value: m.id, label: m.name }))
        ), e => console.log(e));
    }, []);

    useEffect(() => {
        Request({
            url: apiSexEndpoint,
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
            pictures,
            new_pictures,
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
            dog_color: dog_color ? dog_color : '',
            dog_age: dog_age ? dog_age : '',
            advert_cost: is_advert ? advert_cost : '',
            advert_number_of_puppies: is_advert && !isMating ? advert_number_of_puppies : '',
            advert_type_id: is_advert ? advert_type_id : '',
            pictures: pictures || '',
            new_pictures: new_pictures || '',
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
            dog_name,
            dog_age,
            dog_sex_type_id,
            dog_city,
            pictures,
            new_pictures,
            is_halfbreed,
            is_all_cities
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
            is_all_cities: is_all_cities ? is_all_cities : '',
            dog_color: dog_color ? dog_color : '',
            dog_name: dog_name ? dog_name : '',
            dog_age: dog_age ? dog_age : '',
            advert_cost: is_advert ? advert_cost : '',
            advert_number_of_puppies: is_advert && !isMating ? advert_number_of_puppies : '',
            advert_type_id: is_advert ? advert_type_id : '',
            pictures: pictures || [],
            new_pictures: new_pictures || [],
            video_link: video_link || '',
            documents
        };
    };
    const transformValuesForCatNull = values => {

        const {
            content,
            is_advert,
            video_link,
            pictures,
            new_pictures
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
            pictures: pictures || [],
            new_pictures: new_pictures || [],
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
                onSuccess={() => {
                    history.replace(user_type === 4 ?
                        `/kennel/${alias}` :
                            user_type === 1 ?
                                `/user/${alias}` :
                                user_type === 3 ?
                                    `/club/${alias}` :
                                    user_type === 7 ?
                                        `/nbc/${alias}`
                                            :
                                            `/${alias}`)
                }
            }
                onError={onError}
                isEditPage
                history={history}
                transformValues={(advertCategoryId === 1) ? transformValues : (advertCategoryId === 2) ? transformValuesForOtherAdvert : transformValuesForCatNull}
                validationSchema={(advertCategoryId === 1) ? CategoryOneSchema : (advertCategoryId === 2) ? CategoryTwoSchema : CategoryNullSchema}
                initialValues={(advertCategoryId === 1) ? initialValueCatOne : (advertCategoryId === 2) ? initialValueCatTwo : initialValueCatNull}
                {...formConfig}
                {...formConfigSecondCat}
            >
                <RenderFields
                    fields={(advertCategoryId === 1) ? formConfig.fields : formConfigSecondCat.fields}
                    breeds={breeds}
                    sex={sex}
                    text={text}
                    imgSrc={pictures}
                    videoLink={videoLink}
                    docs={docs}
                    setDocs={setDocs}
                    categories={categories}
                    setCategories={setCategories}
                    onCancel={() => history.replace(`/news/${id}`)}
                    isMating={isMating}
                    setIsMating={setIsMating}
                    dogSex={dogSex}
                    advertTypeId={advertTypeId}
                    advertCategoryId={advertCategoryId}
                    isHalfBreed={isHalfBreed}
                    isAllCities={isAllCities}
                    adBreedId={adBreedId}
                    currentCityId={currentCityId}
                    cities={cities}
                    setLiveAdvertId={setLiveAdvertId}
                />
            </Form>
            {showAlert && <Alert {...showAlert} />}
        </>
    )
};

export default React.memo(Edit);