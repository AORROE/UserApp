
class NavigatorTools {
    static navi;
    static token;
    static post(url,params,callback,token){
        fetch(
            url,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':token,
                },
                body: JSON.stringify(params)
            }).then(
            (response) => {
                callback(response)
            })
            .catch(e => {console.log(`error ${e}`)});
    }

    static get(url,callback,token){
        fetch(
            url,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':token,
                },
            }).then(
            (response) => {
                callback(response)
            })
            .catch(e => {console.log(`error ${e}`)});
    }

    static uploadPost(url,params,callback,token){
        fetch(
            url,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization':token,
                },
                body: params
            }).then(
            (response) => {
                callback(response)
            })
            .catch(e => {console.log(`error ${e}`)});
    }

}

export default NavigatorTools;