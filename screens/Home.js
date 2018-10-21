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
import BackImage_1 from './BackImage_1';
import BackImage_2 from './BackImage_2';
import BackImage_3 from './BackImage_3';

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
      }, 5000)
    });
  }


  async fetchData () {
        axios.get('https://morning-ravine-52217.herokuapp.com/messies/latest')
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
            source={require("../assets/images/rabit_loading.gif")}/>
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
                    <BackImage_1 dataInfo={inputdata} />
                  </View>

                  <View style={styles.box_bottom_score}>
                    <BackImage_2 dataInfo={inputdata} />
                  </View>

                  <View style={styles.box_bottom_score}>
                    <BackImage_3 dataInfo={inputdata} />
                  </View>
                </View>

                <View style={styles.middlescoreBox} />

                <View style={styles.totalscoreBox}>
                  <View style={styles.totallabelBox}>
                    <Text style={styles.totallabelText}>{'とくてん'}</Text>
                  </View>

                  <View style={styles.totalscoredisplay}>
                    <Text style={styles.totalscoreText}>{inputdata.total_score}</Text>
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
