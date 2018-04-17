import HttpClient from 'utils/HttpClient';
export default {
    saveTreeConfig(param) {
        return HttpClient.post('/cartreeSet', param)
    },
    updateTreeConfig(param) {
        return HttpClient.put('/cartreeSet', param)
    },
    saveOrUpdateTreeConfig(isUpdate, param) {
        if(isUpdate) {
            return this.updateTreeConfig(param)
        } else {
            return this.saveTreeConfig(param)
        }
    },
    queryTreeConfig() {
        return HttpClient.get('/cartreeSet')
    },
    queryGridConfig() {

    }
}
