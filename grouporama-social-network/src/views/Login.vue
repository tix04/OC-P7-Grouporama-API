<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="8" >
          <img src="../assets/icon.png" alt="Grouporama Logo">
        </b-col>
        <b-col cols="4">
          <b-container style="margin-top: 22%;">
            <b-jumbotron>
          <!--This Section should be a different component called Login located in Components-->
              <b-form>
                <b-form-group
                id="userInput1"
                label="Username"
                label-for="username"
                >
                  <b-form-input
                  id="username"
                  type="text"
                  placeholder="Username"
                  v-on:blur="userValidation('username', 'userInput1', 'Please enter a valid Username')"
                  required
                  >
                  </b-form-input>
                  <p v-if="validUser" style="color:red;">Please enter valid Username</p>
                </b-form-group>
                <b-form-group
                id="userInput2"
                label="Password"
                label-for="password"
                >
                  <b-form-input
                  id="password"
                  type="password"
                  v-on:blur="passValidation()"
                  required
                  >
                  </b-form-input>
                  <p v-if="validPass" style="color:red">Please enter a valid Password</p>
                  <b-button type="submit" variant="primary" style="margin-top: 15px;">Submit</b-button>
                </b-form-group>
              </b-form>
            </b-jumbotron>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data () {
    return {
      username: "username1",
      password: "Pass1234",
      validUser: null,
      validPass: null
    }
  },
  methods: 
  {
    userValidation () {
      let userName = document.getElementById('username');
      
      
      if(userName.value === '' || userName.value !== this.username) {
        this.validUser = true;
      }else{
        this.validUser = false;
      }

    },
    passValidation () {
      let pwd = document.getElementById('password');

      if(pwd.value === ''  || pwd.value !== this.password) {
        this.validPass = true;
      }else{
        this.validPass = false;
      }
    }
  }
}
</script>

<style scoped>
img {
  width: 70%;
}
</style>
