import React from "react";
import {
  StyleSheet,
  Animated,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
const styles = StyleSheet.create({
  imageOverlay: {
    height: "100%",
    width: "100%"
  },
  container: {
    backgroundColor: "#e1e4e8"
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    elevation: 5,
    zIndex: 5,
    top: 0,
    bottom: 0
  }
});

class ProgressiveImage extends React.Component {
  state = {
    loading: true
  };
  thumbnailAnimated = new Animated.Value(0);

  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1
    }).start();
  };

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1
    }).start();
    this.setState({ loading: false });
  };
  onImageLoadStart = () => {
    this.setState({ loading: true });
    Animated.timing(this.imageAnimated, {
      toValue: 0,
      duration: 100
    }).start();
  };
  render() {
    const {
      thumbnailSource,
      source,
      style,
      containerStyles,
      onPress,
      ...props
    } = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, style]}
        activeOpacity={0.7}
        onPress={onPress}
      >
        {(this.state.loading || this.props.loading) && (
          <ActivityIndicator size="large" style={styles.loader} />
        )}
        <Animated.Image
          {...props}
          key={source}
          source={source}
          style={[
            styles.imageOverlay,
            {
              opacity: this.props.loading ? 0.5 : this.imageAnimated,
              borderRadius: 5
            }
          ]}
          onLoad={this.onImageLoad}
          onLoadStart={this.onImageLoadStart}
        />
      </TouchableOpacity>
    );
  }
}

export default ProgressiveImage;
