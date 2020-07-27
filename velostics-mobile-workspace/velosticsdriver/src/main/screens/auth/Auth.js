import React from 'react';
import { Animated, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Container, BottomContainer, LogoContainer } from './Auth.styles';
import Button from '@velostics/shared/src/uikit/buttons/Button';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1000
    }).start();
  }
  handleClick = routeName => () => this.props.navigation.navigate(routeName);
  render() {
    const { screenProps, ...rest } = this.props;
    return (
      <Container>
        <LogoContainer style={{ opacity: this.state.animation }}>
          <Image
            source={require('../../../../assets/logo.png')}
            style={{ height: 150, width: 150, resizeMode: 'contain' }}
          />
        </LogoContainer>

        <BottomContainer>
          <Button
            title="auth.login"
            lightPrimary
            onPress={this.handleClick('SignIn')}
          />
        </BottomContainer>
      </Container>
    );
  }
}
export default Auth;
