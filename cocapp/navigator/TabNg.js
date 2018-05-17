import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    DeviceEventEmitter
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import NewHome from '../pages/NewHome';
import Storage from '../utils/Storage';
import OrderNavigator from '../navigator/OrderNavigation';
import NT from '../utils/NavigatorTools'
import NewUser from '../pages/NewUserPage';

export default class TabNg extends Component{
    constructor(props){
        super(props);
        this.state={
            selectIndex:0,
            isLogin:false,
        };
        NT.navi = this.props.navigation;
    }

    componentWillMount(){
        // Storage.get('token',(value)=>{
        //     if(value!== null){
        //
        //     }else {
        //         NT.navi.navigate('Login',{})
        //     }
        // });
        // DeviceEventEmitter.addListener('key',()=>{this.setState({isLogin:true})})

    }
    componentWillUnmount(){
        Storage.delete('token');
        Storage.delete('userInfo')
    }


    render(){
        return(
            <TabNavigator
                tabBarStyle={tabStyle.tabBarStyles}>
                <TabNavigator.Item
                    title="首页"
                    selected={0==this.state.selectIndex}
                    selectedTitleStyle={{color:'#1295D9'}}
                    renderIcon={() => <Image source={require('../images/icon_home.png')} style={{width:20,height:20}}/>}
                    renderSelectedIcon={() => <Image source={require("../images/icon_home_select.png")} style={{width:20,height:20}}/>}
                    onPress={() => this.setState({ selectIndex: 0 })}>
                    <NewHome navigate={this.props.navigation.navigate}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="订单"
                    selected={1==this.state.selectIndex}
                    selectedTitleStyle={{color:'#1295D9'}}
                    renderIcon={() => <Image source={require('../images/icon_order.png')} style={{width:20,height:20}}/>}
                    renderSelectedIcon={() => <Image source={require("../images/icon_order_select.png")} style={{width:20,height:20}}/>}
                    onPress={() => this.setState({ selectIndex: 1 })}>
                    <OrderNavigator  navigate={this.props.navigation.navigate}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="我的"
                    selected={2==this.state.selectIndex}
                    selectedTitleStyle={{color:'#1295D9'}}
                    renderIcon={() => <Image source={require('../images/icon_my.png')} style={{width:20,height:20}}/>}
                    renderSelectedIcon={() => <Image source={require("../images/icon_my_select.png")} style={{width:20,height:20}}/>}
                    onPress={() => this.setState({ selectIndex: 2 })}>
                    <NewUser  navigate={this.props.navigation.navigate} isLogin={this.state.isLogin} userInfo={this.state.userInfo}/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

const tabStyle = StyleSheet.create({
    tabBarStyles :{
        backgroundColor:'#f5f8ff',
        height:50,
        opacity:1,

    }
});