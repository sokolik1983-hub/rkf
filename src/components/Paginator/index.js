import React, { useState } from 'react';
import Button, { ButtonNext, ButtonPrev } from "../Button";
import { scrollSmoothTop } from "../../utils";
import './index.scss'


function PageButton({ page, currentPage, onClick }) {
    const onPageClick = () => {
        if (page !== currentPage) {
            onClick(page);
        }
    };

    return (
        <Button
            onClick={onPageClick}
            className={`Paginator__Button${page === currentPage ? ' Paginator__Button--active' : ''}`}>
            {page}
        </Button>
    )
}

function PageSelector({ onSubmit, pageCount }) {
    const [value, setValue] = useState('');

    const onPageSelect = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    };

    const onPageSelectSubmit = (e) => {
        e.preventDefault();
        if(value){
            onSubmit(Number(value));
        }
    };

    return (
        <form className="Paginator__input" onSubmit={onPageSelectSubmit}>
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

const Paginator = ({ pagesCount, currentPage, setPage, scrollToTop = true }) => {
    scrollToTop && scrollSmoothTop();

    const pages = {
        prevPage: currentPage - 2 === 0 ? null : currentPage - 1,
        currentPage,
        nextPage: currentPage + 2 > pagesCount ? null : currentPage + 1
    };

    return pagesCount > 1 &&
        <div className="Paginator">
            {!!pages.prevPage && <ButtonPrev onClick={() => setPage(pages.prevPage)}>Назад</ButtonPrev>}
            {currentPage!==1 &&
                <PageButton
                    onClick={(page) => setPage(page)}
                    currentPage={currentPage}
                    page={1}
                    key={1}
                />
            }
            {(currentPage > 3) &&
                <div className="Paginator__btn-interval">
                    <p>...</p> 
                </div>
            }
            {Object.keys(pages).map(key => (
                !!pages[key] &&
                <PageButton
                    onClick={(page) => setPage(page)}
                    currentPage={currentPage}
                    page={pages[key]}
                    key={key}
                />
            ))}
            {(currentPage < pagesCount - 2) &&
                <div className="Paginator__btn-interval">
                    <p>...</p> 
                </div>
            }
            {currentPage!==pagesCount &&
                <PageButton
                    onClick={(page) => setPage(page)}
                    currentPage={currentPage}
                    page={pagesCount}
                    key={pagesCount}
                />
            }
            <PageSelector onSubmit={(page) => setPage(page)} pageCount={pagesCount} />
            {pages.nextPage && <ButtonNext onClick={() => setPage(pages.nextPage)}>Далее</ButtonNext>}
        </div>
};

export default Paginator;