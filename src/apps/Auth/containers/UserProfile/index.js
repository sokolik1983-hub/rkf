import React from 'react'
import {connect} from 'react-redux'
import {objectNotEmpty} from "utils/index";

class UserProfile extends React.PureComponent {
    isLegalEntity = type => {
        return parseInt(type, 10) === 2 || 3
    }

    render() {
        const {
            user_info,

        } = this.props;
        if (!objectNotEmpty(user_info)) {
            return null
        }

        const {
            phone,
            mail,
            user_type,
            company_name,
            company_type
        } = user_info;
        return (
            <div className="user-profile">
                <div>
                    <h1>Главная страница {}</h1>
                    {
                        this.isLegalEntity(user_type) ?
                            <>
                                <div className="user-profile__phone">ИП: {company_name}</div>
                                <div
                                    className="user-profile__phone">Тип: {company_type === 1 ? 'Федеральный' : 'Региональный'}</div>
                            </>
                            : null
                    }
                    <div className="user-profile__phone">тел: {phone}</div>
                    <div className="user-profile__mail">email: {mail}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user_info: state.authentication.user_info
})
export default connect(mapStateToProps)(UserProfile)