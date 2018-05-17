import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';

const screenWidth = Dimensions.get('window').width;


export default class UserInfoPage extends PureComponent{

    render(){
        return(
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    bounces={false}
                    style={{marginTop:20}}>
                    <View style={styles.headStylef}>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',width:screenWidth}}>
                            <Text style={styles.textStyle}>头像</Text>
                            <Image source={require('../images/icon_weixin_red.png')}
                                   style={{width:screenWidth * 0.1,height:screenWidth * 0.1,marginLeft:screenWidth *0.7}}/>
                            <Image source={require('../images/rightarrow.png')}
                                   style={{width:20,height:20,marginLeft:5}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

                    <View style={styles.headStyle}>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',width:screenWidth}}>
                            <Text style={styles.textStyle}>昵称</Text>
                            <Text style={{width:100,marginLeft:screenWidth *0.52,textAlign:'right'}}
                                  numberOfLines={1}>
                                AQJAIWJIXA
                            </Text>
                            <Image source={require('../images/rightarrow.png')}
                                   style={{width:20,height:20,marginLeft:5}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

                    <View style={styles.headStyle}>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',width:screenWidth}}>
                            <Text style={styles.textStyle}>邮箱</Text>
                            <Image source={require('../images/rightarrow.png')}
                                   style={{width:20,height:20,marginLeft:screenWidth * 0.815}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

                    <View style={styles.headStyle}>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',width:screenWidth}}>
                            <Text style={styles.textStyle}>修改密码</Text>
                            <Image source={require('../images/rightarrow.png')}
                                   style={{width:20,height:20,marginLeft:screenWidth * 0.735}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

                    <View style={styles.headStyle}>
                        <TouchableOpacity
                            style={{flexDirection:'row',alignItems:'center',width:screenWidth}}>
                            <Text style={styles.textStyle}>收货地址</Text>
                            <Text style={{marginLeft:screenWidth *0.55,}}>
                                修改/添加
                            </Text>
                            <Image source={require('../images/rightarrow.png')}
                                   style={{width:20,height:20,marginLeft:5}}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#e9e9e9'
    },

    headStylef:{
        width:screenWidth,
        height:70,
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

    textStyle:{
        marginLeft:10,
    },

});