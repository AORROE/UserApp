import React, { Component } from 'react';
import NT from '../utils/NavigatorTools';
import Storage from '../utils/Storage';
import WebSocketUtil from '../utils/WebSocketUtil';
import {NavigationActions} from "react-navigation";
const resetAction = NavigationActions.reset({
    index: 0, //index是指定默认显示的那个路由页面, 注意不要越界了
    actions: [
        NavigationActions.navigate({ routeName: 'Main',params:true}),
    ]
});
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    DeviceEventEmitter,
    ImageBackground
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class LoginPage extends Component{

    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }
    }

    login = () =>{
        let userNumber = {email:this.state.email,password:this.state.password};
        NT.post(
            "http://101.132.71.227/api/login",
            userNumber,
            (responseText)=>{
                // console.warn(responseText)
                if(responseText.status===200){
                    let access = JSON.parse(responseText._bodyInit);
                    let shopInfo =access.shopInfo;
                    let userInfo =access.userInfo;
                    // console.warn(access)
                    if(access.status === 'success'){
                        // console.warn(access)
                        let token = access.token.token_type + ' ' + access.token.access_token;
                        if(shopInfo===undefined || shopInfo.length<=0){
                            // console.warn(access.userInfo.id)
                            this.props.navigation.navigate('NewRegister',{'userid':access.userInfo.id,});
                        }else{
                            Storage.save('token', token );
                            Storage.save('shopInfo',shopInfo);
                            this.props.navigation.state.params.callback();
                            this.props.navigation.goBack();
                            // NT.navi.dispatch(resetAction);
                            DeviceEventEmitter.emit('key','1');
                            WebSocketUtil.init("ws://106.15.228.184:2347",shopInfo,userInfo,token);
                        }

                    }else {
                        alert('账号或密码不正确')
                    }
                }else {
                    // NT.navi.navigate('Login')
                }

            },
        );
    };

    forgetPassword = () =>{
      // alert('密码忘了？改呀！！');
    };

    registerNumber = () =>{
        // alert('没账号啊？注册啊！！')
        this.props.navigation.navigate('NewRegister');
    };



    render(){
        return(

            <ImageBackground style={styles.container} source={require('../images/image2.jpg')} resizeMode={'contain'}>
                {/** 用于放置顶部的大图片 */}
                <View style={styles.topViewContainer}>
                    <Image source={require('../images/image4.jpg')}
                           style={styles.topImageStyle}/>
                </View>

                {/*/!** 用于与登录相关的按钮 *!/*/}
                {/*/!*<ScrollView ref='scroll' keyboardShouldPersistTaps='never' >*!/*/}
                    <View style={styles.bottomViewContainer}>
                        <View style={styles.TextInputStyle}>

                            <View
                                style={{borderWidth:1.2,height:43,marginBottom:12,borderRadius:10,
                                    borderColor:'#e4e4e4',borderBottomWidth:3,borderRightWidth:2}}>
                                <TextInput
                                    numberOfLines={1}
                                    placeholderTextColor={'#dcdcdc'}//提示文本的颜色
                                    placeholder={'username'}//提示文本内容
                                    underlineColorAndroid={'transparent'}
                                    style={styles.TextI}
                                    value={this.state.email}
                                    selectionColor={'#21A7DC'}
                                    onChangeText={(text) => this.setState({email:text})}
                                />
                            </View>

                            <View
                                style={{borderWidth:1.2,height:43,marginBottom:12,borderRadius:10,
                                    borderColor:'#e4e4e4',borderBottomWidth:3,borderRightWidth:2}}>
                                <TextInput
                                    numberOfLines={1}
                                    placeholderTextColor={'#dcdcdc'}//提示文本的颜色
                                    placeholder={'password'}//提示文本内容
                                    underlineColorAndroid={'transparent'}
                                    value={this.state.password}
                                    style={styles.TextI}
                                    selectionColor={'#21A7DC'}
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({password:text})}
                                />
                            </View>
                            <View
                                style={{borderWidth:1.2,height:43,marginBottom:12,borderRadius:10,
                                    borderColor:'#e4e4e4',borderBottomWidth:3,borderRightWidth:2}}>
                                <TouchableOpacity style={{
                                    width:screenWidth * 0.75,
                                    height:40, borderRadius:8,
                                    marginBottom:10, justifyContent:'center',
                                    alignItems:'center',borderColor:'#1295D9',borderWidth:1}}
                                onPress={this.login.bind(this)}>
                                    <Text style={{color:'#000000',fontSize:20}}>登录</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bottomTextstyle}>
                                <TouchableOpacity onPress={this.forgetPassword}>
                                    <Text style={styles.TextStyle1}>忘记密码</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.registerNumber}>
                                    <Text style={styles.TextStyle2}>注册账号</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                {/*/!*</ScrollView>*!/*/}

            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    },
    //顶部样式
    topViewContainer: {
        //距离顶部高度
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },

    //底部样式
    bottomViewContainer: {
        justifyContent:'flex-start',
        alignItems:'center',
        flex:2
    },

    loginByOtherContianer:{
        width:screenWidth,
        // position:'absolute',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20,
        marginTop:20
    },

    //顶部图片的样式
    topImageStyle:{
        width:80,
        height:80,
        marginBottom:50,
        borderRadius:20,
        marginTop:100
    },


    TextInputStyle:{
        width:screenWidth * 0.6,
        height:screenWidth *0.6,
        justifyContent:'center',
        alignItems:'center',
    },
    TextI:{
        // backgroundColor:'#1295D9',
        width:screenWidth * 0.75,
        height:40,
        borderRadius:8,
        marginBottom:10,
        borderColor:'#1295D9',
        borderWidth:1,
    },
    bottomTextstyle:{
        flexDirection:'row',
    },
    TextStyle1:{
        marginRight:70,
        color:'#191415'
    },
    TextStyle2:{
        marginLeft:70,
        color:'#191415'
    },

    //横线
    loginByOtherLine:{
        backgroundColor:'#999999',
        height:1,
        width:screenWidth*0.25,
        marginLeft:10,
        marginRight:10
    },
    //其他登录方式的提示
    otherLoginHintLabel:{
        color: '#505050',
        fontSize:13
    },

    //第三方登录按钮容器
    socialLoginBtnContianer:{
        flexDirection:'row',
        marginTop:10,

    },
    //第三方登录按钮的样式
    socialLoginBtnStyle:{
        width:40,
        height:40,
        margin:20
    },

});