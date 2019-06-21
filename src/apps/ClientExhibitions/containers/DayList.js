import React, {PureComponent} from 'react'
import {bindActionCreators} from 'redux'
import {Link} from "react-router-dom";
import {ClientExhibitionsPathContext} from "../context";
import {getExhibitionList} from "apps/ClientExhibitions/actions";
import {connect} from "react-redux";
import ListDay from '../components/ListDay'
import Card from 'components/Card';
import {getDaysList} from 'apps/ClientExhibitions/selectors'

class ClientExhibitionsList extends PureComponent {
    componentDidMount() {
        this.props.getExhibitionList()
    }

    render() {
        return (
            <ClientExhibitionsPathContext.Consumer>
                <Card lg>
                    {
                        ({path}) =>
                            <div className="client-exhibitions">
                                <div style={{textAlign: 'right'}}>
                                    <Link className="btn btn-primary" to={`${path}/add`}>Создать выставку</Link>
                                </div>
                                {
                                    this.props.listDays.map(day =>
                                        <ListDay key={day.id}
                                                 {...day}/>)
                                }
                            </div>
                    }
                </Card>
            </ClientExhibitionsPathContext.Consumer>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getExhibitionList
}, dispatch);


export default connect(
    getDaysList,
    mapDispatchToProps
)(ClientExhibitionsList)