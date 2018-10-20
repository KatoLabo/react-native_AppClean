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
} from 'react-native';
import axios from 'axios';
import DataMain from './DataMain';

const LabelBox = (props) => {
  return (
    <View style={styles.labelBox}>
      <Text style={styles.labelText}>{props.label}</Text>
    </View>
  )
}

const TotalLabelBox = (props) => {
  return (
    <View style={styles.labelBox}>
      <Text style={styles.totallabelText}>{props.label}</Text>
    </View>
  )
}

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
      }, 2000)
    });
  }


  async fetchData () {
        axios.get('https://mysterious-caverns-19353.herokuapp.com/users/latest')
         .then((res) => {
           this.setState({ inputdata: res.data });
         })
  }

// _start = () => {
//    this.setState({refreshing2: true});
//    this.fetchData().then(() => {
//      this.setState({refreshing: false});
//    });
//  }

 _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
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
              <View style={[styles.box_top, {backgroundColor: '#9DDCDC'}]}>
                <DataMain dataInfo={inputdata} />
              </View>

              <View style={[styles.box_bottom,  {backgroundColor: '#FFF4E1'}]}>
                <View style={styles.scoreBox}>
                  <View style={styles.box_bottom_over_top}>
                    <View
                      style={[styles.eachscoreBox, {marginLeft: 80}, {backgroundColor: '#9DDCDC'}]}
                      >
                      <LabelBox label={'きたなさ'} />
                      <View style={styles.eachscoredisplay}>
                        <Text style={styles.scoreText}>{inputdata.id}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.box_bottom_over_bot}>
                    <View
                      style={[styles.eachscoreBox, {marginLeft: 25}, {backgroundColor: '#FFF4E1'}]}
                      >
                      <LabelBox label={'におい'} />
                      <View style={styles.eachscoredisplay}>
                        <Text style={styles.scoreText}>{inputdata.id}</Text>
                      </View>
                    </View>
                    <View style={[styles.eachscoreBox,{marginLeft: 6}, {backgroundColor: '#E67A7A'}]}>
                      <LabelBox label={'ほこり'} />
                      <View style={styles.eachscoredisplay}>
                        <Text style={styles.scoreText}>{inputdata.id}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.totalscoreBox}>
                  <TotalLabelBox label={'とくてん'} />
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
  },
  box_bottom: {
    flex: 4,
    flexDirection: 'row',
  },
  box_bottom_over_top: {
    flex: 1,
  },
  box_bottom_over_bot: {
    flex: 1.1,
    flexDirection: 'row',
  },
  scoreBox: {
    flex: 2,
  },
  totalscoreBox: {
    flex: 1,
    borderWidth: 0.5,
  },
  eachscoreBox: {
    borderWidth: 2,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    height: Dimensions.get('window').height / 6.6,
    width: Dimensions.get('window').height / 6.6,
    borderColor: 'black',
  },
  labelBox: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  eachscoredisplay: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalscoredisplay: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 15,
  },
  totallabelText: {
    fontSize: 30,
  },
  scoreText: {
    fontSize: 50,
  },
  totalscoreText: {
    fontSize: 120,
  },
});

export default Home;
