<template>
  <div>
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      class="demo-form-inline"
      style="margin-top: 20px"
    >
      <el-form-item prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="会员名称"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="searchMap.payType" placeholder="支付类型">
          <el-option
            v-for="option in payTypeOption"
            :key="option.type"
            :laber="option.name"
            :value="option.type"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker
          type="date"
          placeholder="出生日期"
          v-model="searchMap.birthday"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button type="primary" @click="resertForm('searchForm')"
          >重置</el-button
        >
        <el-button type="primary" @click="add">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号" width="150">
      </el-table-column>
      <el-table-column prop="name" label="会员姓名"> </el-table-column>
      <el-table-column prop="brithday" label="会员生日"> </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="110">
      </el-table-column>
      <el-table-column prop="money" label="开卡金额"> </el-table-column>
      <el-table-column prop="payType" label="支付类型" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.payType|payTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="adress" label="会员地址" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totals"
    >
    </el-pagination>

    <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        ref="addForm"
        :inline="true"
        :model="addForm"
        class="demo-form-inline"
        style="width: 400px"
        label-width="100px"
        label-position="right"
      >
        <el-form-item prop="cardNum" label="会员卡号">
          <el-input v-model="addForm.cardNum" placeholder="会员卡号"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="会员名称">
          <el-input v-model="addForm.name" placeholder="会员名称"></el-input>
        </el-form-item>
        <el-form-item prop="birthday" label="会员生日">
            <el-date-picker type="date" placeholder="请选择" v-model="addForm.birthday"/>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
            <el-input v-model="addForm.phone" ></el-input>
        </el-form-item>
        <el-form-item prop="money" label="开卡金额">
            <el-input v-model="addForm.money" ></el-input>
        </el-form-item>
        <el-form-item prop="integral" label="可用积分">
            <el-input v-model="addForm.integral" ></el-input>
        </el-form-item>
        <el-form-item prop="payType" label="支付类型">
          <el-select v-model="addForm.payType" placeholder="支付类型">
            <el-option
              v-for="option in payTypeOption"
              :key="option.type"
              :laber="option.name"
              :value="option.type"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="address" label="会员地址">
          <el-input v-model="addForm.address" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData('addForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import memberApi from "@/api/member";

const payTypeOption = [
  { type: "1", name: "现金" },
  { type: "2", name: "微信" },
];

export default {
  data() {
    return {
      list: [],
      totals: 0,
      currentPage: 1,
      pageSize: 10,
      searchMap: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
      },
      payTypeOption,
      dialogFormVisible: false,
      addForm: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
        phone: "",
        money: "",
        integral: "",
        address: ""

      },
      
      relus: {

          cardNum: [{ required: true, message: '卡号不能为空', trigger: 'blur' }], 
          name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
          payType: [{ required: true, message: '请选择支付类型', trigger: 'change' }],
      }

    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      //   memberApi.getList().then((response) => {
      //     console.log(response.data);

      //     this.list = response.data.data;
      //   });
      memberApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then((response) => {
          console.log(123456);
          const resp = response.data;
          this.totals = resp.data.total;
          this.list = resp.data.list;
          console.log(response.data);
        });
    },

    handleSizeChange(val) {
      this.fetchData();
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.fetchData();
      this.pageSize = val;
    },

    resertForm(formName) {
      this.$refs[formName].resetFields();
    },

    add() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        // this.$nextTick()它是一个异步事件，当渲染结束 之后 ，它的回调函数才会被执行
        // 弹出窗口打开之后 ，需要加载Dom, 就需要花费一点时间，我们就应该等待它加载完dom之后，再进行调 用resetFields方法，重置表单和清除样式
        this.$refs["addForm"].resetFields();
      });
    },

    addData(addForm){

        this.$refs[addForm].validate((valid)=>{

            if(valid){
                //通过验证提交数据
                console.log(this.addForm);
                memberApi.addData(this.addForm).then(response=>{

                    const resp = response.data;
                    if(resp.flag){
                        //新增成功 刷新列表数据
                        this.fetchData();
                        this.dialogFormVisible=false; //关闭窗口
                    }else{
                        //失败弹出警示

                        this.message({

                            message: resp.message,
                            type: 'warning'
                        })
                    }

                });


            }else{

                //验证失败 提示
                return false
            }
        })
    }
  },

  filters: {
    payTypeFilter(type) {
    
      const obj = payTypeOption.find((obj) => obj.type == type);


      return obj ? obj.name : null;
    },
  },
};
</script>

