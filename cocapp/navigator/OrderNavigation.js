import React, { Component } from 'react';
import OrderCompletedPage from '../pages/OrderCompletedPage';
import OrderToDoPage from '../pages/OrderToDoPage';
import OrderUndonePage from '../pages/OrderUndonePage';
import {TabNavigator,TabBarTop,StackNavigator} from 'react-navigation'
import OrderDetail from "../pages/OrderDetailPage";

import {
    View
} from 'react-native'



const OrderRouteConfigs = {
    Home : {
        screen:OrderCompletedPage,
        navigationOptions:({navigation}) => ({
            tabBarLabel: '已完成',
        }),
    },

    OrderToDo : {
        screen:OrderToDoPage,
        navigationOptions:({navigation}) => ({
            tabBarLabel: '待完成',
        }),
    },

    OrderUndone : {
        screen:OrderUndonePage,
        navigationOptions:({navigation}) => ({
            tabBarLabel: '未完成',
        }),
    },
};

const OrderConfigs = {
    initialRouteName: 'Home',
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    lazy: true,
    tabBarOptions: {
        indicatorStyle:{
            backgroundColor:'#fff'
        },
        style:{
            backgroundColor:'#25d6f4',

        },
    },
};
const OrderNavigator = TabNavigator(OrderRouteConfigs,OrderConfigs);

const OrderStackNavigator = StackNavigator({
    Home:{
        screen:OrderNavigator,
        navigationOptions:{
            header:null
        }
    },

    OrderDetail :{
        screen:OrderDetail,

    },

});


export default OrderStackNavigator;