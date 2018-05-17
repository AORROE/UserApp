import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    processColor,
} from 'react-native';

import {SafeAreaView} from 'react-navigation';

import {PieChart} from 'react-native-charts-wrapper';

class PieChartScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            legend: {
                enabled: true,
                textSize: 8,
                form: 'CIRCLE',
                position: 'RIGHT_OF_CHART',
                wordWrapEnabled: true
            },
            data: {
                dataSets: [{
                    values: [{value: 40, label: '商品1'},
                        {value: 21, label: '商品2'},
                        {value: 15, label: '商品3'},
                        {value: 9, label: '商品4'},
                        {value: 15, label: '商品5'}],
                    label: '',
                    config: {
                        colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D')],
                        valueTextSize: 15,
                        valueTextColor: processColor('green'),
                        sliceSpace: 5,
                        selectionShift: 13
                    }
                }],
            },
            highlights: [{x:2}],
            // description: {
            //     text: 'This is Pie chart description',
            //     textSize: 15,
            //     textColor: processColor('darkgray'),
            //
            // }
        };
    }

    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            this.setState({...this.state, selectedEntry: null})
        } else {
            this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
        }

        console.log(event.nativeEvent)
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1,height:300}}>
                <View>
                    <Text>偏好商品:</Text>
                    <Text> {this.state.selectedEntry}</Text>
                </View>

                <View style={styles.container}>
                    <PieChart
                        style={styles.chart}
                        logEnabled={true}
                        chartBackgroundColor={processColor('#fff')}
                        chartDescription={this.state.description}
                        data={this.state.data}
                        legend={this.state.legend}
                        highlights={this.state.highlights}

                        entryLabelColor={processColor('black')}
                        entryLabelTextSize={12}
                        drawEntryLabels={true}

                        rotationEnabled={true}
                        rotationAngle={45}
                        usePercentValues={false}
                        styledCenterText={{text:'偏好', color: processColor('pink'), size: 20}}
                        centerTextRadiusPercent={50}
                        holeRadius={40}
                        holeColor={processColor('#f0f0f0')}
                        transparentCircleRadius={45}
                        transparentCircleColor={processColor('#f0f0f088')}
                        maxAngle={350}
                        onSelect={this.handleSelect.bind(this)}
                        onChange={(event) => console.log(event.nativeEvent)}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chart: {
        flex: 1,
        flexDirection:'row'
    }
});

export default PieChartScreen;