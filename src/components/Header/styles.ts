import styled, { css } from "styled-components";

export const SidebarContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 52px;
  margin-left: 2rem;

  border-bottom: 1px solid ${(props) => props.theme["gray-100"]};
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.56rem 6rem;

  h1 {
    font-weight: 600;
    font-size: 2rem;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30rem;

  gap: 50px;
`;

export const UserData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
