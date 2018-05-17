import React, { Component } from 'react';
import NT from '../utils/NavigatorTools';
import SeparatorComponent from '../component/SeparatorComponent';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Alert, ScrollView, DeviceEventEmitter
} from 'react-native';
import Storage from "../utils/Storage";

const screenWidth = Dimensions.get('window').width;
const screenHeight= Dimensions.get('window').height;

export default class GoodsPage extends Component{
    static navigationOptions={
        headerTitle:'商品',
        headerBackTitle:null,
        headerStyle: {backgroundColor: '#1295D9'},
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
            showId:'',
            avatar:''
        }
    }

    componentWillMount(){
        this.getData()
    }

    getData(){
        Storage.get('token',(value)=>{
            Storage.get('shopInfo',(valueid)=>{
                NT.get("http://101.132.71.227/api/app/getAllGoods/"+valueid[0].id,(res)=>{
                    let resbody = JSON.parse(res._bodyInit);
                    console.warn(resbody)
                        let data1 = [];
                        data1 = resbody.response;
                        this.setState({
                            data:data1
                        })
                },value)
            })
        })
    }

    delectGoods(item,index){
        Storage.get('token',(value)=>{
            NT.post("http://101.132.71.227/api/app/delGoods",{goods_id:item.id},(res)=>{
                // console.warn(res)
                listData = this.state.data;
                listData.splice(index,1);
                this.setState({data:listData});
            },value);
        })
        // console.warn(index)
    }

    addGoods(){
        NT.navi.navigate('GoodsAdd',{
            callback:(data,data2)=>{
                listData = this.state.data;
                listData.splice(listData.length,0,data);
                this.setState({data:listData,avatar:data2});
            },
        })
    }

    //此函数用于为给定的item生成一个不重复的key
    keyExtractor = (item,index) => index;

    renderSeparator(){
        return(
                <SeparatorComponent/>
        );
    }

    getItemLayout=(data, index) => ({
        length:100,
        offset:(100+2)*index,
        index
    });

    refreshing =() =>{
        this.setState({refreshing:true}); //开始刷新
        this.getData();
        setTimeout(() => {
            this.setState({refreshing:false})//停止刷新
        }, 2000);
    };

    clickGoods(item,index){
        NT.navi.navigate('GoodsDetail',{item:item,callback:()=>{this.getData()}})
    }


    renderFoot1(){
        return(
            <View style={{
                justifyContent:'center',alignItems:'center',flexDirection:'column',backgroundColor:'#fff',
                position:'absolute',top:screenHeight*0.83,borderRadius:10}}>
                <TouchableOpacity
                onPress={this.addGoods.bind(this)}
                style={{flexDirection:'row',alignItems:'center',width:120,height:30,
                    justifyContent:'center',borderWidth:1,borderRadius:10,borderColor:'#43dccd'}}>
                <Text style={{color:'#43dccd'}}>添加商品</Text>
            </TouchableOpacity>
            </View>
        );
    }


    renderItem({item,index}){
        var list = [];
        for(var i =0 ; i < item.tags.length;i++){
            var label =(
                <View key={i}
                      style={{width:30,height:18,borderRadius:5,marginLeft:5,alignItems:'center',
                          justifyContent:'center',borderColor:'#38b7ff',borderWidth:1}}>
                    <TouchableOpacity>
                        <Text style={{fontSize:10,color:'#38b7ff'}}>{item.tags[i].name}</Text>
                    </TouchableOpacity>
                </View>
            );
            list.push(label);
        }

        return(
            <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={{flexDirection:'row',backgroundColor:'#fff'}}
                onPress={this.clickGoods.bind(this,item,index)}>
                <View style={{flex:1,padding:10}}>
                    <Image source={{uri:"http://101.132.71.227/"+item.avatar}}
                            style={{flex:1,borderRadius:20}}  resizeMode="stretch"/>
                </View>

                <View style={{height:120,flex:2,flexDirection:'column'}}>
                    <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',padding:5,marginTop:5}}>
                        <Text style={{fontSize:18,color:'#000'}}>{item.name}</Text>
                        <Text style={{fontSize:13}}>剩余量 {item.num}</Text>
                    </View>

                    <View style={{flex:1,padding:5}}>
                        <Text numberOfLines={1} style={{fontSize:13}}>{item.description}</Text>
                    </View>

                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        {list}
                    </View>

                    <View style={{flex:1,padding:5,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontSize:18}}>￥{item.price}</Text>
                            <Text
                                style={{borderWidth:1,width:30,height:18,textAlign:'center',
                                    marginLeft:5,borderColor:'#38b7ff',color:'#38b7ff'}}
                            >8折</Text>
                        </View>
                        <TouchableOpacity
                            onPress={this.delectGoods.bind(this,item,index)}
                            style={{borderWidth:1,borderRadius:5,width:70,height:20,justifyContent:'center',alignItems:'center',
                                marginLeft:5,borderColor:'#ff333e'}}>
                            <Text style={{color:'#ff333e'}}>删除</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </TouchableOpacity>
        );
    }

    render(){
        return(
            <View  style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#f5fcff'}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem.bind(this)}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={this.renderSeparator}
                        getItemLayout={this.getItemLayout.bind(this)}
                        keyExtractor={this.keyExtractor}
                        refreshing={this.state.refreshing}
                        onRefresh={this.refreshing}
                        onEndReachedThreshold={0.5}
                        // onEndReached={this.onload.bind(this)}
                        // ListHeaderComponent={this.renderHead()}
                        //ListFooterComponent={this.renderFoot.bind(this)}
                    />
                </ScrollView>
                {this.renderFoot1()}
            </View>

        );
    }
}