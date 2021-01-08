<template>
    <div class="login-container">

        <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
            <h2 class="login-title">梦学谷会员管理系统</h2>
            <el-form-item label="账号" prop="username">
                <el-input v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">登录</el-button>
            </el-form-item>
        
        </el-form>
               
    </div>
</template>

<script>

import {login,getUserInfo} from '@/api/login'
  export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
    
        },
        rules: {

        username: [
            { required: true, message: '请输入有效账号', trigger: 'blur' }
          ],
        password: [
            { required: true, message: '请输入有效密码', trigger: 'blur' }
          ]

    }
      }
    },

    methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {

              login(this.form.username,this.form.password).then(response=>{

                    const resp = response.data
                    console.log(resp.flag)
                    console.log(response.data.code,response.data.data,response.data.message);
                    if(resp.flag){
                        console.log(resp.flag)
                        getUserInfo(resp.data).then(response=>{
                            const respUser = response.data;
                            if(respUser.flag){
                                //保存用户信息localStorage
                                localStorage.setItem('mxg-msm-user',JSON.stringify(respUser.data))
                                localStorage.setItem('mxg-msm-token',resp.token)
                                this.$router.push("/")
                            }else{

                                this.$message({
                                    message: respUser.message,
                                    type: "warning"
                                })

                            }
                        }).catch(error=>{
                  console.log('resuser submit!!');
              })
                    }else{

                        this.$message({
                                    message: resp.message,
                                    type: "warning"
                                })



                    }

              }).catch(error=>{
                  console.log('response submit!!');
              })
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
      
    }

  }
</script>

<style scoped>

    .login-form{
        width: 350px;
        margin: 160px auto;
        background-color:rgb(255, 255, 255,0.8);
        padding: 30px;
        border-radius: 20px;
    }
    .login-title{
        text-align: center;
        color: #303133;
    }
    .login-container{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: url(../../assets/login.jpg);
    }
</style>