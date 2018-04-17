import HttpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';

export default {
    getUserList(data) {
        return HttpClient.get(BaseUrl.UserManegeList, data)
    },
    getOrgTreeData(data){
        return HttpClient.get(BaseUrl.GetUserOrgTree, data)
    },
    getUserOrgCarInfo(data){
        return HttpClient.get('/user/orgcar' + '/' + data)
    },
    editUserPwd(data){
        return HttpClient.put(BaseUrl.EditUsePwd, data)
    },
    saveAddUser(data) {
        return HttpClient.post(BaseUrl.UserManege, data)
    },
    updateUser(data) {
        return HttpClient.put(BaseUrl.UserManege, data)
    },
    checkLoginName(data){
        return HttpClient.get('/user/loginName/' + data)
    },
    checkUserName(data){
        return HttpClient.get('/user/userName/' + data)
    },
    deleteUser(data){
        return HttpClient.post('/user/batch', data)
    }

}
