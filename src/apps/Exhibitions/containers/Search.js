import React, {PureComponent} from 'react'

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
                <div className="exhibitions-search__input">
                    <input name="search" onChange={this.onChange} value={this.state.search}/>
                </div>
            </div>
        )
    }
}