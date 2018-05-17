import React, { Component } from 'react';
import NT from '../utils/NavigatorTools';
import Storage from '../utils/Storage';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import EditView from '../navigator/EditView';
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
    Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class DiscountPage extends Component {

    static navigationOptions={
        headerTitle:'添加优惠券',
        headerBackTitle:null,
        headerStyle: {backgroundColor: '#25d6f4'},
        headerTitleStyle: {alignSelf: 'center',color:'#fff'},
        headerRight:(
            <View>
            </View>
        )
    };

    constructor(props){
        super(props)
        this.state={
            isDateTimePickerVisible: false,
            text:'',
            value:'',
            aaa:false,
            bbb:false,
            startDate:'选择优惠时间',
            endDate:'',
            description:'',
            discount:'0.00 -- 1.00',
            money:'输入起始金额',
            type:'',
            num:'输入数量',
            shop_id:this.props.navigation.state.params.shop_id
        }
    }

    componentWillMount(){
        // console.warn(this.props.navigation.state.params.Time)
    }
    //方法
    choolseTime(){
        NT.navi.navigate('DiscountTime',{callback:(data1,data2)=>{this.setState({startDate:data1,endDate:data2})}});
    }

    commitDiscount(){
        // console.warn(this.state.type)
        if(this.state.type === '满减'){
            Storage.get('token',(value)=>{
                Storage.get('shopInfo',(valueid)=>{
                let params = {discount:this.state.discount,start_time:this.state.startDate,end_time:this.state.endDate,num:this.state.num,shop_id:valueid[0].id,
                    use_point:0,description:this.state.discount,money:this.state.money,type:this.state.type};
                NT.post("http://101.132.71.227/api/app/addCoupon/"+this.state.shop_id+"",params,(res)=>{
                    // console.warn(res);
                    this.props.navigation.state.params.callback(params);
                    this.props.navigation.goBack();
                },value)})
            })
        }
        else{
            Storage.get('token',(value)=>{
                Storage.get('shopInfo',(valueid)=>{
                let params = {discount:this.state.discount,start_time:this.state.startDate,end_time:this.state.endDate,num:this.state.num,shop_id:valueid[0].id,
                    use_point:0,description:this.state.discount*10,money:this.state.money,type:this.state.type};
                NT.post("http://101.132.71.227/api/app/addCoupon/"+"2",params,(res)=>{
                    // console.warn(res);
                    this.props.navigation.state.params.callback(params);
                    this.props.navigation.goBack();
                },value)})
            })
        }
    }

    onSelect(index, value){
        switch (index){
            case 0:
                this.setState({
                    aaa:true,
                    bbb:false,
                    type:'折扣'
                })
                break;
            case 1:
                this.setState({
                    bbb:true,
                    aaa:false,
                    type:'满减'
                })
                break;
        }
        this.setState({
            text: `Selected index: ${index} , value: ${value}`,
        })
        // console.warn(index,value)
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
                            onPress={this.choolseTime.bind(this)}
                            style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}>
                            <Text style={styles.textStyle}>优惠时间:</Text>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{color:'#d6d6d6'}}  numberOfLines={1}>{this.state.startDate}</Text>
                                    <Text style={{color:'#d6d6d6'}}  numberOfLines={1}>{this.state.endDate}</Text>
                                </View>
                                <View style={{alignItems:'center',justifyContent:'center'}}>
                                    <Image source={require('../images/rightarrow.png')}
                                           style={{width:20,height:20,marginLeft:5}}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

                    <View style={styles.headStyle}>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',width:screenWidth}}>
                            <Text style={styles.textStyle}>优惠方式:</Text>
                            <RadioGroup
                                size={15}
                                thickness={2}
                                color='#1295D9'
                                // selectedIndex={0}
                                onSelect = {(index, value) => this.onSelect(index, value)}
                                style={{flexDirection:'row',justifyContent:'space-around',height:60,flex:1}}>
                                <RadioButton value={'折扣'} color='#1295D9' style={{alignItems:'center'}}>
                                    <Text>折扣</Text>
                                </RadioButton>
                                <RadioButton value={'满减'} color='#1295D9' style={{alignItems:'center'}}>
                                    <Text>满减</Text>
                                </RadioButton>
                            </RadioGroup>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

                    {this.state.aaa?
                        <View style={styles.headStyle}>
                            <TouchableOpacity
                                onPress={()=>this.editView.show()}
                                style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between',
                                marginBottom:10}}>
                                <Text style={styles.textStyle}>折扣范围:</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color:'#d6d6d6'}}>{this.state.discount}</Text>
                                    <Image source={require('../images/rightarrow.png')}
                                           style={{width:20,height:20,marginLeft:5}}/>
                                </View>
                            </TouchableOpacity>

                        <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>
                        <TouchableOpacity
                            onPress={()=>this.editView1.show()}
                            style={{flexDirection:'row',alignItems:'center',width:screenWidth,
                            justifyContent:'space-between',marginBottom:10,marginTop:10}}>
                            <Text style={styles.textStyle}>起始金额:</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'#d6d6d6'}}>{this.state.money}</Text>
                                <Image source={require('../images/rightarrow.png')}
                                       style={{width:20,height:20,marginLeft:5}}/>
                            </View>
                        </TouchableOpacity>
                        </View>:null}

                    {this.state.bbb?<View style={styles.headStyle}>
                        <TouchableOpacity
                            onPress={()=>this.editView.show()}
                            style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between',
                                marginBottom:10}}>
                            <Text style={styles.textStyle}>满减金额:</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'#d6d6d6'}}>{this.state.discount}</Text>
                                <Image source={require('../images/rightarrow.png')}
                                       style={{width:20,height:20,marginLeft:5}}/>
                            </View>
                        </TouchableOpacity>

                        <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>
                        <TouchableOpacity
                            onPress={()=>this.editView2.show()}
                            style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between',
                                marginBottom:10,marginTop:10}}>
                            <Text style={styles.textStyle}>填写金额:</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'#d6d6d6'}}>{this.state.money}</Text>
                                <Image source={require('../images/rightarrow.png')}
                                       style={{width:20,height:20,marginLeft:5}}/>
                            </View>
                        </TouchableOpacity>
                    </View>:null}

                    <View style={styles.headStyle}>
                        <TouchableOpacity
                            onPress={()=>this.editView3.show()}
                            style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}>
                            <Text style={styles.textStyle}>优惠券数量:</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'#d6d6d6'}}>{this.state.num}</Text>
                                <Image source={require('../images/rightarrow.png')}
                                       style={{width:20,height:20,marginLeft:5}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

                </ScrollView>
                <View style={[styles.headStyle,{backgroundColor:'#25d6f4'}]}>
                    <TouchableOpacity
                        onPress={this.commitDiscount.bind(this)}
                        style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'center'}}>
                        <Text style={[styles.textStyle,{color:'#fff'}]}>发布</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>
                <EditView
                    // 在组件中使用this.editView即可访拿到EditView组件
                    ref={editView => this.editView = editView}
                    inputText={this.state.discount}
                    titleTxt={'填写'}
                    ensureCallback={discount => this.setState({discount:discount,description:discount})}
                />

                <EditView1
                    // 在组件中使用this.editView即可访拿到EditView组件
                    ref={editView1 => this.editView1 = editView1}
                    inputText={this.state.money}
                    titleTxt={'填写起始金额'}
                    ensureCallback={money => this.setState({money:money})}
                />

                <EditView2
                    // 在组件中使用this.editView即可访拿到EditView组件
                    ref={editView2=> this.editView2 = editView2}
                    inputText={this.state.money}
                    titleTxt={'填写起始金额'}
                    ensureCallback={money => this.setState({money:money})}
                />

                <EditView3
                    // 在组件中使用this.editView即可访拿到EditView组件
                    ref={editView3=> this.editView3 = editView3}
                    inputText={this.state.num}
                    titleTxt={'填写数量'}
                    ensureCallback={num => this.setState({num:num})}
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
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff',
        marginTop:10,
        padding:15,
    },

    textStyle:{
        marginLeft:10,
        textAlign:'center'
    },

});