import React, {Component} from 'react';
import {
    View,
} from 'react-native';


export default class SeparatorComponent extends Component{

    render(){
        var separatorList=[];
        for(let i=0;i<23;i++){
            let j =i%2;
            var separator=(
                j===0?<View key={i} style={{width:10,height:1, backgroundColor: '#43dccd',marginTop:5,marginBottom:5,marginLeft:5}}></View>:
                    <View key={i} style={{width:10,height:1, backgroundColor: '#f55d00',marginTop:5,marginBottom:5,marginLeft:5}}></View>
            );
            separatorList.push(separator);
        }
        return(
            <View style={{flexDirection:'row'}}>
                {separatorList}
            </View>
        );
    }
}