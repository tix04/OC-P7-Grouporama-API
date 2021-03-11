<template>
    <div>
        <b-container style="width: 50%;">
            <b-form>
                <b-form-group
                id="userInput1"
                label="First Name: "
                label-for="fName"
                >
                    <b-form-input
                    id="fName"
                    type="text"
                    placeholder="For eg. John"
                    required
                    >
                    </b-form-input>
                    <p v-if="validInput" style="color:red;">Please only use Alphabetic Characters and no Space</p>
                </b-form-group>
                <b-form-group
                id="userInput2"
                label="Last Name: "
                label-for="lName"
                >
                    <b-form-input
                    id="lName"
                    type="text"
                    placeholder="For eg. Smith"
                    required
                    >
                    </b-form-input>
                    <p v-if="validInput" style="color:red;">Please only use Alphabetic Characters and no Space</p>
                </b-form-group>
                <b-form-group
                id="userInput3"
                label="Age: "
                label-for="age"
                >
                    <b-form-input
                    id="age"
                    type="number"
                    required
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                id="userInput4"
                label="Email Address: "
                label-for="email"
                >
                    <b-form-input
                    id="email"
                    type="email"
                    placeholder="For eg. xyz@mail.com"
                    required
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                id="userInput5"
                label="Username: "
                label-for="username"
                >
                    <b-form-input
                    id="username"
                    type="text"
                    placeholder="Enter your new username"
                    required
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                id="userInput6"
                label="Password: "
                label-for="password"
                >
                    <b-form-input
                    id="password"
                    type="password"
                    required
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                id="userInput7"
                label="Confirm your Password: "
                label-for="pwdConfirmation"
                >
                    <b-form-input
                    id="pwdConfirmation"
                    type="password"
                    required
                    >
                    </b-form-input>
                </b-form-group>
                <b-button type="submit" variant="success">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
        </b-container>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            age: '',
            email: '',
            username: '',
            password: ''
        }
    },
   methods:
   {
       textValidation(id) {
           let inputField = document.getElementById(id);
           let validInput = null;
           let regex = /^[a-zA-Z]+$/;
           if(inputField.value === '' || !regex.test(inputField.value)) {
               return true;
           }
       }
   }
}
</script>
<style>
label {
    text-align: left;
    font-weight: bold;
}

.form-control {
    border: 1px solid #bbb;
}

.btn {
    margin: 0 1rem 0 1rem;
}
</style>