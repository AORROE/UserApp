import React, { PureComponent } from 'react';
import NT from '../utils/NavigatorTools';
import Storage from '../utils/Storage';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList
} from 'react-native';
const screenWidth= Dimensions.get('window').width;

export default class EvaluatePage extends PureComponent{

    constructor(props){
        super(props);
        this.state={
            data:[],
            refreshing:false,
            data2:null
        }
    }
//此函数用于为给定的item生成一个不重复的key
    keyExtractor = (item,index) => index;

    componentWillMount(){
        this.getData()


    }

    getData(){
        Storage.get('token',(value)=>{
            NT.get("http://101.132.71.227/api/app/shopComment/"+'2',(res)=>{
                let resbody = JSON.parse(res._bodyInit);
                // console.warn(resbody)
                if(resbody==='success'){
                    let data1 = [];
                    data1 = resbody.response;
                    this.setState({
                        data:data1
                    })
                }else{

                }
                // console.warn(this.state.data[0].shop_callback)
            },value)
        })
    }

    //未完待续
    shopCallBack(item,index){
        Storage.get('token',(value)=>{
            NT.post("http://101.132.71.227/api/app/addShopCallBack",{shop_comment_id:item.id,shop_id:item.shop.id,comment:'谢谢您对我们店的评价'},(res)=>{
                // console.warn(JSON.parse(res._bodyInit));
                // let resbody = JSON.parse(res._bodyInit);
                // let data1 = [];
                // data1 = resbody.response;
                // this.setState({
                //     data:data1
                // })
            },value)
        })
    }

    refreshing =() =>{
        this.setState({refreshing:true}); //开始刷新
        this.getData();
        setTimeout(() => {
            this.setState({refreshing:false})//停止刷新
        }, 2000);
    };

    onload(){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            let newData = this.state.data;
            newData.push({key:1,title:1,imag:"https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"},
                {key:2,title:1,imag:"https://images.pexels.com/photos/209424/pexels-photo-209424.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"})
            this.setState({
                data:newData
            });
        },1000)
    }

    itemClick(item,index){
        // alert(index+1)
    }

    renderItem({item,index}){
        var commentlist = [];
        for(var i =0 ; i < 1;i++){
            var comment =(
                <Text key={index} style={{marginLeft:10}}>商家回复了您:{item.shop_callback[i].comment}</Text>
            );
            commentlist.push(comment);
        }
        return(
            <TouchableOpacity
                key={index}
                style={{flexDirection:'row',backgroundColor:'#fff'}}
                // onPress={this.itemClick.bind(this,item,index)}
                activeOpacity={1}>
                <View style={{padding:10}}>
                    <Image source={{uri:item.user.avatar}} style={{width:30,height:30,borderRadius:10}}/>
                </View>

                <View style={{flex:1,padding:5}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>{item.user.name}</Text>
                        <Text>{item.user.created_at}</Text>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontSize:12}}>评分:</Text>
                        <Text style={{fontSize:12,marginLeft:10}}>{item.point}</Text>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>{item.comment}</Text>
                        <TouchableOpacity
                            onPress={this.shopCallBack.bind(this,item,index)}
                            style={{width:60,height:20,borderColor:'#1fbba6',borderWidth:1,
                                alignItems:'center',justifyContent:'center',borderRadius:2}}>
                            <Text style={{color:'#1fbba6'}}>回复</Text>
                        </TouchableOpacity>
                    </View>
                    {item.shop_callback === null ? <View></View>
                        :
                        <View
                            style={{flexDirection:'column',backgroundColor:'#f7f7f7',paddingTop:10,paddingBottom:10,
                            marginTop:10,borderRadius:10}}>
                        {commentlist}
                    </View>}

                </View>

            </TouchableOpacity>
        );
    }

    renderSeparator(){
        return(
            <View style={{width:screenWidth * 0.9,height:0.4, backgroundColor: '#cecece',marginLeft:18}}></View>
        );
    }

    renderHead(){

        return(
            <View style={{width:screenWidth,height:100,
                flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:10,backgroundColor:'#fff'}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',marginLeft:5}}>
                    <Text style={{fontSize:35,color:'#1295D9'}}>4.6</Text>
                    <Text style={{color:'#959595'}}>商家评分</Text>
                </View>

                <View style={{flex:3,justifyContent:'center',alignItems:'flex-start',marginLeft:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text>总评:</Text>
                        <View style={{width:130,height:10,borderWidth:0.5,borderRadius:5,backgroundColor:'#ff0500',marginTop:2}}></View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text>好评:</Text>
                        <View style={{width:80,height:10,borderWidth:0.5,borderRadius:5,backgroundColor:'#00db00',marginTop:2}}></View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text>差评:</Text>
                        <View style={{width:50,height:10,borderWidth:0.5,borderRadius:5,backgroundColor:'#f2e600',marginTop:2}}></View>
                    </View>
                </View>
                <View style={{height:80,borderWidth:0.2,marginRight:10,borderColor:'#e0e0e0'}}></View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:20,color:'#959595'}}>99%</Text>
                    <Text style={{color:'#959595'}}>商家评分</Text>
                </View>
            </View>
        );
    }

    renderFotter(){
        return(
            <View style={{flexDirection:'row',alignItems: 'center',justifyContent:'center',marginBottom:10}}>
                <View style={styles.loginByOtherLine}></View>
                <Text>查看更多</Text>
                <View style={styles.loginByOtherLine}></View>
            </View>
        );
    }

    getItemLayout=(data, index) => ({
        length:100,
        offset:(100+2)*index,
        index
    });

    render(){

        return(
            <View style={styles.container}>
                {this.state.data.length === 0?(<Text>无评论</Text>):(
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem.bind(this)}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={this.renderSeparator}
                        getItemLayout={this.getItemLayout.bind(this)}
                        keyExtractor={this.keyExtractor}
                        refreshing={this.state.refreshing}
                        onRefresh={this.refreshing}
                        onEndReachedThreshold={1.5}
                        // onEndReached={this.onload.bind(this)}
                        ListHeaderComponent={this.renderHead()}
                        // ListFooterComponent={this.renderFotter()}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1
    },
    loginByOtherLine:{
        backgroundColor:'#999999',
        height:1,
        width:screenWidth*0.25,
        marginLeft:10,
        marginRight:10
    },
});