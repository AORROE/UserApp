import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    RefreshControl,
    Switch
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class CocmanagePage extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            value1:true,
            value2:true,
            value3:false,
            value4:true,
            value5:false,
        }
    }

    clickthis(){
    }
    render(){
        return(
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    bounces={false}
                    style={{marginTop:20}}>
                    <View style={styles.headStyle}>
                        <View style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}>
                            <Text style={styles.textStyle}>是否播放音乐</Text>
                            <Switch
                                style={{marginRight:10}}
                                onTintColor={'#03e016'}
                                thumbTintColor={'#fff'}
                                tintColor={'#d0d0d0'}
                                value={this.state.value1}
                                onValueChange={(value)=>{
                                    this.setState({
                                        value1:value
                                    });
                                    this.clickthis()
                                }}
                            />
                        </View>
                    </View>
                    <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

                    <View style={styles.headStyle}>
                        <View style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}>
                            <Text style={styles.textStyle}>TEST</Text>
                            <Switch
                                style={{marginRight:10}}
                                onTintColor={'#03e016'}
                                thumbTintColor={'#fff'}
                                tintColor={'#d0d0d0'}
                                value={this.state.value2}
                                onValueChange={(value)=>{
                                    this.setState({
                                        value2:value
                                    });
                                    this.clickthis()
                                }}/>
                        </View>
                    </View>
                    <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>


                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#e3e3e3'
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