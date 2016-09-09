# Vue Laravel Validator

This plugin handle laravel validation response and simple creating form and posting data.

###Usage
javascript file
``` js
import Vue from 'vue';
import VueResource from 'vue-resource';
import LaravelValidator from 'vue-laravel-validator';

Vue.use(VueResource);
Vue.use(LaravelValidator);

new Vue({
  data(){
    return {
      form: this.form({
          'user': null, // or Vuex this.user.name eg.
          'age': null,
          'email': null
      })
    }
  },
  methods:{
    sendform(){
      this.form.post('http://yourlaravel.com/api/save').then((response) => {
        console.log('success')
      }, (response) => {
        console.log('error')
      })
    }
  }
});
```
template file
``` html
<form @submit.prevent="sendForm">

  <div class="form-group" :class="{'has-danger': form.$errors.has('name')}">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name" placeholder="Name" v-model="form.$fields.name">
    <div if="form.$errors.has('name')" class="form-control-feedback">{{form.$errors.get('name')}}</div>
  </div>
  
  <div class="form-group" :class="{'has-danger': form.$errors.has('age')}">
    <label for="age">Age</label>
    <input type="text" class="form-control" id="age" placeholder="age" v-model="form.$fields.age">
    <div if="form.$errors.has('age')" class="form-control-feedback">{{form.$errors.get('age')}}</div>
  </div>
  
  <div class="form-group" :class="{'has-danger': form.$errors.has('email')}">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" placeholder="email" v-model="form.$fields.email">
    <div if="form.$errors.has('email')" class="form-control-feedback">{{form.$errors.get('email')}}</div>
  </div>
  
  <button :disabled="form.$busy" type="submit" class="btn btn-primary">Save</button>
  
</form>
```

Laravel Validation
``` php
public function save(Request $request){
  $this->validate($request, [
    'name' => 'required|min:3|max:32',
    'age' => 'required|numeric|max:99|min:18',
    'email' => 'required|email'
  ]);
}
```

## Available Properties
| Title | Type | Description |
| :------------- | :------------- | :------------- |
| `.$busy` | `Boolean` | form proccess status (use loading animation eg.)  |
| `$errors.get({input})` | `Array|String` | Get laravel response error  |
| `$errors.has({input})` | `Boolean` | get input has error  |
| `$errors.all()` | `Array|String` | get all laravel errors |
| `$fields.{input}` | `Input` | get raw input value (use in template) |
| `.post(uri)` | `string` | Vue-resource post method |
| `.put(uri)` | `string` | Vue-resource put method |
| `.delete(url)` | `string` | Vue-resource delete method |
