import React, {Component} from 'react'
import classnames from 'classnames'
import {ButtonNext} from 'components/Button'
import {fakeData} from './data'
import Container from 'components/Layout/Container'
import './styles.scss'

const Block = ({image, title, category, className}) =>
    <div
        style={{
            backgroundImage: image ? `url(${image})` : null
        }}
        className={classnames('block', {['block__' + className]: className})}>
        <div className={`block__title`}>
            {title}
        </div>
    </div>;

const ListItem = ({image, category, title}) =>
    <div className="list-item">
        <div style={{
            backgroundImage: image ? `url(${image})` : null
        }}
             className="list-item__image"/>
        <div className="list-item__info">
            <div className="list-item__category">
                {category}
            </div>
            <div className="list-item__title">
                {title}
            </div>
        </div>
    </div>;

export default class RecentNews extends Component {


    render() {
        const {primaryBlock, secondaryBlock, thirdBlock, news, categories} = fakeData;
        return (
            <Container className="recent-news">
                <div className="recent-news__left-block">
                    <Block className="primary-block" {...primaryBlock}/>
                    <div className="block__row">
                        <Block className="secondary-block" {...secondaryBlock}/>
                        <Block className="third-block" {...thirdBlock}/>
                    </div>
                </div>
                <div className="recent-news__right-block">
                    <h2>Последние новости</h2>
                    <div className="recent-news__list">
                        {
                            news.map(newsItem => <ListItem
                                key={newsItem.id}
                                category={categories[newsItem.category.toString()].title}
                                title={newsItem.title}
                            />)
                        }
                    </div>
                    <div className="recent-news__controls">
                        <ButtonNext className="btn-primary btn-lg">Смотреть ещё</ButtonNext>
                    </div>
                </div>
            </Container>
        )
    }
}