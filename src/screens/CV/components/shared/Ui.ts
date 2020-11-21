import { styled } from '@screens/CV/styled';

export const DescriptionList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const DescriptionItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 0.3rem;
  }
`;
