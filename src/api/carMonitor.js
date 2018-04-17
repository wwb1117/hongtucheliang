import httpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';

export default {
    carTreeSearInput(data) {
        return httpClient.get(BaseUrl.CarTreeSearInput, data);
    },
    carTreeNodePath(data){
        return httpClient.get(BaseUrl.CarTreeGetPath, data);
    },
    getCarTreeStateAndNum(data){
        return httpClient.get(BaseUrl.GetCarTreeStateAndNum, data);
    },
    getCarTreeShowSetting(data){
        return httpClient.get(BaseUrl.GetCarTreeSetting, data);
    }
}
