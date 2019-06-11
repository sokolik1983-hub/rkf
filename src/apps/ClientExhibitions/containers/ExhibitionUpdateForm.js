import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Card from 'components/Card'
import Form from 'apps/ClientExhibitions/components/Forms/ExhibitionForm'
import {defaultReduxKey, firstStepForm} from "apps/ClientExhibitions/config";


import {
    addExhibition,
    clearRequestErrors,
} from 'apps/ClientExhibitions/actions'

const {fields, validationSchema} = firstStepForm;

class ExhibitionUpdateForm extends Component {
    createExhibition = (values, {other}) => {
        const {addExhibition} = this.props;
        addExhibition(values)
    };

    render() {
        const {loading, user_info, formInitials} = this.props;

        return formInitials ? (
            <Card lg>
                <Form
                    disabled
                    formInitials={formInitials}
                    user_info={user_info}
                    fields={fields}
                    formSubmit={this.createExhibition}
                    loading={loading}
                    validationSchema={validationSchema}
                />
            </Card>
        ) : null
    }
}

const mapsStateToProps = state => ({
    user_info: state.authentication.user_info,
    loading: state[defaultReduxKey].loading,
    requestErrors: state[defaultReduxKey].requestErrors,
});


const mapDispatchToProps = dispatch => bindActionCreators({
    addExhibition,
    clearRequestErrors,
}, dispatch);

export default connect(
    mapsStateToProps,
    mapDispatchToProps
)(ExhibitionUpdateForm)