import React,{Component} from 'react';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import ImagePicker from 'react-native-image-picker';
import NT from '../utils/NavigatorTools';
import Storage from "../utils/Storage";
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    TextInput,
    Dimensions,
    Alert
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class GoodsDetailPage extends Component{
    static navigationOptions={
        headerTitle:'添加商品',
        headerStyle: {backgroundColor: '#38b7ff'},
        headerBackTitle:null,
        headerTitleStyle: {alignSelf: 'center'},
        headerRight:(
            <View>
            </View>
        ),

    };

    constructor(props){
        super(props);
        this.state={
            text:'',
            value:'',
            avatarSource: null,
            name:'',
            price:'',
            description:'',
            shop_id:this.props.navigation.state.params.shop_id,
            show_img:null,
            avatar:null,
            num:'',
            status:''
        }
    }

    componentWillMount(){
    }

    onSelect(index, value){
        this.setState({
            text: `Selected index: ${index} , value: ${value}`,
            status:index
        })
        // console.warn(index)
    }

    addGoods=()=>{
        Alert.alert('是否添加商品?','',[
            {text :'取消'},
            {
                text:'确定',
                onPress:() => {
                    Storage.get('token',(value)=> {
                        Storage.get('shopInfo', (valueid) => {
                            let params =
                                {
                                    name: this.state.name, price: this.state.price, description: this.state.description,
                                    shop_id: valueid[0].id, show_image: this.state.show_image,
                                    avatar: this.state.avatar, status: this.state.status, num: this.state.num
                                };
                            NT.post("http://101.132.71.227/api/app/addGoods", params, (res) => {
                                // console.warn(res)
                                this.props.navigation.state.params.callback(params, this.state.avatarSource);
                                this.props.navigation.goBack();
                            }, value);
                        });
                    })

                }
            }
        ])

    };

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

    render(){
        return(
            <View style={{backgroundColor:'#f5fcff',flex:1}}>
            <ParallaxScrollView
                backgroundColor="#f5fcff"
                contentBackgroundColor="#f5fcff"
                parallaxHeaderHeight={200}
                renderForeground={() => (
                    <TouchableOpacity
                        onPress={this.selectPhotoTapped.bind(this)}
                    >
                        { this.state.avatarSource === null ?  <Image style={{height:200}} source={require('../images/icon_goods.png')} /> :
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
                        placeholder={'商品描述：'}
                        multiline={true}
                        onChangeText={(text) => this.setState({description:text})}/>
                </View>

                <TouchableOpacity
                    onPress={this.addGoods.bind(this)}
                    style={{backgroundColor:'#fff',marginTop:10,borderWidth:1,borderColor:'#38b7ff',borderRadius:10,
                        flexDirection:'row',justifyContent:'center',alignItems:'center',height:40}}>
                    <Text>添加商品</Text>
                </TouchableOpacity>


            </ParallaxScrollView>
            </View>
        );
    }
}