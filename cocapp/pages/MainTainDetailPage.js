import React, { Component } from 'react';
import DateTimePicker from "react-native-modal-datetime-picker";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    moment
} from 'react-native';
import moment1 from 'moment';
export default class MainTainDetailPage extends Component{
    constructor(props){
        super(props)
        this.state={
            isDateTimePickerVisible: false,
            date:'11111'
        }
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = date => {
        // console.warn("A date has been picked: ", date);
        this._hideDateTimePicker();
        var DateFormat =  moment1(date).format("hh:mm:ss");
        this.setState({date:DateFormat})
        // this.props._handleDatePicked(DateFormat);
        // this.setState({
        //     date:date
        // })
    };

    render(){
        return(
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{borderWidth:1,height:55,flexDirection:'row'}}>
                    <Text>损坏日期</Text>
                    <TouchableOpacity onPress={this._showDateTimePicker}>
                        <Text>{this.state.date}</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                        mode={'time'}
                    />
                </View>

                <View style={{borderWidth:1,flexDirection:'row'}}>
                    <Text>损坏原因</Text>
                    <TextInput
                        style={{height:100,flex:1}}
                    />
                </View>

                <View style={{borderWidth:1,height:55,flexDirection:'row'}}>
                    <Text>请求修理的时间</Text>

                </View>

                <View style={{borderWidth:1,height:55,flexDirection:'row'}}>
                    <Text>损坏图片上传</Text>

                </View>

                <View style={{borderWidth:1,height:55,flexDirection:'row'}}>
                    <Text>确认</Text>

                </View>
            </View>
        );
    }
}