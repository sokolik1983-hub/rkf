import React, {PureComponent} from 'react'

import {ClientExhibitionsPathContext} from "apps/ClientExhibitions/context";
import ClientExhibitionListItem from '../ListItem'
import {formatDateWithLocaleString, transformDate} from "utils/datetime";
import './styles.scss'

class ClientExhibitionListDay extends PureComponent {

    render() {
        const {
            day,
            month,
            year,
            items
        } = this.props;

        const date = transformDate({day, month, year})

        return (
            <ClientExhibitionsPathContext.Consumer>
                {
                    ({path}) =>
                        <div>
                            {formatDateWithLocaleString(date)}

                            {
                                items.map(item => <ClientExhibitionListItem key={item.id} item={item}/>)
                            }
                        </div>
                }
            </ClientExhibitionsPathContext.Consumer>

        )
    }
}

export default ClientExhibitionListDay;