import React, {PureComponent} from 'react'
import OutsideClickHandler from 'react-outside-click-handler';
import classnames from 'classnames'
import './styles.scss'

const openedIcon = '/static/icons/chevron-down.svg';
const closedIcon = '/static/icons/chevron-up.svg';

export default class DropDown extends PureComponent {
    static defaultProps = {
        opened: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            opened: props.opened
        }
    }

    toggleDropDown = () => this.setState(prevState => ({opened: !prevState.opened}));
    closeDropDown = () => this.setState({opened: false});
    handlerStyles = () => ({
        backgroundImage: `url(${this.state.opened ? closedIcon : openedIcon})`
    });

    render() {
        return (
            <OutsideClickHandler onOutsideClick={this.closeDropDown}>
                <div className={classnames("drop-down", {[this.props.className]: this.props.className})}>
                    {this.props.innerComponent}

                    <div
                        style={this.handlerStyles()}
                        onClick={this.toggleDropDown}
                        className="drop-down__handler"
                    />

                    <div
                        className={
                            classnames(
                                "drop-down__items",
                                {"drop-down__items--visible": this.state.opened}
                            )
                        }>
                        {this.props.children}
                    </div>
                </div>
            </OutsideClickHandler>
        )

    }
}