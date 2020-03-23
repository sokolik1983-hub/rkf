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
    const btnStyle = {
        display: 'flex',
        padding: '6px 0',
        color: '#3366FF',
        flex: '1 0'
    };

    if (!visibility && bindSubmitForm) {
        bindSubmitForm.submit(null, {});
    }

    return (
        <div>
            <ClientDocumentList />
            {visibility &&
                <ClubDocumentsForm hideForm={setInvisible} bindSubmitForm={bindSubmitForm} />
            }
            <Button
                style={btnStyle}
                className="btn-transparent"
                onClick={toggleVisibility}
            >
                {visibility ? 'Отмена' : '+ Добавить документ'}
            </Button>
        </div>
    )
};

const withReducer = injectReducer({ key: defaultReduxKey, reducer: reducer });

export default compose(withReducer)(React.memo(ClientClubDocumentsProxy));