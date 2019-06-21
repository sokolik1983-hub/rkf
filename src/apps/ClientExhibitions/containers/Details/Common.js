import React, {PureComponent} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import ExhibitionUpdateForm from 'apps/ClientExhibitions/containers/ExhibitionUpdateForm'
import {getExhibitionDetails} from "apps/ClientExhibitions/actions";
import {getExhibitionsDetailsById} from 'apps/ClientExhibitions/selectors'

class DetailsCommon extends PureComponent {
    render() {
        return <ExhibitionUpdateForm formInitials={this.props.formInitials}/>
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getExhibitionDetails
}, dispatch);

const mapsStateToProps = (state, props) => {
    const {exhibitionsDetails} = getExhibitionsDetailsById(state, props);
    return {
        formInitials: exhibitionsDetails,
    }
};

export default connect(
    mapsStateToProps,
    mapDispatchToProps
)(DetailsCommon)

