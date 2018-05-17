import Storage from '../utils/Storage'
export default class WebSocketUtil{
   static ws;

    static init(url,shopInfo,userInfo,token){
        this.ws = new WebSocket(url);
        this.ws.onopen = () => {
           // this.ws.send('连接成功');
            let data = {'type':'register','shopInfo':shopInfo,'userInfo':userInfo,'token':token};
            this.ws.send(JSON.stringify(data));
            console.warn('连接成功');
        };

        this.ws.onmessage = (e) => {
            console.warn(JSON.stringify(e.data))
        };

        this.ws.onerror = (e) => {
            // 发生了一个错误
            console.log(e.message);
        };

        this.ws.onclose = (e) => {
            // 连接被关闭了
            console.warn(JSON.stringify(e.reason));
        };
    }
    static handleMessage(callback){
        this.ws.onmessage = (e) => {
            callback(e.data);
            if(e.type == "Info"){
                switch (e.typeInfo){
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                }
            }else{
                switch (e.typeInfo){
                    case 1:
                        this.ws.send();
                        break;
                    case 2:
                        this.ws.send();
                        break;
                    case 3:
                        this.ws.send();
                        break;
                }
            }

        };
    }
    // static

    static sendMessage(message){
        Storage.get('token',(value)=>{
            let data = {'type':'getInfo','typeInfo':1,'token':value};
            this.ws.send(message);
        })
    }

    static socketclose(){
        this.ws.close();
    }

}

