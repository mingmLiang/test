<template>
  <div class="putInStorage">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="药品名称">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="数目">
        <el-input v-model.trim.number="form.amount" type="number"></el-input>
      </el-form-item>
      <el-form-item label="进药时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="厂家">
        <el-input v-model.trim="form.manufacturers"></el-input>
      </el-form-item>
      <el-form-item label="种类">
        <el-input v-model.trim="form.species"></el-input>
      </el-form-item>
      <el-form-item label="生产日期">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.productionData" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="规格">
        <el-input v-model.trim="form.specification"></el-input>
      </el-form-item>
      <el-form-item label="剂型">
        <el-input v-model.trim="form.dosageForm"></el-input>
      </el-form-item>
      <el-form-item label="单价">
        <el-input v-model.trim.number="form.unitPrice" type="number"></el-input>
      </el-form-item>
      <el-form-item label="总价">
        {{form.totalPrices}}
      </el-form-item>
      <el-form-item>
        <el-select v-model.trim="form.temperature" placeholder="请选择储存温度">
          <el-option label="常温" value="01"></el-option>
          <el-option label="冷藏" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="经手人">
        <el-input v-model.trim="form.handlers"></el-input>
      </el-form-item>
      <el-form-item label="质管员">
        <el-input v-model.trim="form.qualityOfficer"></el-input>
      </el-form-item>
      <el-form-item label="仓库员">
        <el-input v-model.trim="form.warehouseman"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model.trim="form.pattern" placeholder="请选择进药方式">
          <el-option label="网上订货" value="01"></el-option>
          <el-option label="到厂家进货" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">进药</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="tips" v-show="iconTog">
      不能为空或者时间输入有误！
      <i class="el-icon-circle-cross icon" @click="iconToggle"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        iconTog: false,
        form: {
          name: '',
          manufacturers: '',
          amount: '',
          unitPrice: '',
          totalPrices: 0,
          temperature: '',
          handlers: '',
          qualityOfficer: '',
          warehouseman: '',
          pattern: '',
          date1: '',
          date2: '',
          species: '',
          productionData: '',
          specification: '',
          dosageForm: ''
        }
      };
    },
    methods: {
      // 输入验证
      verification () {
        if (this.form.name && this.form.manufacturers && this.form.amount && this.form.unitPrice && this.form.temperature && this.form.handlers && this.form.qualityOfficer && this.form.warehouseman) {
          this.iconTog = false;
          return true;
        } else {
          this.iconTog = true;
          return false;
        }
      },
      // 提交进药数据vue-resource
      submitForm () {
        if (this.verification()) {
          console.log(this.form);
          this.$http.post('../static/Storage.json', this.form, {emulateJSON: true}).then(function (response) {
            console.log(response.body);
            this.resetForm();
          }, function () {
            console.log('后台接口有误,修改后台接口既可！');
            this.resetForm();
          });
        }
      },
      resetForm () {
        this.form = {
          name: '',
          manufacturers: '',
          amount: '',
          unitPrice: '',
          totalPrices: 0,
          temperature: '',
          handlers: '',
          qualityOfficer: '',
          warehouseman: '',
          pattern: '',
          date1: '',
          date2: '',
          species: '',
          productionData: '',
          specification: '',
          dosageForm: ''
        };
      },
      iconToggle () { // 计算属性
        this.iconTog = !this.iconTog;
      }
    },
    computed: {
      Amount () {
        return this.form.amount;
      },
      UnitPrice () {
        return this.form.unitPrice;
      }
    },
    watch: {
      Amount (newValue, oldValue) {
        this.form.totalPrices = this.form.amount * this.form.unitPrice;
      },
      UnitPrice (newValue, oldValue) {
        this.form.totalPrices = this.form.amount * this.form.unitPrice;
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .putInStorage
    max-width:800px
    .tips
      padding:8px 16px
      color: #fff
      opacity: 1
      transition: opacity .2s
      background-color: #ff4949
      margin: 20px 0 0
      width: 100%
      font-weight: 400
      border-radius:5px
      box-sizing:border-box
      font-size:15px
      .icon
        float:right
        cursor:pointer
</style>
