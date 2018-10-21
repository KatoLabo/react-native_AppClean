import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { Scene, Router, Tabs } from 'react-native-router-flux';
import Home from './screens/Home';
import Settings from './screens/Settings';
import RailsViews from './screens/RailsViews';
import Icon from 'react-native-vector-icons/MaterialIcons';


const TabBarIcon = props => (
  <View style={styles.tabIconContainerStyle}>
    <Icon
      name={props.iconName}
      color={props.focused ? 'blue' : 'grey'}
      style={styles.tabIconStyle}
    />
  </View>
);

const RouterComponent = () => {
  return (
    <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} sceneStyle={styles.routerScene}>
      <Tabs
        key='root'
        swipeEnabled={ true }
        animationEnabled={ true }
      >
        <Scene
          key='home'
          component={Home}
          title='Home'
          iconName='home'
          icon={TabBarIcon}
          initial
        />
        <Scene
          key='past_data'
          component={RailsViews}
          url="https://morning-ravine-52217.herokuapp.com/chart"
          title='Data'
          iconName='timeline'
          icon={TabBarIcon}
        />
        <Scene
          key='records'
          component={RailsViews}
          url="https://morning-ravine-52217.herokuapp.com"
          title='Record Room'
          iconName='people'
          icon={TabBarIcon}
        />

      </Tabs>
    </Router>
  )
}

// <Scene
//   key='settings'
//   component={Settings}
//   title='Settings'
//   iconName='settings'
//   icon={TabBarIcon}
// />

const styles = StyleSheet.create({
  tabIconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconStyle: {
    width: 35,
    height: 35,
    fontSize: 35,
  },
  navBar: {
    backgroundColor: '#45a2ff'
    //backgroundColor: '#FFBC61'
  },
  navTitle: {
    color: 'white'
  },
  routerScene: {
    // paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight,
  }
})

export default RouterComponent;
