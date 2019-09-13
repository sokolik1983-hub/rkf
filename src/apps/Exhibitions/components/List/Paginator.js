import React, { useContext, useState } from 'react'
import classnames from 'classnames'
import Button, { ButtonNext, ButtonPrev } from "components/Button";
import { range } from "utils/range";
import { connectExhibitionsPaginator } from 'apps/Exhibitions/connectors'
import { ExhibitionsFilterContext } from 'apps/Exhibitions/context'
import "components/Form/FormInput/styles.scss";
import './Paginator.scss'
import { useStartTyping } from 'react-use';


function PageButton({ page, currentPage, onClick }) {

    const onPageClick = () => {
        if (page !== currentPage) {
            onClick(page)
        }
    };

    return (
        <Button
            onClick={onPageClick}
            className={classnames(
                "Paginator__Button",
                { "Paginator__Button--active": page === currentPage }
            )}>
            {page}
        </Button>
    )
}

function PageSelector({ onSubmit, pageCount }) {
    const [value, setValue] = useState(null);
    const onPageSelect = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }
    const onPageSelectSubmit = (e) => {
        e.preventDefault();
        onSubmit(value);
    }

    return (
        <form onSubmit={onPageSelectSubmit} className="FormInput">
            <input
                placeholder="Перейти"
                type="number"
                min="1"
                max={pageCount}
                value={value}
                onChange={onPageSelect}
                className="FormInput__input"
            />
        </form>
    )
}

function Paginator({
    page_count,
    page_prev,
    page_next,
    page_current,
}) {

    const { setPage } = useContext(ExhibitionsFilterContext);

    const rangeStart = page_current > 1 && page_current < page_count
        ? page_current - 1
        : 1;

    const pagesRange = range(page_count, rangeStart);

    const onPageClick = (page) => {
        setPage(page)
    };

    const onBtnPrevClick = () => {
        setPage(page_prev)
    };

    const onBtnNextClick = () => {
        setPage(page_next)
    };

    return page_count > 1 ? (
        <div className="Paginator">
            {
                page_prev
                    ? <ButtonPrev onClick={onBtnPrevClick}>Назад</ButtonPrev>
                    : null
            }
            {
                pagesRange.map(index =>
                    <PageButton
                        onClick={onPageClick}
                        currentPage={page_current}
                        page={index}
                    />
                )
            }
            <PageSelector onSubmit={onPageClick} pageCount={page_count} />
            {
                page_next
                    ? <ButtonNext onClick={onBtnNextClick}>Далее</ButtonNext>
                    : null
            }
        </div>
    ) : null
}

export default connectExhibitionsPaginator(Paginator)