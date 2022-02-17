import React from 'react';
import {connectClubPublicLink} from '../../connectors';

import './styles.scss';


const EditPageButtons = ({
        handleSubmitForms,
}) => {

    return (
        <div className="Submit-button">
            {handleSubmitForms &&
                <button
                    className="Submit-button__save"
                    onClick={()=> {
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