import React, {PureComponent} from 'react'

import {ClientExhibitionsPathContext} from "apps/ClientExhibitions/context";
import ClientExhibitionListItem from '../ListItem'
//import {transformDate,formatDateCommon} from "utils/datetime";
import './styles.scss'

class ClientExhibitionListDay extends PureComponent {

    render() {
        const {
            day,
            month,
            year,
            items
        } = this.props;

        //const date = formatDateCommon(transformDate(day))
        return (
                <ClientExhibitionsPathContext.Consumer>
                {
                    ({path}) =>
                        <div>
                            {day}.{month}.{year}
                            {
                                items.map(item=><ClientExhibitionListItem key={item.id} item={item}/>)
                            }
                        </div>
                }
            </ClientExhibitionsPathContext.Consumer>

        )
    }
}
export default ClientExhibitionListDay;