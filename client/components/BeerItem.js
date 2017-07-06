import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  brewery: {
    backgroundColor: 'transparent',
    color: '#555',
    fontSize: 14,
    lineHeight: 16,
  },
  container: {
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    width: '100%',
  },
  content: {
    justifyContent: 'center',
    paddingLeft: 8,
  },
  image: {
    backgroundColor: '#ccc',
    height: 60,
    width: 60,
  },
  name: {
    color: 'black',
    fontFamily: 'Avenir Next',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
  },
  style: {
    color: '#555',
    fontSize: 14,
    lineHeight: 16,
  },
});

export default class BeerItem extends Component {
  render() {
    const {
      brewery,
      name,
      onPress,
      style,
    } = this.props;

    return (
      <TouchableOpacity onPress={onPress}style={styles.container}>
        <View style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.brewery}>{brewery}</Text>
          <Text style={styles.style}>{style}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

BeerItem.propTypes = {
  brewery: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.string.isRequired,
};

