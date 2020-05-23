import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
function TextComponent(params) {
  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: params.size,
          fontFamily: params.FFamily,
          marginTop: params.mT,
          marginLeft: params.mL,
          marginRight: params.mR,
          flexWrap: 'wrap',
          paddingRight: params.pR,
        },
      ]}>
      {params.text}
    </Text>
  );
}
const styles = StyleSheet.create({
  text: {
    color: '#BCBCBC',
  },
});
export default TextComponent;
