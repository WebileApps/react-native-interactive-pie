import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// import BezierPlayground from "./BezierPlayground";
import HomeLogo from "@webileapps/react-native-piechart"

const SLICES = [
  {
    color : "#afe5d2",
    icon : require("./images/components_images_home_products_icon.png"),
    title : "Products", 
    badge : 2
  },{
    color : "#f9e3b4",
    icon : require("./images/components_images_home_dreamlist_icon.png"),
    title : "Dreamlists", 
    badge : 2
  },{
    color : "#a3dbec",
    icon : require("./images/components_images_home_contributions_icon.png"),
    title : "Contributions", 
    badge : 2
  },{
    color : "#ff8c8b",
    icon : require("./images/components_images_home_orders_icon.png"),
    title : "Orders", 
    badge : 0
  },{
    color : "#acb5e8",
    icon : require("./images/components_images_home_contacts_icon.png"),
    title : "New Contacts", 
    badge : 2
  },{
    color : "#cee9ac",
    icon : require("./images/components_images_home_events_icon.png"),
    title : "Events", 
    badge : 4
  },
]

const Badge = function({count}) {
  return <View style={styles.badge}><Text style={{color : '#FFFFFF'}}>{count}</Text></View>
}
const IconBadge = function({count, children}) {
  return <View style={styles.icon}>
    {children}
    {count > 0 && <Badge count={count}/>}
  </View>
}
export default class App extends React.Component {
  state = {
    selectedIndex : 0
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <HomeLogo colors={SLICES.map(s => s.color)} selectedIndex={this.state.selectedIndex} onSelectionChange={selectedIndex => this.setState({selectedIndex})}>
          {SLICES.map((slice, index) => <View key={index} style={{...styles.child}}>
            <IconBadge count={slice.badge}>
              <Image style={{height : 30, width : 30}} resizeMode="contain" source={slice.icon}></Image>
            </IconBadge>
            <Text>{slice.title}</Text>
          </View>)}
        </HomeLogo>
        {/* <BezierPlayground/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badge : {
    position: 'absolute',
    top : 0,
    right : 0,
    height:20,
    paddingHorizontal : 5,
    overflow : 'hidden',
    borderRadius:10,
    borderWidth : 1,
    borderColor : 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color : '#FFFFFF',
    backgroundColor: '#ff374f'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal : 30,
    justifyContent: 'center',
  },
  child: {
    width : 50, height: 50,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  icon : {
    alignItems: 'center',
    // backgroundColor : 'green',
    width : 50,
    height : 35,
    paddingTop : 5,
    marginBottom: 2
  }
});
