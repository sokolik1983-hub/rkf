import React from 'react'

export default function PaymentDetails({club_legal_name, inn, kpp, bank_name, bic, account_number}) {
    if(
        !club_legal_name &&
        !inn &&
        !kpp &&
        !bank_name &&
        !bic &&
        !account_number
    ) return null;

    return (
        <div className="ExhibitionDetails__payment-details">
            <h3 className="ExhibitionDetails__payment-details-title">Реквизиты для оплаты:</h3>
            <p>
                Получатель платежа: {club_legal_name} <br />
                ИНН: {inn} <br />
                КПП: {kpp} <br />
                Банк: {bank_name} <br />
                БИК: {bic} <br />
                Расчетный счет: {account_number} <br />
            </p>
        </div>
    )
}