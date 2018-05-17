import React, { Component } from 'react';
import NT from '../utils/NavigatorTools';

import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Alert,
    ScrollView
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight= Dimensions.get('window').height;

export default class MainTainPage extends Component{
    static navigationOptions={
        headerTitle:'维修单',
        headerBackTitle:null,
        headerTitleStyle: {alignSelf: 'center'},
        headerRight:(
            <View>
            </View>
        )
    };
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
        var goods = [];
        for (var i = 0; i < 10; i++) {
            goods.push({key: i, title: i + ''});
        }
        this.setState({
            data:goods
        })
    }

    //此函数用于为给定的item生成一个不重复的key
    keyExtractor = (item,index) => item.key;

    renderSeparator(){
        return(
                <View style={{width:screenWidth,height:0.5, backgroundColor: '#cecece'}}></View>


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

    clickMaintain(item,index){
        NT.navi.navigate('MainTainDetail')
    }

    delectform(item,index){
        Alert.alert('是否删除维修单?','',[
            {text :'取消'},
            {
                text:'删除',
                onPress:() => {
                    listData = this.state.data;
                    listData.splice(index,1);
                    this.setState({data:listData});

                }
            }
        ])
    }


    applyMaintain(){
        NT.navi.navigate('',{
            callback:(data)=>{
                listData = this.state.data;
                listData.splice(0,0,data);
                this.setState({data:listData});
            }
        })
    }

    // renderFoot({item,index}){
    //     return(
    //         <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
    //             <View style={{width:screenWidth,height:0.7, backgroundColor: '#b1b1b1',marginBottom:5,borderRadius:5}}></View>
    //             <TouchableOpacity
    //                 onPress={this.applyMaintain.bind(this,item,index)}
    //                 style={{height:50,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',
    //                     borderColor:'#1295D9',borderWidth:1,width:screenWidth,borderRadius:10,marginBottom:20}}>
    //                 <Text>申请维修</Text>
    //             </TouchableOpacity>
    //
    //         </View>
    //     );
    // }

    renderFoot(){
        return(
            <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <TouchableOpacity
                    onPress={this.applyMaintain.bind(this)}
                    style={{height:50,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',
                        borderColor:'#1295D9',borderWidth:1,width:screenWidth,borderRadius:10,marginBottom:20}}>
                    <Text>申请维修</Text>
                </TouchableOpacity>

            </View>
        );
    }


    renderItem({item,index}){
        return(
            <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={{flexDirection:'row',backgroundColor:'#fff'}}
                onPress={this.clickMaintain.bind(this,item,index)}>

                <View style={{flex:1,flexDirection:'column',height:150}}>
                    <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',padding:5}}>
                        <Text style={{fontSize:17,color:'#000'}}>损坏时间{item.key}</Text>
                        <Text style={{fontSize:15}}>2018-03-29</Text>
                    </View>

                    <View style={{flex:1,padding:5,justifyContent:'flex-start',flexDirection:'column'}}>
                        <Text numberOfLines={1} style={{fontSize:15}}>损坏描述:</Text>
                        <Text numberOfLines={2} style={{fontSize:13,marginLeft:55}}>1212154asdasasdsds</Text>
                    </View>

                    <View style={{flex:1,padding:5,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontSize:18}}>维修人:秋某某</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                                // onPress={this.delectGoods.bind(this,item,index)}
                                style={{borderWidth:1,borderRadius:5,width:70,height:20,justifyContent:'center',alignItems:'center',
                                    marginLeft:5,borderColor:'#1295D9'}}>
                                {index%2 ===0  ? <Text style={{color:'#1295D9'}}>已维修</Text>:<Text style={{color:'#1295D9'}}>未维修</Text>}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.delectform.bind(this,item,index)}
                                style={{borderWidth:1,borderRadius:5,width:70,height:20,justifyContent:'center',alignItems:'center',
                                    marginLeft:5,borderColor:'#ff333e'}}>
                                <Text style={{color:'#ff333e'}}>删除</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </TouchableOpacity>
        );
    }

    render(){
        return(
            <View style={{flex:1}}>
                <ScrollView>
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
                        // ListFooterComponent={this.renderFoot.bind(this)}
                    />
                </ScrollView>
                {this.renderFoot()}
            </View>
        );
    }
}