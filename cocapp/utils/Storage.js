import React, {Component} from 'react';
import {
    AsyncStorage,
}from 'react-native';

export default class DeviceStorage{

    /**
     * 获取方法
     * @param key
     * @returns {Promise.<TResult>}
     */
    static get(key,callback){
        AsyncStorage.getItem(key).then(
            (Value)=>{
                callback(JSON.parse(Value));
            }
        );
    }

    /**
     * 保存
     * @param key
     * @param value
     * @returns {*|Promise}
     */
    static save(key,value){
        return AsyncStorage.setItem(key,JSON.stringify(value));
    }



    /**
     * 更新
     * @param key
     * @param value
     * @returns {Promise.<TResult>}
     */
    static update(key,value){
        return DeviceStorage.get(key).then(
            (item)=>{
                value = typeof value === 'string' ? value : Object.assign({}, item, value);
                return AsyncStorage.setItem(key, JSON.stringify(value));
            }
        );
    }

    /**
     * 删除
     * @param key
     * @returns {*|Promise}
     */
    static delete(key){
        return AsyncStorage.removeItem(key);
    }

}