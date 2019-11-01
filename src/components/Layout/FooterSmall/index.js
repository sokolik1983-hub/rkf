import React from 'react'
import './styles.scss'

function Footer({ className }) {
    return (
        <div className="Footer">
            <div className="Footer__inner">
                <div className="Footer__inner-wrap">
                    <div>
                        <h3>ОРГАНИЗАЦИЯ</h3>
                        <p>
                            Российская кинологическая федерация (РКФ) является некоммерческим, добровольным, самоуправляемым, основанным на членстве союзом общественных объединений, созданным по инициативе общественных объединений.
                    </p>
                    </div>
                    <div>
                        <h3>КОНТАКТЫ</h3>
                        <p>
                            Адрес: Москва, Гостиничная, 9<br />
                            Телефон: +7 (499) 753-22-33<br />
                            E-mail: rkf@rkf.org.ru<br />
                            Карта сайта
                    </p>
                    </div>
                </div>
            </div>
            <div className="Footer__bottom">
                <div className="Footer__bottom-wrap">
                    <p>
                        © РКФ, 1991—<script>document.write(new Date().getFullYear());</script>2019. Союзу общественных кинологических организаций — Российская кинологическая федерация (РКФ) принадлежат исключительные права в отношении результатов интеллектуальной деятельности и приравненных к ним средств индивидуализации, опубликованных на сайте rkf.com.ru, кроме случаев, когда прямо указан другой правообладатель. Указанная интеллектуальная собственность не может использоваться без предварительного согласия со стороны РКФ, за исключением случаев, предусмотренных законом.
                </p>
                </div>
                <div className="Footer__bottom-social">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ruskynologfed/"><img src="/static/icons/social/facebook.svg" alt="" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://vk.com/ruskynologfed"><img src="/static/icons/social/vk.svg" alt="" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://ok.ru/rkforg"><img src="/static/icons/social/odnoklassniki.svg" alt="" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UC1mzNt3TccDxGfA-vkEAQig"><img src="/static/icons/social/youtube.svg" alt="" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/ruskynologfed"><img src="/static/icons/social/twitter.svg" alt="" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/russiankynologfed/"><img src="/static/icons/social/instagram.svg" alt="" /></a>
                </div>
            </div>
        </div>
    )
};

export default Footer;