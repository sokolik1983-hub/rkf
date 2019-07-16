import React from 'react'
import Header from './Header'
import ClientNews from 'apps/ClientNews'
import Description from './Description'
import './styles.scss'

const Wrap = ({children}) => <div className="ClientHome__wrap">{children}</div>;
const Content = ({children}) => <div className="ClientHome__content">{children}</div>;
const Side = ({children}) => <div className="ClientHome__sidebar">{children}</div>;


export default function ClientHome() {
    return (
        <div className="ClientHome">
            <Header/>
            <Wrap>
                <Content>
                    <Description>
                        <h4>Описание</h4>
                        <p>Общественная Организация DoggyDog, является членом Международного Союза «International Kennel
                        Union» (IKU), объединяющего страны СНГ и Балтии. СКОР является учредителем и членом Российской
                        Ассоциации зоотехнии, ветеринарии и зооиндустрии. Зарегистрирован Министерством Юстиции РФ и
                            объединяет более 1500 кинологических организаций Москвы и большинства регионов России.</p>
                    </Description>
                    <ClientNews/>
                </Content>
                <Side>
                    ClientSide
                </Side>
            </Wrap>
        </div>
    )
}