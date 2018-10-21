import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import DataMain from './DataMain';

// const LabelBox = (props) => {
//   return (
//     <View style={styles.labelBox}>
//       <Text style={styles.labelText}>{props.label}</Text>
//     </View>
//   )
// }
//
// const TotalLabelBox = (props) => {
//   return (
//     <View style={styles.labelBox}>
//       <Text style={styles.totallabelText}>{props.label}</Text>
//     </View>
//   )
// }

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputdata: [],
      refreshing: false,
      refreshing2: true,
    }
  }

  componentWillMount() {
    this.fetchData()
    .then(() => {
      this.setState({refreshing: false});
      this.setState({refreshing2: true});
    })
    .then(()=>{
      setTimeout( () => {
        this.setState({refreshing2: false})
      }, 1000)
    });
  }


  async fetchData () {
        axios.get('https://mysterious-caverns-19353.herokuapp.com/users/latest')
         .then((res) => {
           this.setState({ inputdata: res.data });
         })
  }

 _onRefresh = () => {
    this.setState({refreshing: true});
    //ラズパイ側に投げる,計算するように指示，何かしらデータが返ってくる
    //URLに注意
    axios.get('https://mysterious-caverns-19353.herokuapp.com/users/latest')
     .then((emp) => {
       this.setState({ tmpdata: emp.data });
     });
    //データベースの最新情報を取得
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    })
    //15秒後に自動更新
    .then(()=>{
      setTimeout( () => {
        this.fetchData()
      }, 15000)
    });
  }

  render() {
    const { inputdata,refreshing2 } = this.state
    console.log("call render")
    console.log(inputdata)
    console.log(refreshing2)
    const {windowWidth} = this.state

    if (refreshing2 == true) {
      return (
        <View style={styles.anime}>
          <Image
            source={require("../assets/images/rabit.gif")}/>
        </View>
      );
      } else {
      return (
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
              }
            >
            <View style={styles.container}>
              <View style={[styles.box_top, {backgroundColor: '#FFF4E1'}]}>
                <DataMain dataInfo={inputdata} />
              </View>

              <View style={styles.box_middle}>
              </View>

              <View style={styles.box_bottom}>
                <View style={styles.scoreBox}>
                  <View style={styles.box_bottom_score}>
                    <ImageBackground
                      source={require("../assets/images/colorbar_2.png")}
                      style={styles.kirakira}>
                      <View style={styles.iconBox}>
                        <Image
                          source={require("../assets/images/kirakira.png")}
                          style={styles.imgScreen}
                          />
                          </View>

                        <View style={styles.labelBox}>
                          <Text style={styles.labelText}>{'きれいさ'}</Text>
                        </View>

                        <View style={styles.eachscoreBox}>
                          <Text style={styles.scoreText}>{inputdata.id}</Text>
                        </View>
                    </ImageBackground>
                  </View>


                  <View style={styles.box_bottom_score}>
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
                      <Text style={styles.scoreText}>{inputdata.id}</Text>
                    </View>
                  </View>

                  <View style={styles.box_bottom_score}>
                    <View style={styles.iconBox}>
                      <Image
                        source={require("../assets/images/dust.png")}
                        style={styles.imgScreen}
                      />
                    </View>

                    <View style={styles.labelBox}>
                      <Text style={styles.labelText}>{'ほこり'}</Text>
                    </View>

                    <View style={styles.eachscoreBox}>
                      <Text style={styles.scoreText}>{inputdata.id}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.middlescoreBox} />

                <View style={styles.totalscoreBox}>
                  <View style={styles.totallabelBox}>
                    <Text style={styles.totallabelText}>{'とくてん'}</Text>
                  </View>

                  <View style={styles.totalscoredisplay}>
                    <Text style={styles.totalscoreText}>{inputdata.id}</Text>
                  </View>

                </View>

            </View>
          </View>

          </ScrollView>
            );
        }
  }
}




const styles = StyleSheet.create({
  anime: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF4E1'
  },
  contentContainer: {
  flex: 1,
  flexDirection: 'column'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box_top: {
    flex: 7,
    //borderRadius: 30,
  },
  box_middle: {
    flex: 0.1,
  },
  box_bottom: {
    flex: 4,
    flexDirection: 'row',
  },
  scoreBox: {
    flex: 2,
    borderWidth: 1,
    //borderRadius: 30,
    //backgroundColor: '#FFF4E1',
    flexDirection: 'column',
  },
  middlescoreBox: {
    flex: 0.03,
  },
  totalscoreBox: {
    flex: 1,
    borderWidth: 1,
    //borderRadius: 30,
    backgroundColor: "#FFF4E1",
    //flexDirection: 'row',
  },
  box_bottom_score: {
    flex: 1,
    //borderWidth: 1,
    flexDirection: 'row',
  },
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
    // borderBottomLeftRadius: 100,
    // borderBottomRightRadius: 100,
    // borderTopLeftRadius: 100,
    // borderTopRightRadius: 100,
    borderBottomWidth: 1,
  },
  kirakira: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    //resizeMode: 'cover',
    //backgroundColor: 'transparent',
  },
  totallabelBox: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalscoredisplay: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 18,
    fontFamily: 'serif',
  },
  totallabelText: {
    fontSize: 30,
    fontFamily: 'serif',
  },
  scoreText: {
    fontSize: 50,
    fontFamily: 'sans-serif-medium',
  },
  totalscoreText: {
    fontSize: 100,
    fontFamily: 'sans-serif-medium',
  },
});

export default Home;
