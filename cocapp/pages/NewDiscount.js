
import React, { Component } from 'react';
import NT from '../utils/NavigatorTools';
import LinearGradient from 'react-native-linear-gradient';
import SeparatorComponent from '../component/SeparatorComponent';

import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    FlatList,
    ScrollView,
    DeviceEventEmitter,
    TouchableHighlight, Alert
} from 'react-native';
import Storage from "../utils/Storage";

const screenWidth = Dimensions.get('window').width;
const screenHeight= Dimensions.get('window').height;

export default class NewDiscount extends Component{
    static navigationOptions={
        headerTitle:'优惠券',
        headerBackTitle:null,
        headerStyle: {backgroundColor: '#25d6f4'},
        headerTitleStyle: {alignSelf: 'center',color:'#fff'},
        headerRight:(
            <View>
            </View>
        )
    };
    constructor(props){
        super(props);
        this.state={
            data:[],
            refreshing:false,
        }
    }

    componentWillMount(){
        this.getData()
    }
    //
    getData(){
        Storage.get('token',(value)=>{
            Storage.get('shopInfo',(valueid)=>{
                NT.get("http://101.132.71.227/api/app/getAllCoupon/"+valueid[0].id,(res)=>{
                    let resbody = JSON.parse(res._bodyInit);
                    // console.warn(resbody)
                    let data1 = [];
                    data1 = resbody.response;
                    this.setState({
                        data:data1
                    })
                },value)
            })
        })
    }

    addDiscount() {
        NT.navi.navigate('Discount',{
            callback:(data)=>{
                listData = this.state.data;
                listData.splice(0,0,data);
                this.setState({data:listData});
            },
            'shop_id':this.state.data[0].shop_id
        })
    }

    //此函数用于为给定的item生成一个不重复的key
    keyExtractor = (item,index) => index;


    getItemLayout=(data, index) => ({
        length:100,
        offset:(100+2)*index,
        index
    });
    //
    refreshing =() =>{
        this.setState({refreshing:true}); //开始刷新
        this.getData();
        setTimeout(() => {
            this.setState({refreshing:false})//停止刷新
        }, 2000);
    };

    delDiscount(item,index){
        Alert.alert('是否删除优惠券?','',[
            {text :'取消'},
            {
                text:'确定',
                onPress:() => {
                    Storage.get('token',(value)=>{
                        NT.post("http://101.132.71.227/api/app/delCoupon",{coupon_id:item.id},(res)=>{
                            console.warn(res)
                            listData = this.state.data;
                            listData.splice(index,1);
                            this.setState({data:listData});
                        },value);
                    });
                }
            }
        ])

    }


    renderFoot1(){
        return(
            <View style={{position:'absolute',bottom:5,borderWidth:1.5,borderRadius:49,borderColor:'#e2e2e2'}}>
                <TouchableOpacity
                    onPress={this.addDiscount.bind(this)}
                    style={{flexDirection:'row',alignItems:'center',width:100,height:30,
                        justifyContent:'center',borderWidth:1,borderRadius:50,borderColor:'#43dccd',
                    }}>
                    <Text style={{color:'#000000'}}>添加优惠券</Text>
                </TouchableOpacity>
            </View>
        );
    }


    renderItem({item,index}){
        return(
            item.type=='满减'?
                <TouchableHighlight
                    underlayColor='#fff'
                    activeOpacity={0.8}
                    onLongPress={this.delDiscount.bind(this,item,index)}>
                <LinearGradient
                    key={index}
                    // source={require('../images/image1.jpg')}
                    start={{x: 0.3, y: 0.3}} end={{x: 0.6, y: 0.8}}
                    locations={[0,0.8,1]}
                    colors={['#10d9a9','#10d9a9','#10d9a9']}
                    style={{backgroundColor:'#fff',borderWidth:1,elevation:4
                        ,flexDirection:'row',borderColor:'#000',overflow:'hidden',
                        borderRadius:10}}
                    // resizeMode={'cover'}
                >
                    <View style={{flex:2,flexDirection:'column',padding:20}}>
                        <View>
                            <Text style={{fontSize:20,color:'#000'}}>满减券</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={{fontSize:13,color:'#000'}}>满{item.money}减{item.discount}</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text  style={{fontSize:13,color:'#000'}}>开始时间:  {item.start_time}</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={{fontSize:13,color:'#000'}}>结束时间:  {item.end_time}</Text>
                        </View>
                    </View>

                    <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                        <View style={{flex:2,justifyContent:'center',flexDirection:'column'}}>
                            <Text style={{fontSize:40}}>¥{item.discount}</Text>
                        </View>
                        <View style={{flex:1,justifyContent:'center',flexDirection:'column'}}>
                            <Text style={{fontSize:16}}>数量: {item.num}</Text>
                        </View>
                    </View>
                </LinearGradient>
                </TouchableHighlight>
                :
                    <TouchableHighlight
                        underlayColor='#fff'
                        activeOpacity={0.8}
                        onLongPress={this.delDiscount.bind(this,item,index)}>
                        <LinearGradient
                            key={index}
                            start={{x: 0.3, y: 0.0}} end={{x: 0.0, y: 0.8}}
                            locations={[0,0.2,1]}
                            colors={['#94E0F5','#94E0F5','#94E0F5']}
                            style={{backgroundColor:'#fff',borderWidth:1,elevation:4
                                ,flexDirection:'row',borderColor:'#1295D9',overflow:'hidden',
                                borderRadius:10}}
                        >
                            <View style={{flex:3,flexDirection:'column',padding:20}}>
                                <View>
                                    <Text style={{fontSize:20,color:'#ffffff'}}>折扣券</Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{fontSize:13,color:'#000'}}>满{item.money}元打{item.discount}折</Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text  style={{fontSize:13,color:'#000'}}>开始时间:  {item.start_time}</Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{fontSize:13,color:'#000'}}>结束时间:  {item.end_time}</Text>
                                </View>
                            </View>

                            <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <View style={{flex:2,justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
                                    <Text style={{fontSize:40}}>{item.description}</Text>
                                    <View style={{borderColor:'#1295D9',width:30,height:30,borderWidth:0.5,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontSize:20,color:'#1295D9'}}>折</Text>
                                    </View>
                                </View>
                                <View style={{flex:1,justifyContent:'center',flexDirection:'column'}}>
                                    <Text style={{fontSize:16}}>数量: {item.num}</Text>
                                </View>
                            </View>
                        </LinearGradient>
                </TouchableHighlight>

        );
    }

    renderSeparator(){
        return(
            <SeparatorComponent/>
        );
    }

    render(){
        return(
            <View style={{flex:1,paddingRight:10,paddingLeft:10,paddingTop:10,backgroundColor:'#fff'}}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem.bind(this)}
                        showsVerticalScrollIndicator={false}
                        getItemLayout={this.getItemLayout.bind(this)}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={this.keyExtractor}
                        refreshing={this.state.refreshing}
                        onRefresh={this.refreshing}
                        onEndReachedThreshold={0.5}
                        // onEndReached={this.onload.bind(this)}
                        // ListHeaderComponent={this.renderHead()}
                        //ListFooterComponent={this.renderFoot.bind(this)}
                    />
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    {this.renderFoot1()}
                </View>
            </View>

        );
    }
}