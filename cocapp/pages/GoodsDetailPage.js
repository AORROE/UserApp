import React,{Component} from 'react';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
const screenWidth = Dimensions.get('window').width;

import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    TextInput, Dimensions, Alert, DeviceEventEmitter
} from 'react-native';
import Storage from "../utils/Storage";
import NT from "../utils/NavigatorTools";
import ImagePicker from "react-native-image-picker";

export default class GoodsDetailPage extends Component{
    static navigationOptions={
        headerTitle:'商品详情',
        headerBackTitle:null,
        headerTitleStyle: {alignSelf: 'center',color:'#fff'},
        headerRight:(
        <View>
        </View>
        )
    };

    constructor(props){
        super(props);
        this.state={
            text:'',
            value:'',
            goodsInfo:this.props.navigation.state.params.item,
            avatarSource: null,
            name:this.props.navigation.state.params.item.name,
            price:this.props.navigation.state.params.item.price,
            description:this.props.navigation.state.params.item.description,
            shop_id:this.props.navigation.state.params.shop_id,
            show_img:this.props.navigation.state.params.item.show_image,
            avatar:this.props.navigation.state.params.item.avatar,
            num:this.props.navigation.state.params.item.num,
            status:this.props.navigation.state.params.item.status,
            goods_id:this.props.navigation.state.params.item.id
        }
    }

    //方法
    onSelect(index, value){
        this.setState({
            text: `Selected index: ${index} , value: ${value}`
        })
    }

    modifyGoods(){
        Alert.alert('是否修改商品?','',[
            {text :'取消'},
            {
                text:'确定',
                onPress:() => {
                    Storage.get('token',(value)=>{
                        let params =
                            {name:this.state.name,price:this.state.price,description:this.state.description,
                                shop_id:this.state.goodsInfo.shop_id,show_image:this.state.show_image,
                                avatar:this.state.avatar,status:this.state.status,num:this.state.num,goods_id:this.state.goods_id};
                        NT.post("http://101.132.71.227/api/app/editGoods",params,(res)=>{
                            this.props.navigation.state.params.callback();
                            this.props.navigation.goBack();
                        },value);
                    });

                }
            }
        ])
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                // console.log('User cancelled photo picker');
            }
            else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                let formData = new FormData();
                let file = {uri: response.uri, type: 'multipart/form-data', name: 'image.png'};
                formData.append("image",file);   //这里的files就是后台需要的key
                Storage.get('token',(value)=>{
                    NT.uploadPost("http://101.132.71.227/api/app/uploadFile",formData,(res)=>{
                        // console.warn(res._bodyInit);
                        if(JSON.parse(res._bodyInit).status === 'success'){
                            // console.warn(res._bodyInit);
                            this.setState({
                                avatarSource: source,
                                show_image:JSON.parse(res._bodyInit).response,
                                avatar:JSON.parse(res._bodyInit).response
                            });
                        }
                    },value)
                })

            }
        });
    }


    //
    render(){
        const goodsData = this.state.goodsInfo;
        return(
            <ParallaxScrollView
                backgroundColor="#fff"
                contentBackgroundColor="#f5fcff"
                parallaxHeaderHeight={200}
                renderForeground={() => (
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        { this.state.avatarSource === null ?  <Image style={{height:200}} source={{uri:"http:101.132.71.227/"+goodsData.avatar}} /> :
                            <Image style={{height:200}} source={this.state.avatarSource} />
                        }
                    </TouchableOpacity>
                )}>

                <View style={{backgroundColor:'#fff',marginTop:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',height:60,}}>
                        <View style={{width:70,alignItems:'center'}}>
                            <Text>商品 :</Text>
                        </View>

                        <View style={{flex:1}}>
                            <TextInput
                                value={this.state.name}
                                style={{backgroundColor:'#fff',flex:1}}
                                onChangeText={(text) => this.setState({name:text})}
                                underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={{width:screenWidth,height:0.5, backgroundColor: '#cecece',marginLeft:18}}></View>

                    <View style={{flexDirection:'row',alignItems:'center',height:60, }}>
                        <View style={{width:70,alignItems:'center'}}>
                            <Text>金额 :</Text>
                        </View>

                        <View style={{flex:1}}>
                            <TextInput
                                value={this.state.price+''}
                                style={{backgroundColor:'#fff',flex:1}}
                                onChangeText={(text) => this.setState({price:text})}
                                underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={{width:screenWidth * 0.9,height:0.4, backgroundColor: '#cecece',marginLeft:18}}></View>

                    <RadioGroup
                        size={15}
                        thickness={2}
                        color='#1295D9'
                        selectedIndex={goodsData.status}
                        onSelect = {(index, value) => this.onSelect(index, value)}
                        style={{flexDirection:'row',justifyContent:'space-around',height:60}}>
                        <RadioButton value={'item1'} color='#1295D9' style={{alignItems:'center'}}>
                            <Text>上架</Text>
                        </RadioButton>

                        <RadioButton value={'item2'} color='#1295D9' style={{alignItems:'center'}}>
                            <Text>下架</Text>
                        </RadioButton>
                    </RadioGroup>
                    <View style={{width:screenWidth * 0.9,height:0.4, backgroundColor: '#cecece',marginLeft:18}}></View>


                    <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
                        <View style={{width:70,alignItems:'center'}}>
                            <Text>商品数量 :</Text>
                        </View>

                        <View style={{flex:1,height:60,}}>
                            <TextInput
                                value={this.state.num+''}
                                style={{backgroundColor:'#fff',flex:1}}
                                onChangeText={(text) => this.setState({num:text})}
                                underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={{width:screenWidth * 0.9,height:0.4, backgroundColor: '#cecece',marginLeft:18}}></View>

                    <View style={{flexDirection:'row',alignItems:'center',flex:1,height:60,}}>
                        <View style={{width:70,alignItems:'center'}}>
                            <Text>条形码 :</Text>
                        </View>

                        <View style={{flex:1}}>

                        </View>
                    </View>
                    <View style={{width:screenWidth * 0.9,height:0.4, backgroundColor: '#cecece',marginLeft:18}}></View>

                </View>

                <View style={{backgroundColor:'#fff',marginTop:10,borderWidth:0.4,justifyContent:'flex-start'}}>
                    <TextInput
                        style={{height:150}}
                        underlineColorAndroid={'transparent'}
                        value={'商品描述：'+this.state.description}
                        multiline={true}
                        onChangeText={(text) => this.setState({description:text})}/>
                </View>

                <TouchableOpacity
                    onPress={this.modifyGoods.bind(this)}
                    style={{backgroundColor:'#fff',marginTop:10,borderWidth:1,borderColor:'#38b7ff',borderRadius:10,
                        flexDirection:'row',justifyContent:'center',alignItems:'center',height:40}}>
                    <Text>确认修改</Text>
                </TouchableOpacity>


            </ParallaxScrollView>
        );
    }
}