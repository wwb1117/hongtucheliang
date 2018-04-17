import HttpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';
export default {
    saveCar(data){
        return HttpClient.post(BaseUrl.CarManege, data);
    },
    checkCarFiled(data){
        return HttpClient.post(BaseUrl.CheckCar, data);
    },
    updateCar(data){
        return HttpClient.put(BaseUrl.CarManege, data);
    },
    deleteCar(data){
        return HttpClient.post(BaseUrl.DeleteCar, data);
    },
    getCarList(data){
        return HttpClient.post(BaseUrl.GetCarList, data);
    },
    getOrgTree(){
        return HttpClient.get(BaseUrl.GetOrgTree);
    },
    checkOrgName(data){
        return HttpClient.get(BaseUrl.CheckOrgName, data);
    },
    saveOrg(data){
        return HttpClient.post(BaseUrl.Org, data);
    },
    updateOrg(data){
        return HttpClient.put(BaseUrl.Org, data);
    },
    deleteOrg(data){
        return HttpClient.delete(BaseUrl.DeleteOrg + '/' + data);
    },
    getOrgInfoByUuid(data){
        return HttpClient.get(BaseUrl.GetOrgInfo + '/' + data);
    },
    importSave(){
        return HttpClient.post(BaseUrl.SaveImportData);
    },
    counEditSave(){
        return HttpClient.put(BaseUrl.SaveCountEditData);
    },
    startCar(data){
        return HttpClient.post(BaseUrl.StartCar, data);
    },
    stopCar(data){
        return HttpClient.post(BaseUrl.StopCar, data);
    }



}
