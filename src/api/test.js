import request from '@/utils/request';

const BASE_URL = '';

console.log(BASE_URL)

console.log(process.env.NODE_ENV)

request.get(BASE_URL+"/db.json").then(response=>{
    console.log(BASE_URL)
    console.log("get1",response.data);
}).catch(error=>{
    console.log(error)
})


request({
    url: BASE_URL+"/db.json",
    method: "get"
}).then(response=>{
    console.log("get2",response.data);
}).catch(error=>{
    console.log(error)
})


export default{

    getList(){
        const req = request({
            url: BASE_URL+"/db.json",
            method: "get"
        });
        return req;
    }
}

//export default test 