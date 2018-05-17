import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';

export default class CarouselComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            //当前显示的图片索引
            currentIndex:0,
            //在线图片数据
            imgDate:[
                "http://img.lanrentuku.com/img/allimg/1608/5-160Q9213245-50.jpg",
                "http://img.lanrentuku.com/img/allimg/1608/5-160Q9213246.jpg",
                "http://img.lanrentuku.com/img/allimg/1608/5-160Q9213247.jpg",
                "http://img.lanrentuku.com/img/allimg/1608/5-160Q9213247-52.jpg"
            ]
        };
        this.carousel = this.carousel.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.onAnnotationEnd = this.onAnnotationEnd.bind(this)
    }
    componentDidMount(){
        this.carousel()
    }

    //点击圆点，关闭定时器，并设置当前图片索引
    dotClick(index){
        clearInterval(this.carouselTimer);
        this.setState({
            currentIndex:index
        },()=>{
            var ScrollView = this.refs.scrollView;
            const currentX = this.state.currentIndex*Dimensions.get('window').width;
            ScrollView.scrollResponderScrollTo({x:currentX,animated:true})
        })
    }

    //开始拖动，关闭定时器
    dragStart(){
        clearInterval(this.carouselTimer);
    }

    //拖动结束，开启定时器
    dragEnd(){
        this.carousel()
    }

    //定时器
    carousel(){
        var ScrollView = this.refs.scrollView;
        const timer = 2500;
        let currentIndex = this.state.currentIndex;

        this.carouselTimer = setInterval(()=>{
            currentIndex===this.state.imgDate.length-1?currentIndex=0:currentIndex++;
            this.setState({
                currentIndex:currentIndex
            },()=>{
                const currentX = currentIndex*Dimensions.get('window').width;
                ScrollView.scrollResponderScrollTo({x:currentX,animated:true})
            })
        },timer)

    }

    //当一帧滚动完毕时，重新设置当前图片的索引
    onAnnotationEnd(e){
        const offSetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.floor(offSetX/Dimensions.get('window').width);
        this.setState({
            currentIndex:currentIndex
        })
    }
    render() {
        const { imgDate, currentIndex } = this.state;
        const screenWidth = Dimensions.get('window').width;
        const imgDataList = imgDate.map((elem,index)=>{
            return(
                <TouchableOpacity key={index} activeOpacity={0.8}>
                    <Image key={index} style={{width:screenWidth,height:100}} source={{uri:elem}} resizeMode={'cover'}/>
                </TouchableOpacity>
            )
        });
        const dotList = imgDate.map((elem,index)=>{
            return (
                <Text onPress={this.dotClick.bind(this,index)} key={index} style={[styles.dotStyle,{backgroundColor:currentIndex===index?"#ffffff":"#aaaaaa"}]}>

                </Text>
            )
        });
        return (
            <View style={{alignItems:'center'}}>
                <ScrollView
                    ref="scrollView"
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onScrollBeginDrag={this.dragStart}
                    onScrollEndDrag={this.dragEnd}
                    onMomentumScrollEnd={this.onAnnotationEnd}
                >
                    {imgDataList}
                </ScrollView>
                <View style={styles.dotView}>{dotList}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dotStyle:{
        width:8,
        height:8,
        borderRadius:12,
        marginRight:10,
    },
    dotView:{
        flexDirection:'row',
        bottom:5,
        position:'absolute'
    }
});