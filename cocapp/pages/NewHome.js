import React, {Component} from 'react';
import NT from '../utils/NavigatorTools';
import BarChartScreen from '../pages/BarChartScreen';
import Storage from '../utils/Storage';
import EditView from '../navigator/EditView';
import LinearGradient from 'react-native-linear-gradient';
import SeparatorComponent from '../component/SeparatorComponent';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView, DeviceEventEmitter,RefreshControl
} from 'react-native';

import HeadComponent from '../component/headComponent';
import CarouselComponent from '../component/CarouselComponent';
const screenWidth = Dimensions.get('window').width;
const screenHeight= Dimensions.get('window').height;


export default class NewHome extends Component {

    constructor(props){
        super(props);
        this.state={
            data:[],
            refreshing:false,
            orderstatus:'',
            shop_id:null
        }
    }


    componentWillMount(){
        this.getData()
        DeviceEventEmitter.addListener('key',()=>{this.getData()})
    }

    componentWillUnmount(){
        Storage.delete('token',()=>{});
        Storage.delete('userInfo',()=>{})
    }

    //方法

    clickOrder(){
        NT.navi.navigate('OrderStackNavigator');
        // console.warn(this.state.data)
    }

    clickAnalusis(){
        NT.navi.navigate('AnalusisPage');
    }

    clickCoC(){
        NT.navi.navigate('Cocmanage');
    }

    clickEvalute(){
        NT.navi.navigate('Evaluate');
    }

    clickDiscount(){
        NT.navi.navigate('NewDiscount')
    }

    clickGoods(){
        NT.navi.navigate('Goods')
    }

    //FlatList
    getData(){
        Storage.get('token',(value)=>{
            if(value!==null){
                Storage.get('shopInfo',(valueid)=>{

                NT.get("http://101.132.71.227/api/app/allOrder/"+valueid[0].id,(res)=>{
                    let resbody = JSON.parse(res._bodyInit);

                    if(resbody.status==='success'){

                        let data1 = [];
                        for(let i=0;i<2;i++){
                            data1.push(resbody.response[i])
                            // console.warn(resbody.response[i].user)
                        }
                        this.setState({
                            data:data1
                        })
                    }else{

                    }
                },value)
                })
            }else{
                NT.navi.navigate('Login',{callback:(data)=>{
                        this.setState({shop_id:data})
                    }})
            }
        })

    }

