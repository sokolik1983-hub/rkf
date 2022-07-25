import React, {memo, useCallback, useEffect, useState} from "react";
import Layout from "../../../../components/Layouts";
import ClickGuard from "../../../../components/ClickGuard";
import Loading from "../../../../components/Loading";
import {Form} from "../../../../components/Form";
import Alert from "../../../../components/Alert";
import RenderFields from "./RenderFields";
import {Request} from "../../../../utils/request";
import {defaultValues, editForm} from "./config";
import {connectShowFilters} from "../../../../components/Layouts/connectors";
import "./index.scss";


const NKPEdit = ({isOpenFilters, setShowFilters, isMobile}) => {
    const [loading, setLoading] = useState(true);
    const [initialValues, setInitialValues] = useState(defaultValues);
    const [alertData, setAlertData] = useState(null);

    useEffect(() => {
        getEditInfo();
    }, []);

    const getEditInfo = useCallback(async () => {
        setLoading(true);

        await Request({
            url: '/api/NationalBreedClub/edit_info'
        }, data => {
            if(data) {
                setInitialValues(prev => ({...prev, ...data}));
            }
        }, error => {
            console.log(error.response);
        });

        setLoading(false);
    }, []);

    const transformValues = values => {
        let newValues = {...values};

        return newValues;
    };

    const handleSuccess = data => {
        //запись в Редакс, если изменилось имя, алиас и т.п.
        setAlertData({
            title: 'Сохранение данных',
            text: 'Данные сохранены!',
            autoclose: 2.5,
            onOk: () => setAlertData(null)
        });
    };

    const handleError = e => {
        const errorText = e.response.data.errors
            ? Object.values(e.response.data.errors)
            : `${e.response.status} ${e.response.statusText}`;

        setAlertData({
            title: `Ошибка: ${errorText}`,
            text: 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.',
            autoclose: 7.5,
            onOk: () => setAlertData(null)
        });
    };

    return (
        <Layout layoutWithFilters>
            {isMobile &&
                <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})}/>
            }
            {loading ?
                <Loading/> :
                <Form
                    className="nbc-edit"
                    {...editForm}
                    initialValues={initialValues}
                    transformValues={transformValues}
                    onSuccess={handleSuccess}
                    onError={handleError}
                >
                    <RenderFields
                        isOpenFilters={isOpenFilters}
                        setShowFilters={setShowFilters}
                    />
                </Form>
            }
            {alertData && <Alert {...alertData} />}
        </Layout>
    );
};

export default memo(connectShowFilters(NKPEdit));