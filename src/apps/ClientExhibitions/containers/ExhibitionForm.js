import React, {PureComponent} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Card from 'components/Card'
import Form from 'apps/ClientExhibitions/components/Forms/ExhibitionForm'
import {defaultReduxKey, firstStepForm} from "apps/ClientExhibitions/config";


import {
    addExhibition,
    clearRequestErrors,
} from 'apps/ClientExhibitions/actions'

const {fields,validationSchema} = firstStepForm;

class ExhibitionForm extends PureComponent {
    createExhibition = (values, {other}) => {
        const {addExhibition} = this.props;
        addExhibition(values)
    };

    render() {
        const {loading, user_info, formInitials} = this.props;
        return (
            <Card lg>
                <Form
                    formInitials={formInitials}
                    user_info={user_info}
                    fields={fields}
                    formSubmit={this.createExhibition}
                    loading={loading}
                    validationSchema={validationSchema}
                />
            </Card>
        )
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
)(ExhibitionForm)