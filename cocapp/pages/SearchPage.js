import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import HeadComponent from '../component/headComponent'

export default class SearchPage extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>搜索页</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center'
    },
});