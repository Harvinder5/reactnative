import styled from 'styled-components/native';

export const AvatarContainer = styled.View`
  height: ${props => props.size || '100'}px;
  width: ${props => props.size || '100'}px;
  border-radius: ${props => props.size / 2 || '50'}px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.white[0]};
`;
export const AvatarImage = styled.Image`
  height: ${props => props.size - 5 || '95'}px;
  width: ${props => props.size - 5 || '95'}px;
  border-radius: ${props => props.size / 2 || '47.5'}px;
`;
