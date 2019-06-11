import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import ExhibitionUpdateForm from 'apps/ClientExhibitions/containers/ExhibitionUpdateForm'
import {getExhibitionDetails} from "../../actions";
import {defaultReduxKey} from "../../config";
import {connect} from "react-redux";

class DetailsCommon extends Component {
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
    const {params} = props.match;
    const {id} = params;
    const formInitials = state[defaultReduxKey].exhibitionsDetails[id.toString()];
    return {
        formInitials,
    }
};

export default connect(
    mapsStateToProps,
    mapDispatchToProps
)(DetailsCommon)

