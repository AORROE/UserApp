import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import NT from '../utils/NavigatorTools';
import Storage from "../utils/Storage";
import EditView1 from '../navigator/EditView';
import EditView2 from '../navigator/EditView';
import EditView3 from '../navigator/EditView';
import {
    StyleSheet,
    Image,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions, Alert,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class NewRegisterPage extends Component {
    static navigationOptions={
        title:'注册账号',
        headerStyle: {backgroundColor: '#1295D9'},
        headerTitleStyle: {color: '#fff', alignSelf: 'center'},
        headerRight:(
            <View>
            </View>
        )
    };

    constructor(props){
        super(props);
        this.state={
            avatarSource:null,
            avatarSource1:null,
            name:'请填写店名',
            address:'请填写地址',
            shop_avatar:'',
            avatar:'',
            phone:'输入电话号码',
            shop_discount:'',
            user_id:this.props.navigation.state.params.userid,
            default:'上传图片'
        }
    }
    componentWillMount(){
        this.setState({
            user_id:this.props.navigation.state.params.userid
        })
    }

    //选择图片
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
                                shop_avatar:JSON.parse(res._bodyInit).response,
                                default:''
                            });
                        }
                    },value)
                })

            }
        });
    }

    selectPhotoTapped1() {
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
                                avatarSource1: source,
                                avatar:JSON.parse(res._bodyInit).response,
                                default:''
                            });
                        }
                    },value)
                })

            }
        });
    }

    //注册事件
    registerShoper(){
        Alert.alert('是否成为商家?','',[
            {text :'取消'},
            {
                text:'确定',
                onPress:() => {
                    Storage.get('token',(value)=>{
                        let params =
                            {name:this.state.name,address:this.state.address,shop_avatar:this.state.shop_avatar,avatar:this.state.avatar,
                            phone:this.state.phone,user_id:this.state.user_id};
                        NT.post("http://101.132.71.227/api/app/registerShop",params,(res)=>{
                            console.warn(res)
                            this.props.navigation.goBack('Login');
                        },value);
                    });

                }
            }
        ])
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
                      <TouchableOpacity
                          onPress={()=>this.editView1.show()}
                          style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}>
                          <Text style={styles.textStyle}>店名:</Text>
                          <View style={{flexDirection:'row'}}>
                              <Text style={{color:'#d6d6d6'}}>{this.state.name}</Text>
                              <Image source={require('../images/rightarrow.png')}
                                     style={{width:20,height:20,marginLeft:5}}/>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

                  <View style={styles.headStyle}>
                      <TouchableOpacity
                          onPress={()=>this.editView2.show()}
                          style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}>
                          <Text style={styles.textStyle}>店铺地址:</Text>
                          <View style={{flexDirection:'row'}}>
                              <Text style={{color:'#d6d6d6'}}>{this.state.address}</Text>
                              <Image source={require('../images/rightarrow.png')}
                                     style={{width:20,height:20,marginLeft:5}}/>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

                  <View style={styles.headStyle}>
                      <TouchableOpacity
                          onPress={()=>this.editView3.show()}
                          style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}>
                          <Text style={styles.textStyle}>电话:</Text>
                          <View style={{flexDirection:'row'}}>
                              <Text style={{color:'#d6d6d6'}}>{this.state.phone}</Text>
                              <Image source={require('../images/rightarrow.png')}
                                     style={{width:20,height:20,marginLeft:5}}/>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

                  <View style={styles.headStyle}>
                      <TouchableOpacity
                          onPress={this.selectPhotoTapped.bind(this)}
                          style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}>
                          <Text style={styles.textStyle}>店铺图像:</Text>
                          <View style={{flexDirection:'row'}}>
                              <Text style={{color:'#d6d6d6'}}>{this.state.default}</Text>
                              { this.state.avatarSource === null ?  <Image style={{width:20,height:20,marginLeft:5}} source={require('../images/icon_default.png')} /> :
                              <Image style={{width:20,height:20,marginLeft:5,borderRadius:15}} source={this.state.avatarSource} />
                              }
                              <Image source={require('../images/rightarrow.png')}
                                     style={{width:20,height:20,marginLeft:5}}/>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

                  <View style={styles.headStyle}>
                      <TouchableOpacity
                          onPress={this.selectPhotoTapped1.bind(this)}
                          style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}>
                          <Text style={styles.textStyle}>商户头像:</Text>
                          <View style={{flexDirection:'row'}}>
                              <Text style={{color:'#d6d6d6'}}>{this.state.default}</Text>
                              { this.state.avatarSource1 === null ?  <Image style={{width:20,height:20,marginLeft:5,borderRadius:15}} source={require('../images/icon_default.png')} /> :
                                  <Image style={{width:20,height:20,marginLeft:5,borderRadius:15}} source={this.state.avatarSource1} />}
                              <Image source={require('../images/rightarrow.png')}
                                     style={{width:20,height:20,marginLeft:5}}/>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

              </ScrollView>
              <View style={[styles.headStyle,{backgroundColor:'#1295D9'}]}>
                  <TouchableOpacity
                      onPress={this.registerShoper.bind(this)}
                      style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'center'}}>
                      <Text style={[styles.textStyle,{color:'#fff'}]}>立即注册</Text>
                  </TouchableOpacity>
              </View>
              <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>
              <EditView1
                  // 在组件中使用this.editView即可访拿到EditView组件
                  ref={editView1 => this.editView1 = editView1}
                  inputText={this.state.name}
                  titleTxt={'填写店名'}
                  ensureCallback={name => this.setState({name:name})}
              />

              <EditView2
                  // 在组件中使用this.editView即可访拿到EditView组件
                  ref={editView2 => this.editView2 = editView2}
                  inputText={this.state.address}
                  titleTxt={'填写地址'}
                  ensureCallback={address => this.setState({address:address})}
              />

              <EditView3
                  // 在组件中使用this.editView即可访拿到EditView组件
                  ref={editView3=> this.editView3 = editView3}
                  inputText={this.state.phone}
                  titleTxt={'填写电话号码'}
                  ensureCallback={phone => this.setState({phone:phone})}
              />
          </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#eeeeee'
    },

    headStyle:{
        width:screenWidth,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff',
        marginTop:10

    },

    textStyle:{
        marginLeft:10,
        textAlign:'center'
    },

});