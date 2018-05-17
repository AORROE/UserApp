import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    RefreshControl
} from 'react-native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default class UserPage extends Component{

    constructor(props){
        super(props);
        this.state={
            isRefreshing:false,
        };
    }

    //方法
    onHeaderRefresh() {
        this.setState({isRefreshing: true});

        setTimeout(() => {
            this.setState({isRefreshing: false})
        }, 2000)
    }

    getData() {

    }

    onClickItem() {
        // this.props.navigation.navigate('UserInfo')
        // this.props.navigation.navigate('Login')
        this.props.navigate('Login')
    }

    onClickItem1() {
        this.props.navigate('UserInfo')
    }




    //界面组件
    renderUserAvatr=()=>{
        return(
            <View style={styles.userAvatrViewStyle}>
                <View style={{backgroundColor:'#ffffff',
                    height:screenWidth * 0.4,
                    width:screenWidth,
                    justifyContent:'center',
                    alignItems:'center',flexDirection:'column'
                }}>
                    <TouchableOpacity onPress={this.onClickItem.bind(this)} style={{justifyContent:'center',alignItems:'center'}}>
                        <Image  source={require('../images/icon_default.png')}
                                style={{width:screenWidth * 0.15,height:screenWidth * 0.15,marginTop:10,marginBottom:5}}/>
                        <Text>未登录</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height:70,width:150,justifyContent:'space-around',
                    alignItems:'center',flexDirection:'row'}}>
                    <View>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={this.onClickItem1.bind(this)}>
                            <Image  source={require('../images/icon_collect.png')}
                                    style={{width:20,height:20}}/>
                            <Text>收藏</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                            <Image  source={require('../images/icon_feedback.png')}
                                    style={{width:20,height:20}}/>
                            <Text>评价</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    renderWallet = () =>{
      return(
          <View style={styles.walletViewStyle}>
              <View style={{alignItems:'center'}}>
                  <Text>钱包</Text>
              </View>
              <View
                  style={{flexDirection:'row',flex:1,alignItems:'center',
                      width:screenWidth * 0.9,justifyContent:'space-around'}}>
                  <View>
                      <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                          <Image  source={require('../images/icon_wallet.png')}
                                  style={{width:40,height:40}}/>
                          <Text>我的钱包</Text>
                      </TouchableOpacity>
                  </View>
                  <View>
                      <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                          <Image  source={require('../images/icon_bankcard.png')}
                                  style={{width:40,height:40}}/>
                          <Text>银行卡</Text>
                      </TouchableOpacity>
                  </View>
                  <View>
                      <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                          <Image  source={require('../images/icon_discount.png')}
                                  style={{width:40,height:40}}/>
                          <Text>优惠卷</Text>
                      </TouchableOpacity>
                  </View>
                  <View>
                      <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                          <Image  source={require('../images/icon_balance.png')}
                                  style={{width:40,height:40}}/>
                          <Text>余额</Text>
                      </TouchableOpacity>
                  </View>
              </View>

          </View>
      );
    };

    renderUserServer = () =>{
      return(
          <View style={styles.userServerStyle}>
              <View style={{alignItems:'center'}}>
                  <Text>服务</Text>
              </View>
              <View
                  style={{flexDirection:'row',flex:1,alignItems:'center',
                      width:screenWidth * 0.9,justifyContent:'space-around'}}>
                  <View>
                      <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                          <Image  source={require('../images/icon_vip.png')}
                                  style={{width:40,height:40}}/>
                          <Text>会员</Text>
                      </TouchableOpacity>
                  </View>
                  <View>
                      <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                          <Image  source={require('../images/icon_service.png')}
                                  style={{width:40,height:40}}/>
                          <Text>客服中心</Text>
                      </TouchableOpacity>
                  </View>
                  <View>
                      <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                          <Image  source={require('../images/icon_about.png')}
                                  style={{width:40,height:40}}/>
                          <Text>关于我们</Text>
                      </TouchableOpacity>
                  </View>
                  <View>
                      <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                          <Image  source={require('../images/icon_merchant.png')}
                                  style={{width:40,height:40}}/>
                          <Text>入驻商家</Text>
                      </TouchableOpacity>
                  </View>
              </View>

          </View>
      );
    };

    renderHeader(){
        return(
            <View style={styles.renderHeaderStyle}>
                <TouchableOpacity>
                    <Image source={require('../images/icon_setting.png')} style={{width:28,height:28}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:screenWidth * 0.78}}>
                    <Image source={require('../images/message.png')} style={{width:28,height:28}}/>
                </TouchableOpacity>
            </View>
        );
    }


    // _contentViewScroll(e: Object){
    //     var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    //     var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    //     var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    //     if (offsetY + oriageScrollHeight <= contentSizeHeight){
    //         Console.warn('上传滑动到底部事件')
    //     }
    // }



    //调用组件
    render(){
        return(
            <View style={styles.container}>
                {this.renderHeader()}
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
                    <View style={{width:screenWidth * 0.9,height:0.3, backgroundColor: '#d8d8d8',marginLeft:18}}>
                    </View>
                    {this.renderWallet()}
                    <View style={{width:screenWidth * 0.9,height:0.3, backgroundColor: '#d8d8d8',marginLeft:18}}>
                    </View>
                    {this.renderUserServer()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#fff',
    },

    userAvatrViewStyle:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        height:screenHeight * 0.4,
        overflow:'hidden'


    },

    walletViewStyle:{
        flexDirection:'column',
        // justifyContent:'center',
        alignItems:'flex-start',
        backgroundColor:'#fff',
        height:screenHeight * 0.4,
        padding:18

    },

    userServerStyle:{
        flexDirection:'column',
        // justifyContent:'center',
        alignItems:'flex-start',
        backgroundColor:'#fff',
        height:screenHeight * 0.4,
        padding:18
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

});