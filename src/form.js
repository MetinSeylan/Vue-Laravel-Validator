import Error from './error';

export default class{

    constructor(fields, $http) {
        this.$fields = fields;
        this.$http = $http;
        this.$errors = new Error({});
        this.$busy = false;
    }


    post (uri) {
        return this.request('post', uri);
    }


    put (uri) {
        return this.request('put', uri);
    }


    delete(uri) {
        return this.request('delete', uri);
    }

    setBusy(status){
        this.$busy = status;
    }

    setError(errors){
        this.$errors = new Error(errors);
    }

    request (method, uri) {

        var vm = this;

        return new Promise(function (resolve, reject) {
            vm.setBusy(true);

            vm.$http[method](uri, vm.$fields).then((response) => {
                resolve(response);
            }, (response) => {

                vm.setError(response.data);

                reject(response);

            }).finally(() => {
                vm.setBusy(false);
            });

        });
    }

}