    //此函数用于为给定的item生成一个不重复的key
    keyExtractor = (item,index) => index;

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
            newData.push({key:1,title:1},
                {key:2,title:1})
            this.setState({
                data:newData
            });
        },1000)
    }

    itemClick(item,index){
        NT.navi.navigate('OrderDetail',{Order:item.status});

    }
    //渲染
    renderItem({item,index}){
        console.warn(item.goods)
        var goodslist = [];
        var countsum=0;
        var pricesum=0;
        if(item.goods===undefined){

        }else{
            for(var i =0 ; i < item.goods.length;i++){
                var goods =(
                    <View
                        key={i}
                        style={{flexDirection:'row',flex:1,marginRight:5,marginLeft:5}}>
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
        }
        var aaa;
        if(item.status===0){
            aaa = '待完成'
            bbb = '支付'
        }else if (item.status===1){
            aaa = '已完成'
            bbb = '回复'
        }else {
            aaa = '未完成'
            bbb = '无效'
        }
        return(
            <View style={{elevation:2,borderRadius:5,borderColor:'#eaeaea',flex:1}}>
                <TouchableOpacity
                    key={index}
                    style={{flexDirection:'column',alignItems:'center',backgroundColor:'#fff',borderRadius:5}}
                    onPress={this.itemClick.bind(this,item,index)}
                    activeOpacity={1}>
                    <View
                        style={{flexDirection:'row',justifyContent:'space-between',
                            alignItems:'center',marginRight:5,marginTop:10,marginLeft:5,}}>
                        <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                            <Image source={{uri:item.user.avatar}} style={{width:30,height:30,borderRadius:5}}/>
                            <Text>{item.user.name}</Text>
                        </View>
                        <Text>{aaa}</Text>
                    </View>

                    <View style={{flex:1,width:screenWidth}}>
                        <View style={{justifyContent:'space-between',flexDirection:'row',marginRight:10,marginLeft:10}}>
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
                        <View style={{width:screenWidth * 0.9,height:0.4, backgroundColor: '#cecece',marginLeft:18}}></View>
                    </View>

                    <View style={{flexDirection:'row',padding:10,justifyContent:'flex-end',width:screenWidth}}>
                        <TouchableOpacity
                            style={{width:80,height:30,borderColor:'#1295D9',borderWidth:1,
                                alignItems:'center',justifyContent:'center',borderRadius:5,marginRight:20}}>
                            <Text style={{color:'#1295D9'}}>删除</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>this.editView.show()}
                            style={{width:80,height:30,borderColor:'#1fbba6',borderWidth:1,
                                alignItems:'center',justifyContent:'center',borderRadius:2}}>
                            <Text style={{color:'#1fbba6'}}>{bbb}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View >
        );
    }





    renderHead(){
        return <View style={{ justifyContent: "center", flex: 1, borderRadius: 5, marginLeft: 5, marginTop: 10, marginRight: 5, elevation: 3 ,backgroundColor:'#25cdeb'}}>
            <TouchableOpacity onPress={this.clickOrder.bind(this)} style={{ flexDirection: "row", alignItems: "center", flex: 1, justifyContent: "space-between", marginLeft: 5, borderRadius: 10 }}>
              <Text style={{ fontSize: 18, color: "#fff" }}>订单</Text>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 12, color: "#fff" }}>
                  更多
                </Text>
                <Image source={require("../images/rightarrow.png")} style={{ width: 15, height: 15 }} />
              </View>
            </TouchableOpacity>
          </View>;
    }

    // renderFotter(){
    //     return(
    //         <View style={{flexDirection:'row',alignItems: 'center',justifyContent:'center'}}>
    //             <View style={styles.loginByOtherLine}></View>
    //             <Text style={styles.otherLoginHintLabel} onPress={this.onload.bind(this)}>查看更多</Text>
    //             <View style={styles.loginByOtherLine}></View>
    //         </View>
    //     );
    // }


    renderSeparator(){
        var separatorList=[];
        for(let i=0;i<23;i++){
            let j =i%2;
            var separator=(
                j===0?<View key={i} style={{width:10,height:1, backgroundColor: '#0904ff',marginTop:5,marginBottom:5,marginLeft:5}}></View>:
                    <View key={i} style={{width:10,height:1, backgroundColor: '#e90d21',marginTop:5,marginBottom:5,marginLeft:5}}></View>
            );
            separatorList.push(separator);
        }

        return(
            <View style={{flexDirection:'row'}}>
                {separatorList}
            </View>
        );
    }

    getItemLayout=(data, index) => ({
        length:100,
        offset:(100+2)*index,
        index
    });

    renderAnalusis(){
        return(
            <View>
                <LinearGradient start={{x: 0.3, y: 0.3}} end={{x: 0.6, y: 0.8}}
                                locations={[0,0.8,1]}
                                colors={['#25cdeb','#25cdeb','#25cdeb']}
                                style={{justifyContent:'center',flex:1,borderRadius:5,marginLeft:5,marginTop:10,marginRight:5,elevation:3}}>
                    <TouchableOpacity onPress={this.clickAnalusis.bind(this)}
                                      style={{flexDirection:'row',alignItems:'center',flex:1,justifyContent:'space-between',marginLeft:5,borderRadius:10}}>
                        <Text style={{fontSize:20,color:'#fff'}}>客流分析</Text>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:12,color:'#fff'}}>更多</Text>
                            <Image source={require('../images/rightarrow.png')} style={{width:15,height:15}}/>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
                <View
                    style={{backgroundColor:'#fff',marginTop:5,borderRadius:10,marginRight:5,marginLeft:5,padding:5,elevation:4,marginBottom:5}}>
                     <BarChartScreen/>
                </View>
            </View>
        );

    }


    renderOtherView(){
        return(
            <View>
                <LinearGradient start={{x: 0.3, y: 0.3}} end={{x: 0.6, y: 0.8}}
                                locations={[0,0.8,1]}
                                colors={['#25cdeb','#25cdeb','#25cdeb']}
                                style={{justifyContent:'center',flex:1,borderRadius:5,marginLeft:5,marginTop:10,marginRight:5,elevation:3}}>
                    <TouchableOpacity
                                      style={{flexDirection:'row',alignItems:'center',flex:1,justifyContent:'space-between',marginLeft:5,borderRadius:10}}>
                        <Text style={{fontSize:20,color:'#fff'}}>其他</Text>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:12,color:'#fff'}}>更多</Text>
                            <Image source={require('../images/rightarrow.png')} style={{width:15,height:15}}/>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
            <View style={{backgroundColor:'#fff',marginTop:5,borderRadius:10,marginRight:5,marginLeft:5,padding:5,elevation:4,marginBottom:10,flexDirection:'column'}}>

                <View style={{flexDirection:'column',padding:10}}>
                    <View style={{flexDirection:'row',marginBottom:10}}>
                        <View style={{flex:1,borderWidth:1,height:screenHeight * 0.15,
                            justifyContent:'center',alignItems:'center',borderRadius:10,marginRight:10,borderColor:'#38b7ff',flexDirection:'column'}}>
                        <TouchableOpacity
                            onPress={this.clickCoC.bind(this)}
                            style={{flex:1,height:screenHeight * 0.15,marginLeft:10,
                                justifyContent:'center',alignItems:'center',borderRadius:10,marginRight:10,flexDirection:'column'}}>
                            <View style={{flex:1,width:150,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../images/CoC.png')} style={{width:50,height:50}}/>
                            </View>

                            <View style={{width:150,alignItems:'center'}}>
                                <Text>码立方管理</Text>
                            </View>
                        </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={this.clickDiscount.bind(this)}
                            style={{flex:1,borderWidth:1,height:screenHeight * 0.15,
                            justifyContent:'center',alignItems:'center',borderRadius:10,borderColor:'#38b7ff'}}>
                            <View style={{flex:1,width:150,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../images/icon_discount2.png')} style={{width:40,height:40}}/>
                            </View>

                            <View style={{width:150,alignItems:'center'}}>
                                <Text>优惠券</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity
                            onPress={this.clickEvalute.bind(this)}
                            style={{flex:1,borderWidth:1,height:screenHeight * 0.15,
                                justifyContent:'center',alignItems:'center',borderRadius:10,marginRight:10,borderColor:'#38b7ff'}}>
                            <View style={{flex:1,width:150,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../images/icon_comment.png')} style={{width:50,height:50}}/>
                            </View>

                            <View style={{width:150,alignItems:'center'}}>
                                <Text>评价</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.clickGoods.bind(this)}
                            style={{flex:1,borderWidth:1,height:screenHeight * 0.15,
                            justifyContent:'center',alignItems:'center',borderRadius:10,borderColor:'#38b7ff'}}>
                            <View style={{flex:1,width:150,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../images/icon_goods.png')} style={{width:40,height:40}}/>
                            </View>

                            <View style={{width:150,alignItems:'center'}}>
                                <Text>商品</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </View>
        );
    }

    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.refreshing()}
                        tintColor='gray'
                    />
                }
                scrollsToTop={true}
            >
                <HeadComponent navigate={this.props.navigate}/>
                <CarouselComponent/>
                {this.renderHead()}
                <View style={{backgroundColor:'#fff',borderRadius:10,margin:5,elevation:4}}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem.bind(this)}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={this.renderSeparator}
                        getItemLayout={this.getItemLayout.bind(this)}
                        keyExtractor={this.keyExtractor}
                        // refreshing={this.state.refreshing}
                        // onRefresh={this.refreshing}
                        onEndReachedThreshold={0.5}
                        // onEndReached={this.onload.bind(this)}
                        // ListHeaderComponent={this.renderHead()}
                        //ListFooterComponent={this.renderFotter()}
                    />
                </View>
                <SeparatorComponent/>
                {this.renderAnalusis()}
                <SeparatorComponent/>
                {this.renderOtherView()}
                <EditView
                    // 在组件中使用this.editView即可访拿到EditView组件
                    ref={editView => this.editView = editView}
                    inputText={this.state.comment}
                    titleTxt={'回复内容'}
                    ensureCallback={comment => this.setState({comment:comment})}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5fcff',
        flex:1,
    },
    loginByOtherLine:{
        backgroundColor:'#999999',
        height:1,
        width:screenWidth*0.25,
        marginLeft:10,
        marginRight:10
    },
    container1: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});