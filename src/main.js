import Form from './form';

export default class{

    constructor($http) {
        this.$http = $http;
    }

    form(fields) {
        return (new Form(fields, this.$http));
    }

}