import httpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';

export default {
    getOilCalibrationList(params) {
        let result = httpClient.get(BaseUrl.GetOilCalibrationList, params);

        return result;
    },
    addOilCalibration(params) {
        let result = httpClient.post(BaseUrl.AddOilCalibration, params);

        return result;
    },
    updateOilCalibration(params) {
        let result = httpClient.post(BaseUrl.UpdateOilCalibration, params);

        return result;
    },
    deleleOilCalibration(params) {
        let result = httpClient.post(BaseUrl.DeleteOilCalibration + "/" + params);

        return result;
    },
    checkOilCalibration(params){
        let result = httpClient.get(BaseUrl.CheckOilCalibration, params);

        return result;
    }

}



