import React, {PureComponent} from 'react'
import {Link} from "react-router-dom"
import Card from 'components/Card'
import ClientExhibitionListItem from './ListItem'
import {connectClientExhibitionsList} from 'apps/ClientExhibitions/connectors'
import {ClientExhibitionsPathContext} from 'apps/ClientExhibitions/context'

class ClientExhibitionsList extends PureComponent {
    componentDidMount() {
        this.props.getExhibitionList()
    }

    render() {

        return (

            <Card lg>
                <ClientExhibitionsPathContext.Consumer>
                    {
                        ({path}) =>
                            <div className="client-exhibitions">
                                {/*<div style={{textAlign: 'right'}}>
                                    <Link className="btn btn-primary" to={`${path}/add`}>Создать выставку</Link>
                                </div>*/}
                                {
                                    this.props.exhibitionIdList.map(id => <ClientExhibitionListItem key={id} exhibitionId={id}/>)
                                }
                            </div>
                    }
                </ClientExhibitionsPathContext.Consumer>
            </Card>
        )
    }
}

export default connectClientExhibitionsList(ClientExhibitionsList)