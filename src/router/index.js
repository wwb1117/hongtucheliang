import Vue from 'vue'
// import store from 'store'
import base from 'utils/base'
import Router from 'vue-router'
import Home from 'views/home/Home'
import Main from 'views/home/Main'
import Login from 'views/login/Index'
//import UserList from "views/user/UserList"
import MenuList from "views/menu/MenuList"
import LogList from "views/log/LogList"
import ScanAddCar from "views/scanAddCar/Index"
import DepartmentList from "views/department/departmentList"
import LandDetection from "views/landDetection/LandDetection"
import carManage from "views/baseInfo/carManage/carManage"
import roleManage from "views/baseInfo/roleManage/roleManage"
import userManage from "views/baseInfo/userManage/userManage"
// import DetectionItem from "views/detectionItem/DetectionItem"
import terminalManage from 'views/baseInfo/terminalManage/terminalManage'
import vehicleManage from 'views/baseInfo/vehicleManage/vehicleManage'
import carMonitor from 'views/baseInfo/carMonitor/carMonitor'
import drivingRecord from 'views/drivingRecord/drivingRecord'
// import RoleList from "views/role/RoleList"
import GenarateCode from "views/demo/GenarateCode"
import Demo from "views/demo/Demo"
import FuelTypeList from "views/fueltype/FuelTypeList"
import OilTypeList from "views/oilType/OilTypeList"
import TankTypeList from "views/tankType/TankTypeList"
import CarLectotypeList from "views/carLectotype/CarLectotypeList"
import OilCalibrationList from "views/oilCalibration/OilCalibrationList"
import CheckPlan from "views/checkPlan/checkPlan"


Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {path:'/login', component:Login},
        {path:'/genarateCode', component:GenarateCode},
        {path:'/demo', component:Demo},
        {
            path:'/',
            name:'home',
            component:Home,
            children: [
                {name: "首页", path: '/main', component: Main},
                // {name: "车辆管理", path: '/carManage', component: CarManage},
              //  {name: "用户列表页", path:'/userList', component:UserList},
                {name: "部门列表页", path:'/departmentList', component:DepartmentList},
                // {name: "角色列表页", path:'/roleList', component:RoleList},
                {name: "菜单列表页", path:'/menuList', component:MenuList},
                {name: "日志列表页", path:'/logList', component:LogList},
                {name: "扫描加车", path:'/scanAddCar', component:ScanAddCar},
                {name: "下线检测", path:'/landDetection', component:LandDetection},
                {name: "车辆管理", path:'/carManage', component:carManage},
                { name: "角色管理", path: '/roleManage', component: roleManage },
                { name: "用户管理", path: '/userManage', component: userManage },
                { name: '终端管理', path: '/terminalManage', component: terminalManage},
                { name: '车型管理', path: '/vehicleManage', component: vehicleManage},
                { name: '行车记录查询', path: '/drivingRecord', component: drivingRecord},
                // {name: "检测项维护", path:'/detectionItem', component:DetectionItem},

                { name: '车辆监控', path: '/carMonitor', component: carMonitor},

				{name: "检测项方案维护", path:'/checkPlan', component:CheckPlan},
                {name: "燃料类型维护", path:'/fuelTypeList', component:FuelTypeList},
                {name: "油感类型维护", path:'/oilTypeList', component:OilTypeList},
                {name: "油箱类型维护", path:'/tankTypeList', component:TankTypeList},
                {name: "车辆选型维护", path:'/carLectotypeList', component:CarLectotypeList},
                {name: "油感标定值维护", path:'/oilCalibrationList', component:OilCalibrationList}
            ]
        }

    ]
})

/*eslint-disable callback-return*/
router.beforeEach((to, from, next) => {
    // 登录拦截
    if(sessionStorage.getItem('user')){
        next();
    }else if(to.fullPath == '/login'){
        next();
        var timerArr1 = base.timerArr

        for(var item1 of timerArr1){
            if(item1){
                clearInterval(item1)
            }
        }
    }else{
        next({ path: '/login' })
        var timerArr = base.timerArr

        for(var item of timerArr){
            if(item){
                clearInterval(item)
            }
        }

    }
})

export default router
