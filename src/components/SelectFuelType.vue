<template>
    <el-select filterable placeholder="请选择" size="small">
        <el-option v-for="fuelType in fuelTypeList" :key="fuelType.id" :label="fuelType.typeName" :value="fuelType.id">
        </el-option>
    </el-select>
</template>

<script>
import FuelTypeApi from 'api/fuelTypeList'
export default {
    data() {
        return{
            //燃油类型列表
            fuelTypeList:[]
        }
    },
    methods:{
        //获取燃料类型
        getFuelTypeList(){
            FuelTypeApi.getAllFuelType().then(response => {
                if (response.code === 200) {
                    this.fuelTypeList = response.data;
                }
            }).catch(error => {
                console.log(error)
            });
        }
    },
    created(){
        this.getFuelTypeList()
    }
}
</script>
