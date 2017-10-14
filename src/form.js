import Error from './error';

export default class{

    constructor(fields, $http) {
        this.$fields = fields;
        this.$http = $http;
        this.$errors = new Error({});
        this.$busy = false;
    }


    post (uri, options) {
        return this.request('post', uri, options);
    }

    patch (uri, options) {
        return this.request('patch', uri, options);
    }

    put (uri, options) {
        return this.request('put', uri, options);
    }

    setBusy(status){
        this.$busy = status;
    }

    setError(errors){
        this.$errors = new Error(errors);
    }

    request (method, uri, options) {
        this.setError({});
        var vm = this;
        
        return new Promise(function (resolve, reject) {
            vm.setBusy(true);

            vm.$http[method](uri, vm.$fields, options).then((response) => {
                resolve(response);
            }, (response) => {
                if (typeof response.data.errors === "object")
                    vm.setError(response.data.errors);
                else
                    vm.setError(response.data);

                reject(response);

            }).finally(() => {
                vm.setBusy(false);
            });

        });
    }

}
