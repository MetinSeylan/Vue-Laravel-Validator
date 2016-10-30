import Main from './main';


export default {
        install: function (Vue) {
            Vue.mixin({
                beforeCreate: function () {
                    this.$form = (new Main(this.$http)).form;
                }
            });

        }
};