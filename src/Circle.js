import React from 'react';
const { View, Text } = require("react-native");

export default class Circle extends React.Component {

    state = {
        width : 200,
        height : 200,
    }
    constructor(props) {
        super(props);
        this.handleLayout = this.handleLayout.bind(this);
        this.handleChildLayout = this.handleChildLayout.bind(this);
    }

    handleLayout({ nativeEvent : { layout : { width, height }} }) {
        this.setState({width, height });
    }

    handleChildLayout(index, { nativeEvent : { layout : { width, height }} }) {
        // this.setState(state => ({...state, child}));
    }

    render() {

    const selectedIndex = this.props.selectedIndex || 0;
    const childWidth = 100;
    const childHeight = 100;
    
    const width = this.state.width || 300;
    const height = this.state.height || 300;
    const centerX = width / 2;
    const centerY = height/ 2;
    const radius = Math.min(centerX, centerY) - childWidth/2 - 10;// - Math.max(childWidth, childHeight) / 2;
    // console.log(centerX, centerY, radius);
    // const width = 300;
    const children = this.props.children.map((child, index, arr) => 
         ({...child, props : {...child.props, onLayout: (event) => this.handleChildLayout(index, event), style : [child.props.style, { 
                position : 'absolute', 
                left : centerX + (radius + (index == selectedIndex ? 5 : 0)) * Math.cos(2 * Math.PI * index/ arr.length) - childWidth/2,
                top : centerY + (radius + (index == selectedIndex ? 5 : 0)) * Math.sin(2 * Math.PI * index/ arr.length) - childHeight/2,
                width : childWidth,
                height : childHeight,
            }]
            }}));
    // children.forEach(child => console.log(child.props.style.left));
    return <View style={this.props.style} onLayout={this.handleLayout}>
        {children}
    </View>
    }
}