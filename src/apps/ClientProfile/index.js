import React, {PureComponent} from "react"
import CompanyInfoForm from './components/CompanyInfoForm'
import CompanyContactsForm from './components/CompanyContactsForm'
import CompanySocialForm from './components/CompanySocialForm'
import Card from 'components/Card'

class ClientProfileProxy extends PureComponent {

    render() {
        //const {path} = this.props.match;
        return (
            <>
                <Card lg>
                    <h3>Основная информация</h3>
                    <CompanyInfoForm/>
                </Card>
                <Card lg>
                    <h3>Контакты</h3>
                    <CompanyContactsForm/>
                </Card>
                <Card lg>
                    <h3>Социальные сети</h3>
                    <CompanySocialForm/>
                </Card>
            </>
        );
    }
}


export default ClientProfileProxy