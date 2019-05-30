import React, {PureComponent} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Form from 'apps/ClientExhibitions/components/Forms/ExhibitionForm'
import {defaultReduxKey} from "apps/ClientExhibitions/config";
import {
    addExhibition,
    clearRequestErrors,
} from 'apps/ClientExhibitions/actions'

class ExhibitionForm extends PureComponent {
    createExhibition = (values, {other}) => {
        const {addExhibition} = this.props;
        addExhibition(values)
    };

    render() {
        const {loading} = this.props;
        return (
            <Form
                formSubmit={this.createExhibition}
                loading={loading}
            />
        )
    }
}

const mapsStateToProps = state => ({
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