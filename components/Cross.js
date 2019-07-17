import React from 'react';
import {
    View,
    StyleSheet
  } from 'react-native';

export class Cross extends React.Component {
  render() {
    const { xTranslate, yTranslate, color} = this.props
    return (
        <View style={[styles.container,{
            transform: [
                    {translateX: (xTranslate ? xTranslate : 10) + 38},
                    {translateY: (yTranslate ? yTranslate : 10) - 12},
                ],

        }]}>
            <View style={[styles.line, {
                backgroundColor: color ? color : '#000',
                transform: [
                    { rotate: '45deg' }
                ]
            }]}/>
            <View style={[styles.line, {
                backgroundColor: color ? color : '#000',
                transform: [
                    { rotate: '135deg' }
                ]
            }]}/>
        </View>
        
    );
  }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
    line: {
        position: 'absolute',
        width: 7,
        height: 105,
        
    }
});