import React from 'react';
import Slider from "../../../../components/Slider";
import Card from "../../../../components/Card";
import {slides} from "../../config";
import './index.scss';


const FixedArticle = () => (
    <Card>
        <div className="list-item__body">
            <Slider>
                {slides.map(s => (
                    <a href={s.url} key={s.id} className="FixedArticle-link" target="_blank" rel="noreferrer noopener">
                        <img src={s.img} alt={s.title} />
                    </a>
                ))}
            </Slider>
        </div>
    </Card>
);

export default React.memo(FixedArticle);