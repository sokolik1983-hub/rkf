import React, {useContext} from 'react'
import classnames from 'classnames'
import Button, {ButtonNext} from "components/Button";
import {range} from "utils/range";
import {connectExhibitionsPaginator} from 'apps/Exhibitions/connectors'
import {ExhibitionsFilterContext} from 'apps/Exhibitions/context'
import './Paginator.scss'


function PageButton({page, currentPage, onClick}) {

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
                {"Paginator__Button--active": page === currentPage}
            )}>
            {page}
        </Button>
    )
}

function Paginator({
                       page_count,
                       page_prev,
                       page_next,
                       page_current,
                   }) {

    const {setPage} = useContext(ExhibitionsFilterContext);

    const pagesRange = range(page_count, 1);

    const onPageClick = (page) => {
        setPage(page)
    };

    const onBtnNextClick = () => {
        setPage(page_next)
    };

    return (
        <div className="Paginator">
            {
                pagesRange.map(index =>
                    <PageButton
                        onClick={onPageClick}
                        currentPage={page_current}
                        page={index}
                    />
                )
            }
            {page_next ? <ButtonNext onClick={onBtnNextClick}>Далее</ButtonNext> : null}
        </div>
    )
}

export default connectExhibitionsPaginator(Paginator)