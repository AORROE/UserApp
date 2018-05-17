import React,{Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    processColor,
    Dimensions,TouchableOpacity
} from 'react-native';
const {width} = Dimensions.get('window');
import {BarChart} from 'react-native-charts-wrapper';

class BarChartScreen extends Component {

    constructor() {
        super();

        this.state = {
            legend: {
                enabled: false,
                textSize: 14,
                form: 'CIRCLE',
                formSize: 14,
                xEntrySpace: 10,
                yEntrySpace: 5,
                formToTextSpace: 5,
                wordWrapEnabled: true,
                maxSizePercent: 0.5
            },
            data: {
                dataSets: [{
                    values: [{y: 10}, {y: 5}, {y: 20}, {y: 40}, {y: 30}, {y: 11}, {y: 4}, {y: 5}, {y: 2}],
                    label: 'Bar dataSet',
                    config: {
                        color: processColor('teal'),
                        barSpacePercent: 40,
                        barShadowColor: processColor('lightgrey'),
                        highlightAlpha: 90,
                        highlightColor: processColor('red'),
                    }
                }],
            },
            xAxis: {
                valueFormatter: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
                granularityEnabled: true,
                granularity : 1,
            },
            aaa:[{y: 10}, {y: 2}, {y: 1}, {y: 45}, {y: 3}, {y: 11}, {y: 4}, {y: 5}, {y: 2}],

        };
    }

    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            this.setState({...this.state, selectedEntry: null})
        } else {
            this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
        }
    }

    componentDidMount(){
        this.click()
    }

    click(){
        this.timer=setTimeout(() =>{
            this.setState({
                data: {
                    dataSets: [{
                        values: this.state.aaa,
                        label: 'Bar dataSet',
                        config: {
                            color: processColor('teal'),
                            barSpacePercent: 40,
                            barShadowColor: processColor('lightgrey'),
                            highlightAlpha: 90,
                            highlightColor: processColor('red'),
                        }
                    }],
                },
            })
        },5000)

    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={{flex: 1,}}>

                <View style={{height:20}}>
                    <TouchableOpacity onPress={this.click.bind(this)}>
                    <Text> 今日到店人数</Text>
                    {/*<Text> {this.state.selectedEntry}</Text>*/}

                    </TouchableOpacity>
                </View>


                <View style={styles.container}>
                    <BarChart
                        style={styles.chart}
                        data={this.state.data}
                        xAxis={this.state.xAxis}
                        animation={{durationX: 2000}}
                        legend={this.state.legend}
                        gridBackgroundColor={processColor('#ffffff')}
                        drawBarShadow={false}
                        drawValueAboveBar={true}
                        drawHighlightArrow={true}
                        onSelect={this.handleSelect.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        width:width*0.93,
        marginRight:5,

    },
    chart: {
        height:200,
    }
});

export default BarChartScreen;