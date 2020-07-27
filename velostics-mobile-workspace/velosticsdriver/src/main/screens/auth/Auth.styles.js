import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { SafeAreaView } from 'react-navigation';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.primary[0]};
  justify-content: space-between;
`;
export const BottomContainer = styled.View`
  margin-bottom: 40px;
`;
export const LogoContainer = styled(Animated.View)`
  margin-top: 200;
  align-items: center;
`;
