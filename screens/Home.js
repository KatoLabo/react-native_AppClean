import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import DataMain from './DataMain';

const LabelBox = (props) => {
  const flex = props.flex ? props.flex: 1
  return (
    <View style={[styles.labelBox, {flex: flex}]}>
      <Text style={styles.labelText}>{props.label}</Text>
    </View>
  )
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputdata: [],
      refreshing: false,
    }
  }

  componentWillMount() {
    axios.get('https://mysterious-caverns-19353.herokuapp.com/users/latest')
      .then((res) => {
        this.setState({ inputdata: res.data });
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
   this.fetchData().then(() => {
     this.setState({refreshing: false});
   });
 }

  render() {
    const { inputdata } = this.state
    console.log("call render")
    console.log(inputdata)
    const {windowWidth} = this.state

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
          <View style={styles.box_top}>
            <DataMain dataInfo={inputdata} />
          </View>

          <View style={styles.box_bottom}>
            <View style={styles.scoreBox}>
              <View style={styles.box_bottom_over_top}>
                <View
                  style={[styles.eachscoreBox, {marginLeft: 65}]}
                  >
                  <LabelBox label={'きたなさ'} />
                  <View style={styles.eachscoredisplay}>
                    <Text style={styles.scoreText}>{inputdata.id}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.box_bottom_over_bot}>
                <View style={styles.eachscoreBox}>
                  <LabelBox label={'におい'} />
                  <View style={styles.eachscoredisplay}>
                    <Text style={styles.scoreText}>{inputdata.id}</Text>
                  </View>
                </View>
                <View style={styles.eachscoreBox}>
                  <LabelBox label={'ほこり'} />
                  <View style={styles.eachscoredisplay}>
                    <Text style={styles.scoreText}>{inputdata.id}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.totalscoreBox}>
              <LabelBox label={'総合点'} />
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



// <View style={styles.scoreLine}>
//   <View style={[styles.scoreBox,{flex: 1}]}>
//     <Text style={styles.scoreText}>{inputdata.id}</Text>
//   </View>
//   <View style={[styles.scoreBox,{flex: 1}]}>
//     <Text style={styles.scoreText}>{inputdata.id}</Text>
//   </View>
//   <View style={[styles.scoreBox,{flex: 1}]}>
//     <Text style={styles.scoreText}>{inputdata.id}</Text>
//   </View>
//   <View style={[styles.scoreBox,{flex: 2}]}>
//     <Text style={styles.totalscoreText}>{inputdata.id}</Text>
//   </View>
// </View>
// </View>


const styles = StyleSheet.create({
  contentContainer: {
  flex: 1,
  flexDirection: 'column'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box_top: {
    flex: 9,
    //borderBottomWidth: 1,
    //flexDirection: 'row',
  },
  box_bottom: {
    flex: 4,
    flexDirection: 'row',
  },
  box_bottom_over_top: {
    flex: 1,
    //borderWidth: 0.5,
  },
  box_bottom_over_bot: {
    flex: 1,
    //borderWidth: 0.5,
    flexDirection: 'row',
  },
  labelBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  eachscoredisplay: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalscoredisplay: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreBox: {
    flex: 2,
  },
  eachscoreBox: {
    // flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    //width: Dimensions.get('window').width * 0.33,
    height: Dimensions.get('window').height / 8.1,
    width: Dimensions.get('window').height / 8.1,
    flexDirection: 'column',
  },
  totalscoreBox: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexDirection: 'row',
    // width: '100%',
    // height: '100%',
    // borderWidth: 0.5,
    // borderColor: "black",
    flex: 1,
    borderWidth: 0.5,
  },
  labelText: {
    // backgroundColor: "lightblue",
    // padding: 1,
    // borderRadius: 20,
    // borderWidth: 1,
    // borderColor: "lightblue",
    // overflow: "hidden",
    fontSize: 20,
  },
  scoreText: {
    fontSize: 50,
  },
  totalscoreText: {
    fontSize: 100,
  },
});

export default Home;
