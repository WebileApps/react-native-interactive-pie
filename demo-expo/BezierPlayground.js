import React from 'react';
const { ART : { Surface, Shape, Group, Path, Transform }, Slider, Text, View } = require("react-native");

const thumbPath = (x, y, thumbRadius = 4) => new Path().moveTo(x, y).move(thumbRadius, 0).arc(-2 * thumbRadius,0, thumbRadius, thumbRadius).arc(2 * thumbRadius, 0, thumbRadius, thumbRadius).close();
const round = x => Math.round(100 * x) / 100;
export default class BezierPlayground extends React.Component {

    state = {
        x : 0.5,
        angle : 0.5
    }

    constructor(props) {
        super(props);
        this.handleXChange = this.handleXChange.bind(this);
        this.handleAngleChange = this.handleAngleChange.bind(this);
    }

    handleXChange(x) {
        this.setState({x});
    }
    
    handleAngleChange(angle) {
        this.setState({angle});
    }

    render() {
        const { x = 0, angle = 0 } = this.state;
        const dAngle = (-30 + 60 * angle) * Math.PI / 180;
        const xThumbX = 250 - 100 * x;
        const radius = 200;
        const thumbRadius = 5;
        const d = new Path().move(0, 200)
            .line(radius, 0)
            .moveTo(radius * Math.cos(Math.PI/3), 200 - radius * Math.sin(Math.PI/3))
            .arc(0, 2 * radius * Math.sin(Math.PI/3) ,radius, radius);
        const xThumb = thumbPath(xThumbX, 200);
        const angleThumb = thumbPath(radius * Math.cos(dAngle), 200 - radius * Math.sin(dAngle));

        const path = new Path().moveTo(0, 200)
            .line(100, 0)
            .curveTo(
                xThumbX, 200,
                xThumbX, 200,
                radius * Math.cos(dAngle), 200 - radius * Math.sin(dAngle), 
                // radius * Math.cos(Math.PI/4), 200 - radius * Math.sin(Math.PI/4)
            ).arcTo(radius * Math.cos(Math.PI/3), 200 - radius * Math.sin(Math.PI/3), radius, radius, false, true);
        return <View style={{width : 400, height : 400, paddingLeft : 20}}>
        <Surface width={400} height={400}>
        <Group x={0} y={0}>
            <Shape d={d} strokeWidth={1} stroke="gray"></Shape>
            <Shape d={xThumb} fill="black"></Shape>
            <Shape d={angleThumb} fill="blue"></Shape>
            <Shape d={path} strokeWidth={4} stroke="black"></Shape>
        </Group>
        </Surface>
        <Text>X Point at {round(xThumbX - 200)},{0}</Text>
        <Slider style={{marginHorizontal : 20}} value={x} onValueChange={this.handleXChange}></Slider>
        <Text>Angle at {round(-30 + 60 * angle)}</Text>
        <Slider style={{marginHorizontal : 20}} value={angle} onValueChange={this.handleAngleChange}></Slider>
        </View>
    }
}