import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Balloon from "react-native-balloon";

const DataMain = (props) => {
  const { total_score, comment_name, mess, smell, dust } = props.dataInfo;
  const { wrapperStyle } = styles;

  //スコアによって表示画像を変化
  let src = '';
  const score = total_score //実際は違う
  const comment = comment_name //実際は違う
  if (score >= 80) {
    src = require('../assets/images/kuma_1.gif')
  } else if (score >= 60) {
    src = require('../assets/images/kuma_2.gif')
  } else if (score >= 40){
    src = require('../assets/images/kuma_3.gif')
  } else if (score >= 20){
    src = require('../assets/images/kuma_4.gif')
  } else {
    src = require('../assets/images/kuma_5.gif');
  }

  return (
        <View style={styles.wrapperStyle}>
          <View style={styles.display}>
            <Balloon
              style={styles.balloon}
              borderColor="#2E86C1"
              backgroundColor="#D6EAF8"
              width={150}
              height={200}
              triangleOffset="17%"
              triangleDirection="right"
              borderWidth={2}
              borderRadius={20}
              triangleSize={20}
            >
              <View style={styles.textdisplay}>
                <Text style={styles.textStyle}>{comment}</Text>
              </View>
            </Balloon>
          </View>
          <Image
            source={src}
            style={styles.imgScreen}
          />
        </View>
  )
}

const styles = {
  wrapperStyle: {
    flex: 1,
    //borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  display: {
    flex: 2,
    justifyContent:'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textdisplay: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 25,
    textAlignVertical: "center",
    textAlign: "center",
  },
  imgScreen: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    flexDirection: 'row',
    resizeMode: 'contain',
  },
  balloon: {
    flex: 1,
    flexDirection: 'row',
  }
}

export default DataMain;
