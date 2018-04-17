<template>
    <div class="col-sm-12">
        <div class="thumbnail" v-if="carHisList.length > 0">
            <ul class="border cf" style="margin-top:10px;">
                <transition-group name="list-complete">
                    <li class="col-lg-3 col-md-6 col-sm-12 list-complete-item" v-for="rencentCarInfo in carHisList" v-bind:key="rencentCarInfo.id">
                        <a class="cell cf">
                            <div class="title">最新录入时间：{{rencentCarInfo.updateTime}}</div>
                            <p class="list-group">
                                <span class="">VIN码：</span>
                                <span class="text-muted text-ellipsis1">
                                    {{rencentCarInfo.vin}}
                                </span>
                            </p>
                            <p class="list-group">
                                <span class="">终端号：</span>
                                <span class="text-muted text-ellipsis1">
                                    {{rencentCarInfo.terminal}}
                                </span>
                            </p>
                            <p class="list-group">
                                <span class="">燃料类型：</span>
                                <span class="text-muted text-ellipsis1">

                                </span>
                            </p>
                            <div class="list-group">
                                <span class="">锁车功能：</span>
                                <span class="text-muted text-ellipsis1" v-if="rencentCarInfo.lockFlag==1">
                                    不具备
                                </span>
                                <span class="text-muted text-ellipsis1" v-if="rencentCarInfo.lockFlag==0">
                                    具备
                                </span>
                            </div>
                        </a>
                        <p class="desc">
                            <a class="text">
                                <div class="form-group">
                                    <div class="col-sm-12" style="margin-bottom:5px;">
                                        <input type="text" class="form-control" v-model="rencentCarInfo.vin" readonly>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-sm-12" style="margin-bottom:5px">
                                        <input type="text" class="form-control" v-model="rencentCarInfo.terminal" placeholder="请扫入终端号" readonly>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-sm-12" style="margin-bottom:5px">
                                            <select name="account" class="form-control" v-model="rencentCarInfo.fuelType">
                                                <option v-for="fuelType in fuelTypeList" v-bind:value="fuelType.id">
                                                    {{fuelType.typeName}}
                                                </option>
                                            </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-sm-12" style="margin-bottom:5px">
                                            <select name="account" class="form-control" v-model="rencentCarInfo.oilType">
                                                <option v-for="oilType in oilTypeList" v-bind:value="oilType.id">{{oilType.name}}</option>
                                            </select>
                                    </div>
                                    <div class="col-sm-12">
                                            <select name="account" class="form-control" v-model="rencentCarInfo.tankType">
                                                <option v-for="tankType in tankTypeList" v-bind:value="tankType.id">{{tankType.typeDescription}}</option>
                                            </select>
                                    </div>

                                    <div class="col-sm-12">
                                        <div class="radio">
                                            <label class="i-checks">
                                                <input type="radio" id="lockFlag0" value="0" v-model="rencentCarInfo.lockFlag">
                                                <i></i>
                                                具备
                                            </label>
                                            <label class="i-checks">
                                                <input type="radio" id="lockFlag1" value="1" v-model="rencentCarInfo.lockFlag">
                                                <i></i>
                                                不具备
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <button type="button" class="btn btn-primary" @click="updata(rencentCarInfo)">提 交</button>
                                    </div>
                                </div>
                            </a>
                        </p>
                    </li>
                </transition-group>
            </ul>
        </div>
    </div>
</template>
<script>
  import CarManageApi from 'api/carManage'

  export default {
      props:["carHisList", "fuelTypeList", "oilTypeList", "tankTypeList"],
      methods:{
          updata:function(carInfo){
              let params = {}

              params.fuelType = carInfo.fuelType
              params.oilType = carInfo.oilType
              params.tankType = carInfo.tankType
              params.id = carInfo.id
              CarManageApi.updateCar(params).then(response =>{

                  if (response.code === 200) {
                      this.$message.success("更新车辆信息成功！")
                  } else {
                      this.$message.error("更新车辆信息失败！")
                  }
              }).catch(error => {
                  this.$message.error("更新车辆信息异常！")
                  console.log(error)
              });
          }
      }
  }
</script>
