import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {defaultReduxKey} from 'apps/ClientExhibitions/config'
import {ClientExhibitionsPathContext} from "apps/ClientExhibitions/context";
import {Link} from "react-router-dom";
import {getTimeFromDate} from "utils/datetime";
import './styles.scss'

class ClientExhibitionListItem extends PureComponent {

    render() {
        const {
            id,
            exhibition_name,
            cities,
            city,
            time_from,
            time_to
        } = this.props;
        return (
                <ClientExhibitionsPathContext.Consumer>
                {
                    ({path}) =>
                        <div id={'exhibitionsListItem_' + id} className="exhibition-list-item">
                            <div className="exhibition-list-item__header">
                                {/*<div className="exhibition-list-item__city">*/}
                                {/*    {cities[city.toString()].title}*/}
                                {/*</div>*/}
                                <div
                                    className="exhibition-list-item__datetime">
                                    {getTimeFromDate(time_from)} - {getTimeFromDate(time_to)}
                                </div>
                            </div>
                            <div className="exhibition-list-item__title">{exhibition_name}</div>
                            <div className="exhibition-list-item__controls">
                                <Link to={`${path}/${id}/details`} className="btn btn-primary">Смотреть</Link>
                            </div>
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