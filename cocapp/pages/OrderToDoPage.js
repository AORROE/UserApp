import React, { Component } from 'react';
import NT from '../utils/NavigatorTools'
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import Storage from "../utils/Storage";
import WebSocketUtil from "../utils/WebSocketUtil";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class OrderToDoPage extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            refreshing:false
        }
    }

    componentWillMount(){
        this.getData()
    }

    getData(){
        Storage.get('token',(value)=>{
            Storage.get('shopInfo',(valueid)=>{
                NT.get("http://101.132.71.227/api/app/getOrderUnpay/"+valueid[0].id,(res)=>{
                    let resbody = JSON.parse(res._bodyInit);
                    if(resbody.status === "success"){
                        let data1 = [];
                        data1 = resbody.response;
                        this.setState({
                            data:data1
                        })
                    }else{

                    }
                },value)
            })
        })
    }

    refreshing(){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
        },1500)
    }
    _onload(){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
        },1500)
    }

    clickItem(item,index) {
        NT.navi.navigate('OrderDetail',{Order:item.status});
    }

    keyExtractor = (item,index) => index;

    renderSeparator(){
        return(
            <View style={{width:screenWidth * 0.9,height:0.4, backgroundColor: '#cecece',marginLeft:18}}></View>
        );
    }

    renderItem({item,index}){
        var goodslist = [];
        var countsum=0;
        var pricesum=0;
        for(var i =0 ; i < item.goods.length;i++){
            var goods =(
                <View
                    key={i}
                    style={{flexDirection:'row',justifyContent:'space-between',flex:1,marginRight:5,marginLeft:5}}>
                    <View style={{flex:1}}>
                        <Text>{item.goods[i].name}</Text>
                    </View>

                    <View style={{flex:1,alignItems:'center'}}>
                        <Text>x{item.goods[i].pivot.num}</Text>
                    </View>

                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Text>{item.goods[i].price}</Text>
                    </View>
                </View>
            );
            countsum = item.goods[i].pivot.num+countsum;
            pricesum = item.goods[i].pivot.price+pricesum;
            goodslist.push(goods);
        }
        return(
            <TouchableOpacity
                key={index}
                style={{flexDirection:'column',alignItems:'center',backgroundColor:'#fff',borderRadius:5,borderBottomWidth:2,borderRightWidth:2,borderLeftWidth:1,borderTopWidth:1,borderColor:'#dfdfdf'}}
                onPress={this.clickItem.bind(this,item,index)}
                activeOpacity={1}>
                <View
                    style={{flexDirection:'row',justifyContent:'space-between',
                        alignItems:'center',marginRight:2,marginLeft:2}}>
                    <View style={{flexDirection:'row',flex:1,alignItems:'center',marginTop:5}}>
                        <Image source={{uri:item.user.avatar}} style={{width:30,height:30,borderRadius:5}}/>
                        <Text>{item.user.name}</Text>
                    </View>
                    <Text>{item.status===0?'订单已完成':''}</Text>
                </View>

                <View style={{flex:1,width:screenWidth}}>
                    <View style={{justifyContent:'space-between',flexDirection:'row',margin:5,marginRight:8,marginLeft:8}}>
                        <View style={{flex:1}}>
                            <Text>商品名称</Text>
                        </View>
                        <View style={{flex:1,alignItems:'center'}}>
                            <Text>数量</Text>
                        </View>
                        <View style={{flex:1,alignItems:'flex-end'}}>
                            <Text>单价</Text>
                        </View>
                    </View>
                    <View style={{justifyContent:'space-between',flexDirection:'column',margin:5}}>
                        {goodslist}
                    </View>
                    <View style={{justifyContent:'space-between',flexDirection:'row',margin:5,alignItems:'center',marginRight:10,marginLeft:10}}>
                        <Text>{item.pay_time}</Text>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Text>共{countsum}件 </Text>
                            <Text style={{color:'#000000',fontSize:18}}>实付 </Text>
                            <Text style={{color:'#e90d21',fontSize:18,marginLeft:5}}>{pricesum}元</Text>
                        </View>
                    </View>
                    {this.renderSeparator()}
                </View>

                <View style={{flexDirection:'row',padding:10,justifyContent:'flex-end',width:screenWidth}}>
                    <TouchableOpacity
                        style={{width:80,height:30,borderColor:'#1295D9',borderWidth:1,
                            alignItems:'center',justifyContent:'center',borderRadius:5,marginRight:20}}>
                        <Text style={{color:'#1295D9'}}>删除</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{width:80,height:30,borderColor:'#ffb701',borderWidth:1,
                            alignItems:'center',justifyContent:'center',borderRadius:2}}>
                        <Text style={{color:'#222102'}}>支付</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }

    render(){
        return(
        <View style={styles.container}>

            {this.state.data.length !== 0?(
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem.bind(this)}
                        showsVerticalScrollIndicator={false}
                        refreshing={this.state.refreshing}
                        onRefresh={this.refreshing}
                        keyExtractor={this.keyExtractor}
                        ItemSeparatorComponent={this.renderSeparator}
                        onEndReachedThreshold={0}
                        onEndReached={this._onload}/>
                ):
                (<Text>暂时没有订单</Text>) }
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
        padding:5
    },
});