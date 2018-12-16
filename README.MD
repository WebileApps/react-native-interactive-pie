## React Native Interactive Pie Chart.

### Installation
`npm install @webileapps/react-native-piechart`

### Usage

```jsx
const COLORS = ["#acb5e8", "#c3c5c0", "#afe5d2", "#f9e3b4", "#a3dbec", "#ff8c8b"];
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <HomeLogo colors={COLORS}>
          <View style={{width : 50, height: 50, backgroundColor: "red"}}></View>
          <View style={{width : 50, height: 50, backgroundColor: "green"}}></View>
          <View style={{width : 50, height: 50, backgroundColor: "cyan"}}></View>
          <View style={{width : 50, height: 50, backgroundColor: "pink"}}></View>
          <View style={{width : 50, height: 50, backgroundColor: "yellow"}}></View>
          <View style={{width : 50, height: 50, backgroundColor: "blue"}}></View>
        </HomeLogo>
      </View>
    );
  }
}
```

### Run Demo
There is a example project that is build to showcase how the plugin works.

```
cd src
npm run plugin.prepare
npm run expo
```

### Screenshot
