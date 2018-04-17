import HttpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';
export default {
    getCheckPlanList(param) {
        return HttpClient.get(BaseUrl.GetCheckPlanList, param)
    },
    getCheckItems(){
        return HttpClient.get(BaseUrl.GetCheckItems);
    },
    saveCheckPlans(data) {
        return HttpClient.post(BaseUrl.SaveCheckPlans, data);
    },
    deleteCheckPlans(data){
        return HttpClient.get(BaseUrl.DeleteCheckPlans, data);
    },
    updateCheckPlans(data){
        return HttpClient.post(BaseUrl.UpdateCheckPlans, data);
    },
    getCheckPlanByUser(){
        return HttpClient.get(BaseUrl.GetCheckPlanByUser)
    }
}
