<template>
    <div class="jumbotron">
        <form action="">
            <label for="userName" class="form-label">Username</label><br/>
            <input type="text" class="form-control" placeholder="UserName"><br/>
            <label for="password" class="form-label">Password</label><br/>
            <input type="text" class="form-control" placeholder="Password"><br/>
            <button type="submit" class="btn btn-primary">Submit</button> <button class="btn btn-basic">Reset</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "Login"
}
</script>