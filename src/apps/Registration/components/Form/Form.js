import React from "react";
import {Redirect} from 'react-router-dom'
import {FormFormikEnhanced} from "components/Form";

import {connectRegistrationForm} from 'apps/Registration/connectors'
import {registrationSuccessPath} from "apps/Registration/config";


function RegistrationForm({
                              config,
                              transformValues,
                              registerUserSuccess,
                              registrationComplete,
                              children
                          }) {
    const handleSuccess = () => registerUserSuccess();
    return registrationComplete ?
        <Redirect to={registrationSuccessPath}/>
        :
        (
            <FormFormikEnhanced
                className="RegistrationForm__form"
                onSuccess={handleSuccess}
                {...config}
            >
                {children}
            </FormFormikEnhanced>
        )
}

export default connectRegistrationForm(RegistrationForm)