import httpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';

export default {
    getOilTypeList(params) {
        let result = httpClient.get(BaseUrl.GetOilTypeList, params);

        return result;
    },
    addOilType(params) {
        let result = httpClient.post(BaseUrl.AddOilType, params);

        return result;
    },
    updateOilType(params) {
        let result = httpClient.post(BaseUrl.UpdateOilType, params);

        return result;
    },
    deleleOilType(params) {
        let result = httpClient.post(BaseUrl.DeleteOilType + "/" + params);

        return result;
    },
    checkOilType(params){
        let result = httpClient.get(BaseUrl.CheckOilType, params);

        return result;
    },
    getAllOilType(){
        let result = httpClient.get(BaseUrl.GetAllOilType);

        return result;
    }
}
