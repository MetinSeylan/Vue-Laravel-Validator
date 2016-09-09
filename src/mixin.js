import Main from './main';


export default {
        install: function (Vue) {
            Vue.mixin({
                init: function () {
                    this.$form = (new Main(this.$http)).form;
                }
            });

        }
};