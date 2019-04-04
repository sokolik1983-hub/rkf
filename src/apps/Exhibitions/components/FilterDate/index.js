import React from "react";
import styled from "styled-components";

const FilterDate = () => (
  <Ul>
    <ArchiveLink>Архив</ArchiveLink>
    <Link>Год</Link>
    <ActiveLink>Месяц</ActiveLink>
    <Link>Неделя</Link>
    <Link>Сегодня</Link>
  </Ul>
);

export default FilterDate;

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
