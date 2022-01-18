import React from "react";
import {compose} from "redux";
import Button from "../../../../components/Button";
import ClubSocialForm from "./components/Form";
import ClientSocialList from "./components/List";
import {useVisibility} from "../../../../shared/hooks";
import {defaultReduxKey} from "./config";
import injectReducer from "../../../../utils/injectReducer";
import reducer from "./reducer";


const ClientClubSocialProxy = ({bindSubmitForm}) => {
    const {visibility, toggleVisibility, setInvisible} = useVisibility(false);
    
    if (!visibility) {
        bindSubmitForm.submit(null, {});
    }

    return (
        <div className='contacts__social'>
            <ClientSocialList />
            {visibility &&
                <ClubSocialForm hideForm={setInvisible} bindSubmitForm={bindSubmitForm} />
            }
            <Button
                className={visibility ? 'delete-mini' : false ? "add-max" : "add-mini"}
                onClick={toggleVisibility}
            >
                {visibility ? 'Отмена' : '+ Добавить ссылку'}
            </Button>
        </div>
    )
};

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});

export default compose(withReducer)(React.memo(ClientClubSocialProxy));