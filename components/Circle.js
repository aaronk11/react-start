import React from 'react';
import {
    View,
    StyleSheet
  } from 'react-native';

export class Circle extends React.Component {
  render() {
    const { xTranslate, yTranslate, color} = this.props
    return (
        <View style={[styles.outer,{
            transform: [
                    {translateX: xTranslate ? xTranslate : 10},
                    {translateY: yTranslate ? yTranslate : 10},
                ],
            backgroundColor: color ? color : '#000'
        }]}>
            <View style={styles.inner}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    outer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 40
    },
    inner: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: '#FFF'
    }
});