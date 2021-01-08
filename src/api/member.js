import request from '@/utils/request'

export default{

    getList(){
        return request({

            method: "post",
            url: '/member/list',
        
        })
    },

    search(page,size,searchMap){

        return request({

            url: `/member/search/${page}/${size}`,
            method: 'get',
            data: searchMap
        })

    },

    addData(addForm){

        return request({

            headers: {
                'Content-Type': 'application/json'
            },

            url: '/member/add',
            method: "post",
            data: addForm

        })


    }


}