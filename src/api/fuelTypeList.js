import httpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';

export default {
    getFuelTypeList(params) {
        let result = httpClient.get(BaseUrl.GetFuelTypeList, params);

        return result;
    },
    addFuelType(params) {
        let result = httpClient.post(BaseUrl.AddFuelType, params);

        return result;
    },
    updateFuelType(params) {
        let result = httpClient.post(BaseUrl.UpdateFuelType, params);

        return result;
    },
    deleleFuelType(params) {
        let result = httpClient.post(BaseUrl.DeleteFuelType + "/" + params);

        return result;
    },
    checkFuelType(params){
        let result = httpClient.get(BaseUrl.CheckFuelType, params);

        return result;
    },
    getAllFuelType(){
        let result = httpClient.get(BaseUrl.GetAllFuelType);

        return result;
    }

}
