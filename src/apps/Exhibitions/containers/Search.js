import React, {PureComponent} from 'react'
import SearchField from '../componentns/Search'

export default class ExhibitionsSearch extends PureComponent {
    state = {
        search: ''
    };

    onChange = (e) => {
        this.setSate({[e.target.name]: e.target.value})
    };

    render() {
        return (
            <div className="exhibitions-search">
                <SearchField onChange={this.onChange} value={this.state.value}/>
            </div>
        )
    }
}