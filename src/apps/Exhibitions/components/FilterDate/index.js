import React from "react";
import styled from "styled-components";

const FilterDate = () => (
  <React.Fragment>
    <FilterBlock>
      <Ul>
        <ArchiveLink>Архив</ArchiveLink>
        <Link>Год</Link>
        <ActiveLink>Месяц</ActiveLink>
        <Link>Неделя</Link>
        <Link>Сегодня</Link>
      </Ul>
    </FilterBlock>
    <BtnBlock>
      <ButtonCreateExhibition>Создать выставку</ButtonCreateExhibition>
    </BtnBlock>
  </React.Fragment>
);

export default FilterDate;

const FilterBlock = styled.div`
  float: left;
`;
const BtnBlock = styled.div`
  float: right;
`;

const ButtonCreateExhibition = styled.button`
  background: #253c5e;
  box-shadow: 0px 4px 8px rgba(37, 60, 94, 0.24);
  border-radius: 4px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: normal;
  text-align: center;
  letter-spacing: 0.75px;
  padding: 15px;
  color: #ffffff;
  border: 0;
`;

const Link = styled.li`
  font-size: 16px;
  line-height: 20px;
  color: #babfc7;
  margin-left: 23px;
  margin-right: 23px;
  padding-left: 12px;
  padding-top: 6px;
  padding-right: 12px;
  padding-bottom: 6px;
  display: inline;
  &:first-child {
    margin-left: 0px;
  }
`;
const ActiveLink = styled.li`
  font-size: 16px;
  line-height: 20px;
  color: #1d6ee3;
  border-bottom: 1px solid #1d6ee3;
  display: inline;
  padding-left: 12px;
  padding-top: 6px;
  padding-right: 12px;
  padding-bottom: 6px;
`;

const ArchiveLink = styled.li`
  font-size: 16px;
  line-height: 20px;
  margin-left: 0px;
  margin-right: 23px;
  display: inline;
  color: #ffffff;
  background: #babfc7;
  border-radius: 5px;
  padding-left: 12px;
  padding-top: 6px;
  padding-right: 12px;
  padding-bottom: 6px;
`;

const Ul = styled.ul`
  list-style: none;
  padding-left: 0px;
`;
