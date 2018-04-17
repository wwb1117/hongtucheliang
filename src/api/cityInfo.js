import HttpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';
export default {
    getProvincesList(){
        return HttpClient.get(BaseUrl.GetProvincesList);
    },
    getCityList(){
        return HttpClient.get(BaseUrl.GetCityList);
    },
    getCityFormPro(data){
        return HttpClient.get('/province/' + data + '/cities');
    }


}
