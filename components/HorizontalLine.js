import React from 'react';
import { View, StyleSheet } from 'react-native';

const HorizontalLine = ({ style }) => {
    return <View style={[styles.line, style]} />;
};

const styles = StyleSheet.create({
    line: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
});

export default HorizontalLine;
