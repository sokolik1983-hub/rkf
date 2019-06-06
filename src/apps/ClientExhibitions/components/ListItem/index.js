import React, {PureComponent} from 'react'
import {ClientExhibitionsPathContext} from "apps/ClientExhibitions/context";
import {Link} from "react-router-dom";

import './styles.scss'

class ClientExhibitionListItem extends PureComponent {

    render() {
        const {
            item
        } = this.props;
        const {id, city, name, time_start, time_end} = item;
        return (
            <ClientExhibitionsPathContext.Consumer>
                {
                    ({path}) =>
                        <div id={'exhibitionsListItem_' + id} className="exhibition-list-item">
                            <div className="exhibition-list-item__header">
                                <div className="exhibition-list-item__city">{city}</div>
                                <div
                                    className="exhibition-list-item__datetime">
                                    {time_start} - {time_end}
                                </div>
                            </div>
                            <div className="exhibition-list-item__title">{name}</div>
                            <div className="exhibition-list-item__controls">
                                <Link to={`${path}/${id}/details/common`} className="btn btn-primary">Смотреть</Link>
                            </div>
                        </div>
                }
            </ClientExhibitionsPathContext.Consumer>

        )
    }
}

export default ClientExhibitionListItem