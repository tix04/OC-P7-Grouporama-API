<template>
    <div>
        <b-container>
            <div>

                <!--<h3>User Information</h3>-->
                <b-card no-body class="overflow-hidden" style="max-width: 900px;margin: 0 auto 25px auto;">
                    <b-row no-gutters>
                        <b-col md="6">
                            <!--<b-card-img src="../assets/default-user-image.png" alt="User Profile Picture" class="rounded-0">
                            </b-card-img>-->
                            <img src="../assets/default-user-image.png" alt="User Profile Picture">
                        </b-col>
                        <b-col md="6">
                            <b-card-body title="User Information">
                                <b-card-text><b>First Name</b>: User First Name</b-card-text>
                                <b-card-text><b>Last Name</b>: User Last Name</b-card-text>
                                <b-card-text><b>Age</b>: User Age</b-card-text>
                                <b-card-text><b>Gender</b>: User Gender</b-card-text>
                                <b-card-text><b>Email</b>: User Email</b-card-text>
                            </b-card-body>
                        </b-col>
                        <!---->
                    </b-row>
                </b-card>
                <b-button variant="outline-success">Update</b-button>
                <b-button variant="danger">Delete Account</b-button>
            
            </div>
        </b-container>
    </div>
</template>

<style scoped>
button {
    margin: 0 5px;
}

img {
    width: 300px;
    float: left;
}
</style>