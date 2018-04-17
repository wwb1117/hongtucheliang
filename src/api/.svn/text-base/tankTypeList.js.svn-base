import httpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';

export default {
    getTankTypeList(params) {
        let result = httpClient.get(BaseUrl.GetTankTypeList, params);

        return result;
    },
    addTankType(params) {
        let result = httpClient.post(BaseUrl.AddTankType, params);

        return result;
    },
    updateTankType(params) {
        let result = httpClient.post(BaseUrl.UpdateTankType, params);

        return result;
    },
    deleleTankType(params) {
        let result = httpClient.post(BaseUrl.DeleteTankType + "/" + params);

        return result;
    },
    checkTankType(params){
        let result = httpClient.get(BaseUrl.CheckTankType, params);

        return result;
    },
    getAllTankType(){
        let result = httpClient.get(BaseUrl.GetAllTankType);

        return result;
    }

}


