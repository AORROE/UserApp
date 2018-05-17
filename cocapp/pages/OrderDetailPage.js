import React, { Component } from 'react';
import PopupDialog, { SlideAnimation ,DialogTitle,DialogButton,ScaleAnimation} from 'react-native-popup-dialog';

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
const scaleAnimation = new ScaleAnimation();
const screenWidth = Dimensions.get('window').width;
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
} from 'react-native';
import Storage from "../utils/Storage";
import NT from "../utils/NavigatorTools";


export default class OrderDetailPage extends Component{

    static navigationOptions={

        headerTitle:'订单详情',
        headerStyle: {backgroundColor: '#25d6f4'},
        headerBackTitle:null,
        headerTitleStyle:{alignSelf: 'center',color:'#fff'},
        headerRight:(
            <View>
            </View>
        ),

    };

    constructor(props){
        super(props);
        this.state={
            data:[],
            refreshing:false,
            dialogtext:'18175946823',
            orderType:null,
            orderTitle:null,
        }
    }

    componentWillMount(){
        this.getData()
        // console.warn(this.props.navigation.state.params.Order)
    }

    getData(){
        Storage.get('token',(value)=>{
            var url;
            if(this.props.navigation.state.params.Order===1){
                url="http://101.132.71.227/api/app/getDoOrder/";
                this.setState({orderType:'点击返回',orderTitle:'订单已完成'})
            }else if(this.props.navigation.state.params.Order===2){
                url="http://101.132.71.227/api/app/getUndoOrder/";
                this.setState({orderType:'点击返回',orderTitle:'订单无效'})
            }else {
                url="http://101.132.71.227/api/app/getOrderUnpay/";
                this.setState({orderType:'待支付',orderTitle:'订单待付款'})
            }
            NT.get(url+'2',(res)=>{
                let resbody = JSON.parse(res._bodyInit);
                let data1 = [];
                // console.warn(res)
                for(let i=0;i<resbody.response.length;i++){
                    data1 = resbody.response[i].goods
                }
                this.setState({
                    data:data1
                })
                // console.warn(data1)
            },value)
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

    clickItem() {

    }

    keyExtractor = (item,index) => index;

    renderSeparator(){
        return(
            <View style={{flexDirection:'row'}}>
                <View  style={{width:30,height:4}}></View>
            </View>
        );
    }


    renderItem({item,index}){
        return(
            <View
                style={{width:screenWidth*0.9,flexDirection:'row',backgroundColor:'#f7f7f7',
                    padding:10,elevation:4,borderRadius:10}}>
                <Image source={{uri:"https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"}}
                       style={{width:80,height:80,margin:10}}/>
                <View  style={{height:80,margin:5,flex:1}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:10}}>
                        <Text>{item.name}</Text>
                        <Text style={{color:'#ff2c36'}}>￥{item.pivot.price}</Text>
                    </View>
                    <View style={{flex:1,alignItems:'center',justifyContent:'space-between',marginRight:10,flexDirection:'row'}}>
                        <Text>{item.description}</Text>
                        <Text>x{item.pivot.num}</Text>
                    </View>
                </View>
            </View>
        );
    }

    renderFooter(){
        var aa=0;
        // var bb=0;
        let cc = this.state.data
        for(let i=0;i<cc.length;i++){
            aa = cc[i].pivot.price+aa;
        }
        return(
            <View style={{flexDirection:'column',margin:10,borderBottomWidth:0.2}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>商品总价</Text>
                    <Text>￥{aa}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>优惠券</Text>
                    <Text>-￥2.00</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>实付款</Text>
                    <Text style={{color:'#ff333e',fontSize:18}}>￥{aa-2-3}</Text>
                </View>
            </View>
        );
    }

    render(){
        return(
            <View style={styles.container}>
                {this.state.data.length<=0?<View><Text>加载中</Text></View>
                    :<View>
                        <ScrollView>
                            <View
                                style={{backgroundColor:'#ffffff',alignItems:'center',
                                    marginTop:10,marginBottom:10,borderRadius:10,
                                    elevation:3,flexDirection:'column',padding:20}}>
                                <View><Text style={{fontSize:25}}>{this.state.orderTitle}</Text></View>

                                <View  style={{marginTop:10}}>
                                    <Text style={{fontSize:15}}>您的订单已完成</Text>
                                </View>

                                <View  style={{marginTop:10,marginBottom:10}}>
                                    <TouchableOpacity
                                        style={{width:130,height:40,backgroundColor:'#1295D9',justifyContent:'center',
                                            alignItems:'center',borderRadius:10}}>
                                        <Text style={{fontSize:18,color:'#fff'}}>{this.state.orderType}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View  style={{backgroundColor:'#ffffff',alignItems:'center',
                                marginTop:10,marginBottom:10,borderRadius:10,padding:5,
                                elevation:4,flexDirection:'column'}}>
                                <FlatList
                                    data={this.state.data}
                                    renderItem={this.renderItem}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={this.renderSeparator}
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.refreshing}
                                    keyExtractor={this.keyExtractor}
                                    onEndReachedThreshold={0}
                                    onEndReached={this._onload}
                                    ListFooterComponent={this.renderFooter()}/>
                            </View>
                        </ScrollView>
                        <View style={{alignItems:'center',flexDirection:'row',height:40,marginBottom:5,backgroundColor:'#fff',elevation:3}}>
                            <TouchableOpacity
                                style={{alignItems:'center',justifyContent:'center',flex:1,flexDirection:'row'}}
                                onPress={() => {this.setState({dialogtext:'18886754256'},this.popupDialog.show())}}>
                                <Image source={require('../images/icon_default.png')} style={{width:18,height:18}}/>
                                <Text style={{fontSize:15}}>联系用户</Text>
                            </TouchableOpacity>

                            <View style={{borderWidth:0.2,height:30}}></View>

                            <TouchableOpacity
                                style={{alignItems:'center',justifyContent:'center',flex:1,flexDirection:'row'}}
                                onPress={() => {this.setState({dialogtext:'18868945782'},this.popupDialog.show())}}>
                                <Image source={require('../images/icon_default.png')} style={{width:18,height:18}}/>
                                <Text style={{fontSize:15}}>联系客服</Text>
                            </TouchableOpacity>

                        </View>

                    </View>}
                <PopupDialog
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogTitle={<DialogTitle title="Dialog Title" />}
                    dialogAnimation={slideAnimation}
                    width={screenWidth*0.8}
                    height={200}
                    dialogStyle={{justifyContent:'space-around'}}
                >
                    <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>

                        <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}>
                            <Text style={{fontSize:25}}>{this.state.dialogtext}</Text>
                        </View>

                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:screenWidth*0.8,marginTop:30}}>
                            <DialogButton
                                text="取消"
                                key="button-1"
                                textStyle={{fontSize:15}}
                                onPress={() => {
                                    this.popupDialog.dismiss();
                                }}
                            />
                            <DialogButton
                                text="呼叫"
                                textStyle={{fontSize:15}}
                                onPress={() => {
                                    alert('啦啦啦啦啦');
                                }}
                                key="button-1"
                            />
                        </View>
                    </View>
                </PopupDialog>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#f5fcff',
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },


});