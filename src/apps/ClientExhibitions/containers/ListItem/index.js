import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {defaultReduxKey} from 'apps/ClientExhibitions/config'
import './styles.scss'
import {ClientExhibitionsPathContext} from "apps/ClientExhibitions/context";
import {Link} from "react-router-dom";

class ClientExhibitionListItem extends PureComponent {

    render() {
        const {id, exhibition_name} = this.props;
        return (
                <ClientExhibitionsPathContext.Consumer>
                {
                    ({path}) =>
                        <div className="client-exhibitions__list-item">
                                <h3><Link to={`${path}/${id}/details`}>{exhibition_name}</Link></h3>
                        </div>
                }
            </ClientExhibitionsPathContext.Consumer>

        )
    }
}

const mapStateToProps = (state, props) => {
    return {...state[defaultReduxKey].exhibitions[props.exhibitionId.toString()]}
};

export default connect(
    mapStateToProps,
)(ClientExhibitionListItem)