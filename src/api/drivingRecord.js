import HttpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';

export default {
    selectSearchEvent(data) {
        return HttpClient.get(BaseUrl.SelectSearchEvent, data)
    },
    getDrivingRecordList(data) {
        return HttpClient.post(BaseUrl.GetDrivingRecordList, data)
    },
    searchDataTypeList(data) {
        return HttpClient.get(BaseUrl.SearchDataTypeList, data)
    }
}

