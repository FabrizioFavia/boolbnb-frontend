<script>


export default {
    name: 'AppFooter',
    data() {
        return {

        }
    },
}

</script>

<template>

    <div class="castomDiv py-4">

        <div class="container">
            <div class="row">
                <!-- colonna sinistra -->
                <div class="col-6 d-flex flex-wrap">

                    <div class="col-4 text-secondary text-start mt-4 px-2">
                        <h4 class="mb-3 fs-5">Society</h4>
                        <p class="mb-1 fs-6">Who we are?</p>
                        <p class="mb-1 fs-6">Open positions</p>
                        <p class="mb-1 fs-6">Invest with us</p>
                    </div>

                    <div class="col-4 text-secondary text-start mt-4 px-2">
                        <h4 class="mb-3 fs-5">Help</h4>
                        <p class="mb-1 fs-6">Terms and conditions</p>
                        <p class="mb-1 fs-6">Legal notices</p>
                        <p class="mb-1 fs-6">Cyber security</p>
                        <p class="mb-1 fs-6">Information and privacy</p>
                    </div>

                    <div class="col-4 text-secondary text-start mt-4 px-2">
                        <h4 class="mb-3 fs-5">Information</h4>
                        <p class="mb-1 fs-6">News</p>
                        <p class="mb-1 fs-6">Work with us</p>
                        <p class="mb-1 fs-6">investors</p>
                        <p class="mb-1 fs-6">Sustainability</p>
                    </div>

                </div>

                <!-- colonna destra -->
                <div class="col-6 mt-4 px-2">
                    <h4 class="px-3 pb-3 fs-5 text-secondary">About Us</h4>

                    <div class="d-flex flex-wrap align-content-center justify-content-center">
                        <div class="castomCard img1"></div>
                        <div class="castomCard img2"></div>
                        <div class="castomCard img3"></div>
                        <div class="castomCard img4"></div>
                    </div>

                </div>
            </div>
        </div>

    </div>

</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.castomDiv{
    background-color: rgb(37, 37, 37);
    // height: 500px;
}

.castomCard{
    width: 110px;
    height: 110px;
    background-size: cover;
    background-color: rgb(1, 1, 1);
    border-radius: 50%;
    margin: 5px;
}

.img1{
    background-image: url("src/assets/sonia-PhotoRoom.png-PhotoRoom.png");
}

.img2{
    background-image: url("src/assets/fabrizio-PhotoRoom.png-PhotoRoom.png");
    background-position: center left;
}

.img3{
    background-image: url("src/assets/wilmer.png");
}

.img4{
    background-image: url("src/assets/bruno.png");
    background-position: center;
}

</style>