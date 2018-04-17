import HttpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';
export default {
    addGridColumn(data){
        return HttpClient.post(BaseUrl.GridColumn, data);
    },
    getGridColumn(data){
        return HttpClient.get(BaseUrl.GridColumn + '/' + data);
    }

}
