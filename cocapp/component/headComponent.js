import React, {Component, PureComponent} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class headComponent extends Component {
    localClick(){
        // this.props.navigate('UserInfo')
        alert('Location')
    }


    searchClick(){
        this.props.navigate('SearchPage')
    }


    render(){
        return(
            <LinearGradient
                start={{x: 0.3, y: 0.3}} end={{x: 0.6, y: 0.8}}
                locations={[0,0.8,1]}
                colors={['#25d6f4','#27d2ee','#27ccea']}
                style={styles.renderHeaderStyle}>
                <View style={{flex:1,alignItems:'center'}}>
                    <TouchableOpacity onPress={this.localClick.bind(this)}>
                        <Image source={require('../images/icon_local.png')} style={{width:28,height:28}}/>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flex:7,flexDirection:'row',margin:10,
                    alignItems:'center',backgroundColor:'#ffffff',borderRadius:20
                }}>
                    <TouchableOpacity style={{margin:10,flexDirection:'row',width:screenWidth*0.8}}
                                      onPress={this.searchClick.bind(this)}
                    >
                        <Image source={require('../images/icon_search.png')} style={{width:20,height:20}}/>
                        <Text>请输入搜索内容</Text>
                    </TouchableOpacity>

                </View>

                <View style={{flex:1,alignItems:'center'}}>
                    <TouchableOpacity>
                        <Image source={require('../images/icon_setting.png')} style={{width:28,height:28}}/>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    renderHeaderStyle:{
        width:screenWidth,
        height:55,
        backgroundColor:'#1295D9',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        padding:10
    }
});