import AuthOrLogin from "../Login/components/AuthOrLogin";
import ClickGuard from "../../components/ClickGuard";
import Loading from "../../components/Loading";
import {Form} from "../../components/Form";
import {editForm} from "../NBCEdit/config";
import RenderFields from "../NBCEdit/RenderFields";
import randomKeyGenerator from "../../utils/randomKeyGenerator";
import Alert from "../../components/Alert";
import React from "react";

const Content = ({
                     // isOpenFilters,
                     // setShowFilters,
                     // transformValues,
                     // handleSuccess,
                     // handleError,
                     // initialValues,
                     // showAlert,
                     // loading,
                     // nbcInfo
                 }) => {

    return (
        <p>1111111111111111111111111111111111111111</p>
        // <AuthOrLogin>
        //     <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})}/>
        //     <div className="nursery-edit__right">
        //         {loading
        //             ? <Loading/>
        //             : <Form
        //                 {...editForm}
        //                 initialValues={initialValues}
        //                 transformValues={transformValues}
        //                 onSuccess={handleSuccess}
        //                 onError={handleError}
        //                 className="nursery-edit__form"
        //                 withLoading={false}
        //                 nbcInfo={nbcInfo}
        //             >
        //                 <RenderFields
        //                     isOpenFilters={isOpenFilters}
        //                     setShowFilters={setShowFilters}
        //                     handleError={handleError}
        //                     randomKeyGenerator={randomKeyGenerator}
        //                 />
        //             </Form>
        //         }
        //         {showAlert && <Alert {...showAlert} />}
        //     </div>
        // </AuthOrLogin>
    );
};

export default Content;