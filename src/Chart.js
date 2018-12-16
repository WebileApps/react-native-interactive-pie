import React from 'react';
const { ART : { Surface, Shape, Group, Path, Transform }, View } = require("react-native");

const OFFSET = -50;
const SIN_30 = Math.sin(Math.PI/6);
const COS_30 = Math.cos(Math.PI/6); //0.5
const COS_45 = Math.cos(Math.PI * 32.5 / 180);
const SIN_45 = Math.sin(Math.PI * 32.5 / 180);
const COS_10 = Math.cos(Math.PI * 15 / 180);
const SIN_10 = Math.sin(Math.PI * 15 / 180);
const pathForArc = (outerRadius, gap = 0, innerRadius = 35) => 
    new Path().moveTo(gap + (outerRadius + OFFSET) * COS_30, 0 - (outerRadius + OFFSET) * SIN_30)
        .curveTo(
                gap + (outerRadius + 4) * COS_30, -(outerRadius + 4) * SIN_30, 
                gap + (outerRadius + 4) * COS_30, -(outerRadius + 4) * SIN_30, 
                gap + outerRadius * COS_10, -outerRadius * SIN_10
        )
        .arcTo(gap + outerRadius * COS_45, 0 + outerRadius * SIN_45, outerRadius, outerRadius)
        .curveTo(
            gap + (outerRadius - 8) * COS_30, (outerRadius - 8) * SIN_30, 
            gap + (outerRadius - 8) * COS_30, (outerRadius - 8) * SIN_30, 
            gap + (outerRadius + OFFSET) * COS_30, 0 + (outerRadius + OFFSET) * SIN_30
        )
        .lineTo(gap + innerRadius * COS_30, innerRadius * SIN_30)
        .arcTo (gap + innerRadius * COS_30, -innerRadius * SIN_30, innerRadius, innerRadius, false, true)
        .close();

const rotateArc = (size, angle) => new Transform().translate(size/2, size/2).rotate(angle);
        
const innerCircle = (size, circleRadius) => new Path().moveTo(size/2+ circleRadius, size/2)
                .arcTo(size/2 - circleRadius, size/2, circleRadius, circleRadius)
                .arcTo(size/2 + circleRadius, size/2, circleRadius, circleRadius)
                .close();

const COLORS = ["#acb5e8", "#c3c5c0", "#afe5d2", "#f9e3b4", "#a3dbec", "#ff8c8b"];
export default function Chart({ size = 200, selectedIndex = 5, colors = COLORS, ...rest }) {
    const outerRadius = (size-25)/2;
    const innerRadius = 35;
    const strokeWidth = 4;

    const circleRadius = innerRadius;
    const indices = new Array(6).fill(0).map((v, i) => i);
    return <Surface width={size} height={size} {...rest}>
        {/* <Group x={0} y={0}>
            <Shape d={pathForArc(outerRadius, strokeWidth)} strokeWidth={0} transform={rotateArc(size, 60 * selectedIndex)} fill={colors[selectedIndex]}></Shape>
        </Group> */}
        <Group x={0} y={0}>
            {indices.filter(i => i!= selectedIndex).map(i => 
                <Shape key={i} d={pathForArc(outerRadius, strokeWidth)} transform={rotateArc(size, 60 * i)} fill={colors[i]}></Shape>
            )}
        </Group>
        <Group x={0} y={0}>
            {indices.filter(i => i== selectedIndex).map(i => 
                <Group key={i}>
                    {/* <Shape d={pathForArc(outerRadius + 8, strokeWidth)} strokeWidth={0} transform={rotateArc(size, 60 * i)} fill="rgba(0,0,0,0.1)"></Shape> */}
                    <Shape d={pathForArc(outerRadius, strokeWidth + 5)} strokeWidth={2} stroke="black" transform={rotateArc(size, 60 * i)} fill={colors[i]}></Shape>
                </Group>
            )}
        </Group>
    </Surface>
}