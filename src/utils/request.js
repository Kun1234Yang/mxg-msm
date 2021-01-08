import axios from 'axios'


const request = axios.create({

    baseURL: '/rng',
    timeout: 5000
    
})



// axios.get("http://localhost:8888/db.json").then(response=>{
//     console.log("get1",response.data);
// }).catch(error=>{
//     console.log(error)
// })
export default request