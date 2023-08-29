<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            prova: "dato",
        }
    },
}
</script>

<template>
    <nav class="navbar bg-white">
        <div class="container">
            <a class="navbar-brand"><img class="navLogo" src="../assets/logo2.jpeg" alt=""></a>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </nav>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;


.navLogo{
    height: 80px;
}
</style>

