import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

// import TimerButton from '../component/TimerButton';

const screenWidth = Dimensions.get('window').width;

export default class RegisterPage extends Component{

    getCode(){
        alert('获取验证码')
    }

    register(){
        alert('注册成功')
    }

    render(){
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textIStyle1}
                    placeholder={'邮箱/手机号码'}
                    keyboardType='email-address'
                    underlineColorAndroid={'transparent'}/>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <TextInput
                        style={styles.textIStyle2}
                        placeholder={'输入验证码'}
                        keyboardType='default'
                        underlineColorAndroid={'transparent'}/>
                    <TimerButton
                        timerCount={60}
                        textStyle={{color: '#dc1466'}}
                        onclick={(start)=>{
                        }}/>
                </View>

                <TouchableOpacity
                    style={styles.registerBtn}
                    onPress={this.register.bind(this)}>
                    <Text>注册</Text>
                </TouchableOpacity>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    textIStyle1:{
        width:screenWidth * 0.9,
        height:50,
        backgroundColor:'#d8ffd8',
        borderRadius:5,
        marginTop:100,
        marginLeft:18,
    },

    textIStyle2:{
        width:screenWidth * 0.5,
        height:50,
        backgroundColor:'#d8ffd8',
        borderRadius:5,
        marginTop:10,
        marginLeft:18,
    },

    getCodeStyle:{
        width:screenWidth * 0.37,
        height:50,
        backgroundColor:'#4348ff',
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginLeft:10,
    },

    registerBtn :{
        width:screenWidth * 0.9,
        height:50,
        backgroundColor:'#d8ffd8',
        borderRadius:5,
        marginTop:10,
        marginLeft:18,
        justifyContent:'center',
        alignItems:'center',
    },


});