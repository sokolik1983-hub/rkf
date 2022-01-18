import React from "react";
import {compose} from "redux";
import Button from "../../../../components/Button";
import ClientDocumentList from "./components/List";
import ClubDocumentsForm from "./components/Form";
import {useVisibility} from "../../../../shared/hooks";
import {defaultReduxKey} from "./config";
import injectReducer from "../../../../utils/injectReducer";
import reducer from "./reducer";


const ClientClubDocumentsProxy = ({bindSubmitForm}) => {
    const {visibility, toggleVisibility, setInvisible} = useVisibility(false);

    if (!visibility && bindSubmitForm) {
        bindSubmitForm.submit(null, {});
    }

    return (
        <>
            <ClientDocumentList />
            {visibility &&
                <ClubDocumentsForm hideForm={setInvisible} bindSubmitForm={bindSubmitForm} />
            }
            <Button
                className={visibility ? 'delete-mini' : false ? "add-max" : "add-mini"}
                onClick={toggleVisibility}
            >
                {visibility ? 'Удалить' : '+ Добавить документ'}
            </Button>
        </>
    )
};

const withReducer = injectReducer({ key: defaultReduxKey, reducer: reducer });

export default compose(withReducer)(React.memo(ClientClubDocumentsProxy));