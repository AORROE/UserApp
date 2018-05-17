import React,{Component} from 'react';
import {TabNavigator,TabBarTop,StackNavigator} from 'react-navigation'
import {
    Text,
    View,
    Image
} from 'react-native';

class Yestoday extends Component{
    render(){
        return(
            <View style={{flexDirection:'column',margin:5,borderRadius:5,elevation:3}}>
                <View style={{flexDirection:'column',height:80,padding:10}}>
                    <View>
                        <Text style={{fontSize:15}}>营业额</Text>
                    </View>
                    <View>
                        <Text style={{fontSize:25}}>
                            ¥555
                        </Text>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>比昨日</Text>
                        <Image source={require('../images/icon_toparrow.png')} style={{width:10,height:15}}/>
                        <Text>6%</Text>
                    </View>

                </View>

                <View style={{height:80,flexDirection:'row'}}>
                    <View style={{flex:1,padding:10}}>
                        <View>
                            <Text style={{fontSize:15}}>有效单数</Text>
                        </View>
                        <View>
                            <Text style={{fontSize:15}}>
                                50单
                            </Text>
                        </View>

                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text>比前1日</Text>
                            <Image source={require('../images/icon_toparrow.png')} style={{width:10,height:15}}/>
                            <Text>2%</Text>
                        </View>
                    </View>

                    <View style={{height:50,borderWidth:0.2,marginTop:20,borderColor:'#cfcfcf'}}></View>

                    <View style={{flex:1,padding:10}}>
                        <View>
                            <Text style={{fontSize:15}}>访店人数</Text>
                        </View>
                        <View>
                            <Text style={{fontSize:15}}>
                                100人
                            </Text>
                        </View>

                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text>比前1日</Text>
                            <Image source={require('../images/icon_bottom.png')} style={{width:10,height:15}}/>
                            <Text>6%</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

class Weeks extends Component{
    render(){
        return(
            <View style={{flexDirection:'column',margin:5,borderRadius:5,elevation:3}}>
                <View style={{flexDirection:'column',height:80,padding:10}}>
                    <View>
                        <Text style={{fontSize:15}}>营业额</Text>
                    </View>
                    <View>
                        <Text style={{fontSize:25}}>
                            ¥555
                        </Text>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>比前一周</Text>
                        <Image source={require('../images/icon_toparrow.png')} style={{width:10,height:15}}/>
                        <Text>1%</Text>
                    </View>

                </View>

                <View style={{height:80,flexDirection:'row'}}>
                    <View style={{flex:1,padding:10}}>
                        <View>
                            <Text style={{fontSize:15}}>有效单数</Text>
                        </View>
                        <View>
                            <Text style={{fontSize:15}}>
                                120单
                            </Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <Text>比前一周</Text>
                            <Image source={require('../images/icon_toparrow.png')} style={{width:10,height:15}}/>
                            <Text>1%</Text>
                        </View>
                    </View>

                    <View style={{height:50,borderWidth:0.2,marginTop:20,borderColor:'#cfcfcf'}}></View>

                    <View style={{flex:1,padding:10}}>
                        <View>
                            <Text style={{fontSize:15}}>访店人数</Text>
                        </View>
                        <View>
                            <Text style={{fontSize:15}}>
                                500人
                            </Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <Text>比前一周</Text>
                            <Image source={require('../images/icon_toparrow.png')} style={{width:10,height:15}}/>
                            <Text>2%</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
class Month extends Component{
    render(){
        return(
            <View style={{flexDirection:'column',margin:5,borderRadius:5,elevation:3}}>
                <View style={{flexDirection:'column',height:80,padding:10}}>
                    <View>
                        <Text style={{fontSize:15}}>营业额</Text>
                    </View>
                    <View>
                        <Text style={{fontSize:25}}>
                            ¥555
                        </Text>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>比前1个月</Text>
                        <Image source={require('../images/icon_bottom.png')} style={{width:10,height:15}}/>
                        <Text>1%</Text>
                    </View>

                </View>

                <View style={{height:80,flexDirection:'row'}}>
                    <View style={{flex:1,padding:10}}>
                        <View>
                            <Text style={{fontSize:15}}>有效单数</Text>
                        </View>
                        <View>
                            <Text style={{fontSize:15}}>
                                1300单
                            </Text>
                        </View>

                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text>比前1个月</Text>
                            <Image source={require('../images/icon_bottom.png')} style={{width:10,height:15}}/>
                            <Text>1%</Text>
                        </View>
                    </View>

                    <View style={{height:50,borderWidth:0.2,marginTop:20,borderColor:'#cfcfcf'}}></View>

                    <View style={{flex:1,padding:10}}>
                        <View>
                            <Text style={{fontSize:15}}>访店人数</Text>
                        </View>
                        <View>
                            <Text style={{fontSize:15}}>
                                1413人
                            </Text>
                        </View>

                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text>比前1个月</Text>
                            <Image source={require('../images/icon_toparrow.png')} style={{width:10,height:15}}/>
                            <Text>1%</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const AnalusisRouteConfigs = {
    Home : {
        screen:Yestoday,
        navigationOptions:({navigation}) => ({
            tabBarLabel: '今日',
        }),
    },
    Second:{
        screen:Weeks,
        navigationOptions:({navigation}) => ({
            tabBarLabel: '近7天',
        }),
    },

    Third:{
        screen:Month,
        navigationOptions:({navigation}) => ({
            tabBarLabel: '近30天',
        }),
    }
};

const AnalusisConfigs = {
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
            marginLeft:30
        },
        style:{
            backgroundColor:'#25d6f4',
            margin:5,
            borderRadius:5
        },
    },
};

const AnalusisNavigator = TabNavigator(AnalusisRouteConfigs,AnalusisConfigs);


export default AnalusisNavigator;