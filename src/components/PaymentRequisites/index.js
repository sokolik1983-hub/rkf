import React from 'react'
import './styles.scss'

const PaymentRequisites = () => <div className="payment-requisites">
    <div className="payment-requisites__title">
        Реквизиты для оплаты
    </div>
    <div className="payment-requisites__content">
        <p>Получатель платежа: Управление Федерального казначейства по г. Москве</p>
        <p>(Департамент городского имущества города Москвы)</p>
        <p>ИНН 7705031674</p>
        <p>КПП 770301001</p>
        <p>Банк: ГУ Банка России по ЦФО</p>
        <p>БИК 044525000</p>
        <p>Расчетный счет 40101810045250010041</p>
    </div>
</div>

export default PaymentRequisites;