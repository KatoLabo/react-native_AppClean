import React, { Component } from 'react';
import { View, ImageBackground,Image,Text } from 'react-native';


const BackImage_2 = (props) => {
  const { total_score, comment_name, mess, smell, dust } = props.dataInfo;
  const { wrapperStyle } = styles;

  let src = '';
  const score = smell
  const comment = comment_name
  if (score == 100) {
    src = require('../assets/images/colorbar/colorbar2_10.png')
  } else if (score >= 90) {
    src = require('../assets/images/colorbar/colorbar2_9.png')
  } else if (score >= 80){
    src = require('../assets/images/colorbar/colorbar2_8.png')
  } else if (score >= 70){
    src = require('../assets/images/colorbar/colorbar2_7.png')
  } else if (score >= 60){
    src = require('../assets/images/colorbar/colorbar2_6.png');
  } else if (score >= 50){
    src = require('../assets/images/colorbar/colorbar2_5.png');
  } else if (score >= 40){
    src = require('../assets/images/colorbar/colorbar2_4.png');
  } else if (score >= 30){
    src = require('../assets/images/colorbar/colorbar2_3.png');
  } else if (score >= 20){
    src = require('../assets/images/colorbar/colorbar2_2.png');
  } else {
    src = require('../assets/images/colorbar/colorbar2_1.png');
  }

  return (
    <ImageBackground
      source={src}
      style={styles.kirakira}>
      <View style={styles.iconBox}>
        <Image
          source={require("../assets/images/nose.png")}
          style={styles.imgScreen}
          />
          </View>

        <View style={styles.labelBox}>
          <Text style={styles.labelText}>{'におい'}</Text>
        </View>

        <View style={styles.eachscoreBox}>
          <Text style={styles.scoreText}>{score}</Text>
        </View>
    </ImageBackground>
  );
}

const styles = {
  iconBox: {
    flex: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgScreen: {
    flex: 1,
    width: 60,
    height: 20,
  },
  labelBox: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  eachscoreBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    borderBottomWidth: 1,
  },
  kirakira: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  labelText: {
    fontSize: 25,
    fontFamily: 'serif',
  },
  scoreText: {
    fontSize: 50,
    fontFamily: 'sans-serif-medium',
  },
}

export default BackImage_2;
