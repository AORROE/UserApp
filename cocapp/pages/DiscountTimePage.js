import React, { Component } from 'react';
import DateTimePicker from "react-native-modal-datetime-picker";
import NT from '../utils/NavigatorTools';
import {
    StyleSheet,
    Image,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import moment1 from "moment/moment";

const screenWidth = Dimensions.get('window').width;

export default class DiscountTimePage extends Component {
    static navigationOptions={
        headerTitle:'填写时限',
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
            isDateTimePickerVisible1: false,
            isDateTimePickerVisible2: false,
            isDateTimePickerVisible3: false,
            isDateTimePickerVisible4: false,

            startDate:'选择开始日期',
            startTime:'选择开始时间',
            endDate:'选择结束日期',
            endTime:'选择结束时间',
        }
    }


    //
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible1: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible1: false });

    _handleDatePicked = date => {
        this._hideDateTimePicker();
        var StartDate =  moment1(date).format("YYYY-MM-DD");
        this.setState({
            startDate:StartDate
        })
    };


    //
    _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });

    _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });

    _handleDatePicked2 = date => {
        this._hideDateTimePicker2();
        var StartTime =  moment1(date).format("hh:mm:ss");
        this.setState({
            startTime:StartTime
        })
    };

    //
    _showDateTimePicker3= () => this.setState({ isDateTimePickerVisible3: true });

    _hideDateTimePicker3 = () => this.setState({ isDateTimePickerVisible3: false });

    _handleDatePicked3 = date => {
        this._hideDateTimePicker3();
        var EndDate =  moment1(date).format("YYYY-MM-DD");
        this.setState({
            endDate:EndDate
        })
    };

    //
    _showDateTimePicker4= () => this.setState({ isDateTimePickerVisible4: true });

    _hideDateTimePicker4 = () => this.setState({ isDateTimePickerVisible4: false });

    _handleDatePicked4 = date => {
        this._hideDateTimePicker4();
        var EndTime =  moment1(date).format("hh:mm:ss");
        this.setState({
            endTime:EndTime
        })
    };

    //
    completed(){
        // console.warn(this.state.startDate + ' '+this.state.startTime + '---' + this.state.endDate+' '+this.state.endTime);
        this.props.navigation.state.params
            .callback(this.state.startDate + ' '+this.state.startTime,this.state.endDate+' '+this.state.endTime)
        this.props.navigation.goBack()
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
                            onPress={this._showDateTimePicker}
                            style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}>
                            <Text style={styles.textStyle}>开始日期:</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'#d6d6d6'}}>{this.state.startDate}</Text>
                                <Image source={require('../images/rightarrow.png')}
                                       style={{width:20,height:20,marginLeft:5}}/>
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible1}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        />
                    </View>
                    <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

                    <View style={styles.headStyle}>
                        <TouchableOpacity
                            onPress={this._showDateTimePicker2}
                            style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}>
                            <Text style={styles.textStyle}>开始时间:</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'#d6d6d6'}}>{this.state.startTime}</Text>
                                <Image source={require('../images/rightarrow.png')}
                                       style={{width:20,height:20,marginLeft:5}}/>
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible2}
                            onConfirm={this._handleDatePicked2}
                            onCancel={this._hideDateTimePicker2}
                            mode={'time'}
                        />
                    </View>
                    <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

                    <View style={styles.headStyle}>
                        <TouchableOpacity
                            onPress={this._showDateTimePicker3}
                            style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}>
                            <Text style={styles.textStyle}>结束日期:</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'#d6d6d6'}}>{this.state.endDate}</Text>
                                <Image source={require('../images/rightarrow.png')}
                                       style={{width:20,height:20,marginLeft:5}}/>
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible3}
                            onConfirm={this._handleDatePicked3}
                            onCancel={this._hideDateTimePicker3}
                        />
                    </View>
                    <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>

                    <View style={styles.headStyle}>
                        <TouchableOpacity
                            onPress={this._showDateTimePicker4}
                            style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'space-between'}}>
                            <Text style={styles.textStyle}>结束时间:</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'#d6d6d6'}}>{this.state.endTime}</Text>
                                <Image source={require('../images/rightarrow.png')}
                                       style={{width:20,height:20,marginLeft:5}}/>
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible4}
                            onConfirm={this._handleDatePicked4}
                            onCancel={this._hideDateTimePicker4}
                            mode={'time'}
                        />
                    </View>
                    <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>


                </ScrollView>
                <View style={[styles.headStyle,{backgroundColor:'#25d6f4'}]}>
                    <TouchableOpacity
                        onPress={this.completed.bind(this)}
                        style={{flexDirection:'row',alignItems:'center',width:screenWidth,justifyContent:'center'}}>
                        <Text style={[styles.textStyle,{color:'#fff'}]}>完成</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width:screenWidth,height:0.3, backgroundColor: '#d8d8d8',marginLeft:10}}></View>
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