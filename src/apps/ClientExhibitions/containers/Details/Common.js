import React, {PureComponent} from 'react'
import {bindActionCreators} from 'redux'
import ExhibitionUpdateForm from 'apps/ClientExhibitions/containers/ExhibitionUpdateForm'
import {getExhibitionDetails} from "../../actions";
import {defaultReduxKey} from "../../config";
import {connect} from "react-redux";

class DetailsCommon extends PureComponent {
    render() {
        return (
            <div className="exhibition-details__common">
                <ExhibitionUpdateForm formInitials={this.props.formInitials}/>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    getExhibitionDetails
}, dispatch);

const mapsStateToProps = (state, props) => {
    const {path, url, params} = props.match;

    const {id} = params;
    const formInitials = state[defaultReduxKey].exhibitionsDetails[id.toString()];
    console.log('formInitials',formInitials)
    return {
        path,
        url,
        formInitials,
        exhibitionId: id
    }
};

export default connect(
    mapsStateToProps,
    mapDispatchToProps
)(DetailsCommon)

