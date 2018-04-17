import HttpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';

export default {
    // 获取表格数据
    getVehicleTabList(data) {
        return HttpClient.get(BaseUrl.GetVehicleTabList, data)
    },
    addVehicle(data) {
        return HttpClient.post(BaseUrl.AddVehicle, data)
    },
    vehicleDeleteTableData(data) {
        return HttpClient.post(BaseUrl.VehicleDeleteTableData, data)
    },
    updateVehicle(data) {
        return HttpClient.put(BaseUrl.UpdateVehicle, data)
    },
    // 零部件配置
    getPartsSetTabList(data) {
        return HttpClient.get(BaseUrl.GetPartsSetTabList, data)
    },
    partsAddVehicle(data) {
        return HttpClient.post(BaseUrl.PartsAddVehicle, data)
    },
    partsEditVehicle(data) {
        return HttpClient.put(BaseUrl.PartsAddVehicle, data)
    },
    partsImportSaveVehicle() {
        return HttpClient.post(BaseUrl.PartsImportSaveVehicle)
    },
    partsVehicleDeleteTableData(data) {
        return HttpClient.post(BaseUrl.PartsVehicleDeleteTableData, data)
    },
    getIconList(){
        return HttpClient.get(BaseUrl.IconList)
    },
    deleteIcon(data){
        return HttpClient.post(BaseUrl.deleteIcon, data)
    }

}
