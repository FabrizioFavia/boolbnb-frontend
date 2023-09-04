<script>


export default {
    name: 'Jumbotron',
    data() {
        return {

        }
    }
}
</script>

<template>
    <div id="carouselExampleSlidesOnly" class="carousel slide position-relative" data-bs-ride="carousel">
        <div class="carousel-inner castomCont">
            <div class=" carousel-item castomCont active">
                <img src="src\assets\carosel1.jpg" class="castomImg" alt="...">
            </div>
            <div class=" carousel-item castomCont">
                <img src="src\assets\carosel2.jpg" class="castomImg" alt="...">
            </div>
            <div class=" carousel-item castomCont">
                <img src="src\assets\carosel3.jpg" class="castomImg" alt="...">
            </div>
            <div class=" carousel-item castomCont">
                <img src="src\assets\carosel4.jpg" class="castomImg" alt="...">
            </div>
            <div class=" carousel-item castomCont">
                <img src="src\assets\carosel5.jpg" class="castomImg" alt="...">
            </div>
            <div class="layOver w-100 position-absolute d-flex flex-column align-items-center justify-content-center">
                <h1 class="text-white jumboText">BoolBnb</h1>
                <h2 class="text-white">Extraordinary homes, unique travels</h2>
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.castomCont {
    width: 100%;
    height: 550px;
}

.castomImg {
    width: 100%;
    height: 550px;
    object-position: center;
    object-fit: cover;
}

.layOver {
    background-color: rgba(0, 0, 0, 0.308);
    height: 100%;

    .jumboText {
        font-size: 100px;
        margin-bottom: 10px;
    }
}
</style>