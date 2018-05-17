import React, { Component } from 'react';
import OrderNavigator from '../navigator/OrderNavigation';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default class OrderFlatListView extends Component{

    constructor(props){
        super(props);
        this.state={
            data:[],
            refreshing:false
        }
    }

    componentWillMount(){
        this.getData()
    }

    getData(){
        let datat = [];
        for (let i = 0; i < 30; i++) {
            datat.push({key: i, title: i + ''});
        }
        this.setState({
            data:datat
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

    clickItem(item,index) {
        this.props.navigate('UserInfo');
    }

    keyExtractor = (item,index) => index;

    renderItem({item,index}){
        return(
            <TouchableOpacity style={{borderWidth:1,flexDirection:'row',alignItems:'center',
                backgroundColor:'#fff',width:screenWidth}} onPress={this.clickItem.bind(this,item,index)}>
                {/*<View style={{flex:2,alignItems:'center'}}>*/}
                    {/*<Image source={require('../images/icon_defaulshop.png')} style={{width:100,height:100}}/>*/}
                {/*</View>*/}

                {/*<View style={{flex:3,height:100,justifyContent:'center',marginLeft:10}}>*/}
                    {/*<View style={{position:'relative',justifyContent:'space-between',flexDirection:'row'}}>*/}
                        {/*<Text style={{fontSize:18}}>*/}
                            {/*店名{item.item.key}*/}
                        {/*</Text>*/}
                        {/*<Text>{item.item.title}km</Text>*/}
                    {/*</View>*/}

                    {/*<View>*/}
                        {/*<Text>balabalabal</Text>*/}
                    {/*</View>*/}

                    {/*<View>*/}
                        {/*<View style={{flexDirection:'row'}}>*/}
                            {/*<Image source={require('../images/icon_discount.png')} style={{width:20,height:20}}/>*/}
                            {/*<Text style={{marginLeft:10}}>balabalabal</Text>*/}
                        {/*</View>*/}

                        {/*<View style={{flexDirection:'row'}}>*/}
                            {/*<Image source={require('../images/icon_balance.png')} style={{width:20,height:20}}/>*/}
                            {/*<Text style={{marginLeft:10}}>balabalabal</Text>*/}
                        {/*</View>*/}

                    {/*</View>*/}

                {/*</View>*/}
                <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start'}}>
                    <View style={{flexDirection:'row',padding:5,alignItems:'center',flex:2}}>
                        <Image source={require('../images/icon_default.png')} style={{width:30,height:30}}/>
                        <Text>121212</Text>
                    </View>

                    <View style={{flexDirection:'column',flex:3}}>
                        <Text>1212121122222222222222222222</Text>
                        <Text>12121211222222222222</Text>
                    </View>
                    <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                        <Image source={require('../images/icon_time.png')} style={{width:20,height:20}}/>
                        <Text>2018-03-19 16:09</Text>
                    </View>
                </View>


            </TouchableOpacity>
        );
    }


    render() {
        return (
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    showsVerticalScrollIndicator={false}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refreshing}
                    keyExtractor={this.keyExtractor}
                    onEndReachedThreshold={0}
                    onEndReached={this._onload}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
