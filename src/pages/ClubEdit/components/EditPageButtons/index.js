import React from 'react';
import {connectClubPublicLink} from '../../connectors';

import './styles.scss';


const EditPageButtons = ({
        handleSubmitForms,
        handleSuccess,
}) => {

    return (
        <div className="Submit-button">
            {handleSubmitForms &&
                <button
                    className="Submit-button__save"
                    onClick={()=> {
                        handleSuccess();
                        handleSubmitForms();
                    }}
                >
                    Сохранить
                </button>
            }
        </div>
    )
};

export default connectClubPublicLink(React.memo(EditPageButtons));