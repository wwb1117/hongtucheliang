import httpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';

export default {
    getLectotypeList(params) {
        let result = httpClient.get(BaseUrl.GetLectotypeList, params);

        return result;
    },
    addLectotype(params) {
        let result = httpClient.post(BaseUrl.AddLectotype, params);

        return result;
    },
    updateLectotype(params) {
        let result = httpClient.post(BaseUrl.UpdateLectotype, params);

        return result;
    },
    deleleLectotype(params) {
        let result = httpClient.post(BaseUrl.DeleteLectotype + "/" + params);

        return result;
    },
    checkLectotype(params){
        let result = httpClient.get(BaseUrl.CheckLectotype, params);

        return result;
    }

}

