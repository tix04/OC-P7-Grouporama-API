<template>
<b-container>
    <b-jumbotron>
        <HelloUser msg="Welcome to Grouporama Chat" />
        <p>You have <span>7</span> new Posts.</p>
        <!--Figure out Logic to determine which posts you haven't seen-->
    </b-jumbotron>
</b-container>
</template>

<script>
import HelloUser from "../components/HelloUser.vue"
export default {
    name: "Home",
    components: {
        HelloUser
    }
}
</script>

<style scoped>

</style>