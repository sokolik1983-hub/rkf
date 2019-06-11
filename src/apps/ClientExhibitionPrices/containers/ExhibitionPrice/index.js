import React from 'react'
import {bindActionCreators} from "redux";
import {connect} from 'react-redux'
import Form from 'apps/ClientExhibitionPrices/components/ExhibitionPriceForm'
import {
    addExhibitionPrice,
    clearRequestErrors
} from 'apps/ClientExhibitionPrices/actions'

import {defaultReduxKey, exhibitionPricesForm} from "apps/ClientExhibitionPrices/config";

const {fields, validationSchema} = exhibitionPricesForm;

class ExhibitionPriceForomContainer extends React.PureComponent {

    handleSubmit = (values, {...other}) => {
        const {addExhibitionPrice, exhibitionId} = this.props;
        addExhibitionPrice({exhibition_id: exhibitionId, ...values})
    };

    render() {
        const {
            requestErrors,
            clearRequestErrors
        } = this.props;
        return (<Form
            formSubmit={this.handleSubmit}
            fields={fields}
            validationSchema={validationSchema}
            requestErrors={requestErrors}
            clearRequestErrors={clearRequestErrors}
        />)
    }
}

const mapStateToProps = (state) => {
    return {
        requestErrors: state[defaultReduxKey].requestErrors
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addExhibitionPrice,
    clearRequestErrors
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExhibitionPriceForomContainer)