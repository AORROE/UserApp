import React, {Component, PureComponent} from 'react';
import NT from '../utils/NavigatorTools';
import Storage from '../utils/Storage';
import LinearGradient from 'react-native-linear-gradient';
import AnalusisNavigator from './AnalusisPartPage';
import SeparatorComponent from '../component/SeparatorComponent';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    RefreshControl,
    DeviceEventEmitter,
    ImageBackground
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class NewUserPage extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            isRefreshing:false,
            isLogin:false,
            data:[],
            data2:'',
            id:''
        };
    }


    componentWillMount(){
        this.getData()
        console.warn(NT.navi.state.params)
    }

    getData(){
        Storage.get('token',(value)=>{
            if(value !== null){
                this.setState({
                    isLogin:true
                })
                Storage.get('shopInfo',(valueid)=>{
                    this.setState({
                        id:valueid[0].id,
                        data2:valueid[0]
                    })
                    // console.warn(valueid)
                })
            }else{
                this.setState({
                    isLogin:false
                })
            }
        })
    }

    //方法
    onHeaderRefresh() {
        this.setState({isRefreshing: true});

        setTimeout(() => {
            this.setState({isRefreshing: false});
            this.getData()
        }, 2000)
    }



    analysis(){
        NT.navi.navigate('AnalusisPage')
    }

    cocmanage(){
        NT.navi.navigate('Cocmanage')
    }

    coupomanage(){
        NT.navi.navigate('NewDiscount')
    }

    evaluate(){
        NT.navi.navigate('Evaluate')
    }

    goodsmanage(){
        NT.navi.navigate('Goods')
    }
    maintain(){
        NT.navi.navigate('MainTain')
    }

    loginShoper(){
        NT.navi.navigate('Login',{callback:(data)=>{
                this.setState({
                    isLogin:true,
                })
            }})
    }

    siginOut(){
        Storage.delete('token');
        Storage.delete('shopInfo')
        this.getData()
        // this.setState({
        //     isLogin:false,
        // });
    }

    detailData(){

    }


    //界面组件
    renderUserAvatr=()=>{
        return(
             <ImageBackground style={styles.userAvatrViewStyle} activeOpacity={1} source={require('../images/image5.jpg')}>
                 {this.state.isRefreshing?(null):(
                     <View style={{flex:1,flexDirection:'row',borderRadius:10}}>
                         <View style={{alignItems:'center',justifyContent:'center',marginLeft:10,marginRight:5}}>
                             {this.state.isLogin?<Image source={{uri:this.state.data2.shop_avatar}}
                                                        style={{width:100,height:100,borderRadius:10}}/>
                                 :<Image source={require('../images/icon_default.png')}
                                         style={{width:100,height:100,borderRadius:10}}/>}
                         </View>

                         {this.state.isLogin?<View style={{flex:1,flexDirection:'column',alignItems:'flex-start',paddingBottom:2,justifyContent:'space-between'}}>
                             <Text style={{fontSize:18,color:'#fff'}}>
                                 {this.state.data2.name}
                             </Text>
                             <Text style={{fontSize:15,color:'#fff'}}>
                                 店铺评分: {this.state.data2.shop_points}
                             </Text>
                             <Text style={{fontSize:12,color:'#fff'}}>
                                 联系电话: {this.state.data2.phone}
                             </Text>
                             <Text style={{fontSize:12,color:'#fff'}}>
                                 地址: {this.state.data2.address}
                             </Text>

                         </View>:<View></View>}
                     </View>
                 )}
                </ImageBackground>
        );
    };

    renderWallet = () =>{
      return(
          <View style={{flexDirection:'column'}}>
              <LinearGradient start={{x: 0.3, y: 0.3}} end={{x: 0.6, y: 0.8}}
                              locations={[0,0.8,1]}
                              colors={['#25d6f4','#25d6f4','#25d6f4']}
                              style={{justifyContent:'center',flex:1,borderRadius:5,marginLeft:5,marginTop:10,marginRight:5,elevation:3,marginBottom:5}}>
                  <TouchableOpacity
                                    style={{flexDirection:'row',alignItems:'center',flex:1,justifyContent:'space-between',marginLeft:5,borderRadius:10}}>
                      <Text style={{fontSize:20,color:'#fff'}}>今日实时数据</Text>
                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                          <Text style={{fontSize:12,color:'#fff'}}>详情</Text>
                          <Image source={require('../images/rightarrow.png')} style={{width:15,height:15}}/>
                      </View>
                  </TouchableOpacity>
              </LinearGradient>
              <View style={styles.walletViewStyle}>
                  <View style={{height:screenHeight * 0.2,flex:1,
                      justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
                      <Text style={{fontSize:20,marginRight:10}}>营业额</Text>
                      <Text style={{fontSize:18}}>100</Text>
                  </View>

                  <View style={{height:100,borderWidth:0.2,borderColor:'#d3dad2'}}>

                  </View>

                  <View style={{height:screenHeight * 0.2,flex:1,
                      justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
                      <Text style={{fontSize:20,marginRight:10}}>有效订单数</Text>
                      <Text style={{fontSize:18}}>100</Text>
                  </View>
              </View>
          </View>
      );
    };

    renderUserServer = () =>{
      return(
          <View style={styles.userServerStyle}>
              <View style={styles.headStylef}>
                  <TouchableOpacity style={{flexDirection:'row',alignItems:'center',
                      width:screenWidth,justifyContent:'space-between'}}
                                    onPress={this.analysis.bind(this)}>
                      <Text style={styles.textStyle}>客流分析</Text>
                      <Image source={require('../images/rightarrow.png')}
                             style={{width:20,height:20,marginRight:5}}/>
                  </TouchableOpacity>
              </View>
              <View style={{width:screenWidth,height:0.5, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

              <View style={styles.headStyle}>
                  <TouchableOpacity
                      style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}
                      onPress={this.cocmanage.bind(this)}>
                      <Text style={styles.textStyle}>码立方管理</Text>

                      <Image source={require('../images/rightarrow.png')}
                             style={{width:20,height:20,marginRight:5}}/>
                  </TouchableOpacity>
              </View>
              <View style={{width:screenWidth,height:0.5, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

              <View style={styles.headStyle}>
                  <TouchableOpacity
                      onPress={this.coupomanage.bind(this)}
                      style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}
                        >
                      <Text style={styles.textStyle}>优惠券管理</Text>
                      <Image source={require('../images/rightarrow.png')}
                             style={{width:20,height:20,marginRight:5}}/>
                  </TouchableOpacity>
              </View>
              <View style={{width:screenWidth,height:0.5, backgroundColor: '#d8d8d8',marginLeft:10}}></View>


              <View style={styles.headStyle}>
                  <TouchableOpacity
                      onPress={this.goodsmanage.bind(this)}
                      style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}>
                      <Text style={styles.textStyle}>商品管理</Text>
                      <Image source={require('../images/rightarrow.png')}
                             style={{width:20,height:20,marginRight:5}}/>
                  </TouchableOpacity>
              </View>
              <View style={{width:screenWidth,height:0.5, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

              <View style={styles.headStyle}>
                  <TouchableOpacity style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}
                                    onPress={this.maintain.bind(this)}>
                      <Text style={styles.textStyle}>码立方维修</Text>
                      <Image source={require('../images/rightarrow.png')}
                             style={{width:20,height:20,marginRight:5}}/>
                  </TouchableOpacity>
              </View>

              <View style={{width:screenWidth,height:0.5, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

              <View style={styles.headStyle}>
                  <TouchableOpacity style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}
                                    onPress={this.evaluate.bind(this)}>
                      <Text style={styles.textStyle}>用户评价</Text>
                      <Image source={require('../images/rightarrow.png')}
                             style={{width:20,height:20,marginRight:5}}/>
                  </TouchableOpacity>
              </View>
          </View>
      );
    };

    renderHeader(){
        return(
            <LinearGradient
                start={{x: 0.3, y: 0.3}} end={{x: 0.6, y: 0.8}}
                locations={[0,0.8,1]}
                colors={['#25d6f4','#27d2ee','#27ccea']}
                style={styles.renderHeaderStyle}>
                <TouchableOpacity>
                    <Image source={require('../images/icon_setting.png')} style={{width:28,height:28}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:screenWidth * 0.78}}>
                    <Image source={require('../images/icon_message.png')} style={{width:28,height:28}}/>
                </TouchableOpacity>
            </LinearGradient>
        );
    }


    //调用组件
    render(){
        return(
            <View style={styles.container}>
                {this.renderHeader()}
                <View style={{padding:5,flex:1}}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        automaticallyAdjustContentInsets={false}
                        bounces={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={() => this.onHeaderRefresh()}
                                tintColor='gray'
                            />
                        }
                        scrollsToTop={true}
                    >
                        {this.renderUserAvatr()}
                        <SeparatorComponent/>
                        {this.renderWallet()}
                        <SeparatorComponent/>
                        <View style={{height:230,backgroundColor:'#fff'}}>
                            <AnalusisNavigator/>
                        </View>
                        <SeparatorComponent/>
                        {this.renderUserServer()}
                    </ScrollView>
                    {this.state.isLogin ?<View style={{position:'absolute',bottom:5,left:screenWidth * 0.8,borderWidth:1.5,borderRadius:49,borderColor:'#e2e2e2'}}>
                        <TouchableOpacity
                            onPress={this.siginOut.bind(this)}
                            style={{flexDirection:'row',alignItems:'center',width:50,height:50,
                                justifyContent:'center',borderWidth:1,borderRadius:50,borderColor:'#43dccd',
                                }}>
                            <Text style={[styles.textStyle,{color:'#43dccd'}]}>退出账号</Text>
                        </TouchableOpacity>
                    </View>:<View style={{position:'absolute',bottom:5,left:screenWidth * 0.8,borderWidth:1.5,borderRadius:49,borderColor:'#e2e2e2'}}>
                        <TouchableOpacity
                            onPress={this.loginShoper.bind(this)}
                            style={{flexDirection:'row',alignItems:'center',width:50,height:50,
                                justifyContent:'center',borderWidth:1,borderRadius:50,borderColor:'#43dccd',
                            }}>
                            <Text style={[styles.textStyle,{color:'#43dccd'}]}>立即登录</Text>
                        </TouchableOpacity>
                    </View>}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#f5fcff',
    },

    userAvatrViewStyle:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff',
        height:screenHeight * 0.2,
        marginTop:10,
        elevation:4,
        overflow:'hidden',
        borderRadius:10
    },

    walletViewStyle:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        height:screenHeight * 0.1,
        padding:10,
        marginBottom:10,
        elevation:4,
        margin:5,
        borderRadius:5
    },

    userServerStyle:{
        flexDirection:'column',
        // justifyContent:'center',
        alignItems:'flex-start',
        height:screenHeight *0.58,
        // padding:18
    },

    renderHeaderStyle:{
        width:screenWidth,
        height:55,
        backgroundColor:'#1295D9',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        flexDirection:'row',
        padding:10
    },

    headStylef:{
        width:screenWidth,
        height:50,
        justifyContent:'center',
        alignItems:'flex-start',
        backgroundColor:'#ffffff',
    },

    headStyle:{
        width:screenWidth,
        height:50,
        justifyContent:'center',
        alignItems:'flex-start',
        backgroundColor:'#ffffff',
    },

    headStyle1:{
        width:screenWidth,

    },

    textStyle:{
        marginLeft:10,
    },
});