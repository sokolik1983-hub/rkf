import React from "react";
import AuthOrLogin from "../Login/components/AuthOrLogin";
import ClickGuard from "../../components/ClickGuard";
import Loading from "../../components/Loading";
import {Form} from "../../components/Form";
import {editForm} from "./config";
import RenderFields from "./RenderFields";
import randomKeyGenerator from "../../utils/randomKeyGenerator";
import Alert from "../../components/Alert";

const Content = ({
                     isOpenFilters,
                     setShowFilters,
                     transformValues,
                     handleSuccess,
                     handleError,
                     initialValues,
                     showAlert,
                     loading,
                 }) => {

    return (
        <AuthOrLogin>
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})}/>
            <div className="nursery-edit__right">
                {loading
                    ? <Loading/>
                    : <Form
                        {...editForm}
                        initialValues={initialValues}
                        transformValues={transformValues}
                        onSuccess={handleSuccess}
                        onError={handleError}
                        className="nursery-edit__form"
                        withLoading={false}
                    >
                        <RenderFields
                            isOpenFilters={isOpenFilters}
                            setShowFilters={setShowFilters}
                            handleError={handleError}
                            randomKeyGenerator={randomKeyGenerator}
                        />
                    </Form>
                }
                {showAlert && <Alert {...showAlert} />}
            </div>
        </AuthOrLogin>
    );
};

export default Content;