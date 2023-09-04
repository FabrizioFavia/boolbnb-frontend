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

        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner castomCont">
                <div class=" carousel-item castomCont active">
                    <img src="src\assets\carosel1.jpg" class="castomImg" alt="...">
                </div>
                <div class=" carousel-item castomCont">
                    <img src="src\assets\carosel2.jpg" class= "castomImg" alt="...">
                </div>
                <div class=" carousel-item castomCont">
                    <img src="src\assets\carosel3.jpg" class= "castomImg" alt="...">
                </div>
                <div class=" carousel-item castomCont">
                    <img src="src\assets\carosel4.jpg" class= "castomImg" alt="...">
                </div>
                <div class=" carousel-item castomCont">
                    <img src="src\assets\carosel5.jpg" class= "castomImg" alt="...">
                </div>
            </div>
        </div>



</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.castomCont{
    width: 100%;
    height: 550px;
}

.castomImg{
    width: 100%;
    height: 550px;
    object-position: center;
    object-fit: cover;
}
</style>