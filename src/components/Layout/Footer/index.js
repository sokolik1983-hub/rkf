import React from "react";
import "./style.scss";
import Container from '../Container'
const Footer = () => (
  <footer>
    <Container className="container_footer">
      <div>
        {/*<img src={logoSvg} alt="logo" />*/}
        <p className="text_footer text_footer_main">
          Российская кинологическая федерация
        </p>
        <p className="text_footer">Телефон: +7 (495) 482-1529</p>
        <p className="text_footer">Режим работы: 9:30 — 18:00</p>
        <p className="text_footer">Москва, ул. Гостиничная, д.9, 5 этаж</p>
      </div>
      <div>
        <p className="bold_footer">Разделы</p>
        <div className="block_footer">
          <p className="text_footer">Регистрация собаки</p>
          <p className="text_footer">Календарь выставок</p>
          <p className="text_footer">Результаты выставок</p>
          <p className="text_footer">Документы</p>
          <p className="text_footer">Вопросы и ответы</p>
        </div>
      </div>
      <div>
        <p className="bold_footer">о нас</p>
        <div className="block_footer">
          <p className="text_footer">Контакты</p>
          <p className="text_footer">Новости</p>
          <p className="text_footer">Форум</p>
          <p className="text_footer">Вакансии</p>
        </div>
      </div>
      <div>
        <div className="block_footer">
          <div className="social_linls_footer">
          {/*
            <img src={twitter} alt="twitter" />
            <img src={facebook} alt="facebook" />
            <img src={google} alt="google" />
            <img src={tumblr} alt="tumbler" />
          */}
          </div>
          <p className="text_footer">Вход</p>
          <p className="text_footer">Регистрация</p>
          <div>
            <p className="text_footer_lang_active">Рус/</p>
            <p className="text_footer_lang">Eng</p>
          </div>
          <p className="bold_footer">Подпишитесь на новости</p>
          <div className="subscribe_footer">
            <form>
              <input
                className="input_subscribe_footer"
                placeholder="Ваш E-mail"
              />
              <button className="btn_subscribe_footer">Отправить</button>
            </form>
          </div>
        </div>
      </div>
    </Container>
    <div className="privacy_policy">
      <hr />
      <div className="privacy_policy_content">
        <p>2001—2019 Общественная организация «СОКО РКФ»</p>
        <div>
          <ul className="privacy_policy_content_ul">
            <li className="privacy_policy_content_li">Политика конфиденциальности</li>
            <li className="privacy_policy_content_li"> Лицензии</li>
            <li className="privacy_policy_content_li"> Карта сайта </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
