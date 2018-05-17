import React, { PureComponent } from 'react';
import {TabNavigator,TabBarTop} from 'react-navigation'
import BarChartScreen from '../pages/BarChartScreen';
import PieChartScreen from '../pages/PieChartScreen';
import AxisLineChartScreen from '../pages/AxisLineChartScreen';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

class Today extends PureComponent{
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <ScrollView style={{flex:1,backgroundColor:'#fff'}}>

                <BarChartScreen style={{width:300,height:100}}/>
                <PieChartScreen style={{width:300,height:100}}/>
                <BarChartScreen style={{width:300,height:100}}/>
            </ScrollView>
        );
    }
}

class Week extends PureComponent{

    render(){
        return(
            <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
                <BarChartScreen style={{width:300,height:100}}/>
                <BarChartScreen style={{width:300,height:100}}/>
                <BarChartScreen style={{width:300,height:100}}/>
            </ScrollView>
        );
    }
}

class Month extends PureComponent{

    render(){
        return(
            <AxisLineChartScreen/>
        );
    }
}

const AnalusisNa = TabNavigator({
    Home:{
        screen:Today,
        navigationOptions:({navigation}) => ({
            tabBarLabel: '今日',
        }),
    },

    Second :{
        screen:Week,
        navigationOptions:({navigation}) => ({
            tabBarLabel: '近7日',
        }),
    },

    Third :{
        screen:Month,
        navigationOptions:({navigation}) => ({
            tabBarLabel: '近30日',
        }),
    }
},{
    initialRouteName: 'Home',
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    lazy: true,
    tabBarOptions: {
        indicatorStyle:{
            backgroundColor:'#fff',
            width:52,
            justifyContent:'center',
            alignItems:'center',
            marginLeft:34
        },
        style:{
            backgroundColor:'#25d6f4',
            height:40
        }
    },
});

const styles = StyleSheet.create({

});

export default AnalusisNa;