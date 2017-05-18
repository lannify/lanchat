import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Spinner = () => {
  return (
    <View>
      <ActivityIndicator size={'large'} style={styles.centering} />
    </View>
  );
};

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Spinner;
