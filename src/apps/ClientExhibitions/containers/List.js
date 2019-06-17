import React, {PureComponent} from 'react'
import {bindActionCreators} from 'redux'
import {Link} from "react-router-dom";
import {ClientExhibitionsPathContext} from "../context";
import {getExhibitionList} from "apps/ClientExhibitions/actions";
import {defaultReduxKey} from "apps/ClientExhibitions/config";
import {connect} from "react-redux";
import ClientExhibitionListItem from './ListItem'
import Card from 'components/Card';

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
                                <div style={{textAlign: 'right'}}>
                                    <Link className="btn btn-primary" to={`${path}/add`}>Создать выставку</Link>
                                </div>
                                {
                                    this.props.exhibitionIdList.map(id => <ClientExhibitionListItem key={id}
                                                                                                    exhibitionId={id}/>)
                                }
                            </div>
                    }
                </ClientExhibitionsPathContext.Consumer>
            </Card>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getExhibitionList
}, dispatch);

const mapsStateToProps = (state, props) => ({
    exhibitionIdList: state[defaultReduxKey].exhibitionIdList,

});

export default connect(
    mapsStateToProps,
    mapDispatchToProps
)(ClientExhibitionsList)