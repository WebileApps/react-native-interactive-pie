import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Chart from './Chart';
import Circle from'./Circle';

export default class HomeLogo extends React.Component {

  state = {
    width : 300,
    height : 300,
  }

  constructor(props) {
      super(props);
      this.handleLayout = this.handleLayout.bind(this);
  }

  handleLayout({ nativeEvent : { layout : { width, height }} }) {
    // console.log(`Handle layout width: ${width}, height: ${height}`)
    this.setState({width, height });
  }

  handleTouchEvt = evt => {
    const {locationX : x, locationY : y} = evt.nativeEvent;
    const { width = 300, height = 300 } = this.state;
    const size = Math.min(360, width, height);
    const angle = (2 * Math.PI - Math.PI/6 + Math.atan2((size/2 - y) , (x - size/2))) % (2 * Math.PI);
    const onSelectionChange = this.props.onSelectionChange || (() => {});
    const index = 5 - Math.floor(3 * (angle) / Math.PI);
    if (index != this.props.selectedIndex) {
      // console.log(x, y, index, this.props.selectedIndex);
      onSelectionChange(index);
    }
  }

  render() {
    const {colors = [], children, selectedIndex = 0, centerPiece = <Text>Logo</Text>} = this.props;
    const { width = 300, height = 300 } = this.state;
    const side = Math.min(360, width, height);
    return (<View style={{...this.props.style, flexDirection: 'row'}} activeOpacity={1}>
    <View style={{flex: 1, aspectRatio: 1, alignItems : 'center', justifyContent: 'center'}} onLayout={this.handleLayout}>
      <Chart style={styles.chart} colors={colors} size={side} selectedIndex={selectedIndex}></Chart>
      <Circle style={styles.chart} children={children} selectedIndex={selectedIndex}/>
      <View style={{}}>{centerPiece}</View>
    </View>
    <TouchableOpacity style={styles.chart} onPress={this.handleTouchEvt}/>
    </View>)
  }
}

const styles = StyleSheet.create({ chart : {
    // alignSelf : "center", 
    position : "absolute", 
    top: 0, 
    left: 0, 
    width : '100%', 
    height: '100%'
  }, centerPiece : {
    backgroundColor : 'green', 
    height : 70, 
    width : 70,
    alignItems : 'center', 
    justifyContent: 'center'
  }});
