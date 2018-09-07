import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import DoubleTap from './DoubleTap';

const w = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  heartIcon: {
    width: 20,
    height: 20
  }
});

export default class App extends Component {
  state = { liked: false };

  toggleLike = () => {
    this.setState({ liked: !this.state.liked });
  };

  lastTap = null;
  handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (this.lastTap && now - this.lastTap < DOUBLE_TAP_DELAY) {
      this.toggleLike();
    } else {
      this.lastTap = now;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <DoubleTap onDoubleTap={this.handleDoubleTap}>
          <Image
            source={{
              uri:
                'https://res.cloudinary.com/dw8sniwdq/image/upload/v1463415252/wovad2og8tlsuwxmxtbe.jpg'
            }}
            style={{ width: w.width, height: w.width }}
            resizeMode="cover"
          />
        </DoubleTap>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={this.toggleLike}>
            <Image
              source={
                this.state.liked
                  ? require('./images/heart.png')
                  : require('./images/heart-outline.png')
              }
              style={styles.heartIcon}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
