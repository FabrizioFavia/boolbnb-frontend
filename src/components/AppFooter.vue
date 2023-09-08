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

    <div class="castomDiv pt-4">

        <div class="container DivCastom">
            <div class="row">
                <!-- colonna sinistra -->
                <div class="col-12 col-lg-6 d-flex flex-wrap mb-3">

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
                <div class="col-12 col-lg-6 mt-4 px-2">
                    <h4 class="px-3 pb-3 fs-5 text-secondary">About Us</h4>

                    <div class="d-flex flex-wrap align-content-center justify-content-center">
                        <div class="castomCard img1">
                            <div class="show">
                                <a href="https://github.com/soniabergamini"><i class="fa-brands fa-github castomGit" style="color: #757474;"></i></a>
                            </div>
                        </div>
                        <div class="castomCard img2">
                            <div class="show">
                                <a href="https://github.com/FabrizioFavia"><i class="fa-brands fa-github castomGit" style="color: #757474;"></i></a>
                            </div>
                        </div>
                        <div class="castomCard img3">
                            <div class="show">
                                <a href="https://github.com/WragnarokA"><i class="fa-brands fa-github castomGit" style="color: #757474;"></i></a>
                            </div>
                        </div>
                        <div class="castomCard img4">
                            <div class="show">
                                <a href="https://github.com/BrunoCanini"><i class="fa-brands fa-github castomGit" style="color: #757474;"></i></a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="col-12 d-flex justify-content-center text-secondary pb-1 mt-5">
            <p class="smallCastom">Bool Bnb ® Copyright 2023 Bool Bnb S.r.l</p>
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
    width: 90px;
    height: 90px;
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

.castomCard:hover{
    background-image: none;

    .show{
        display: block;
    }
}

.show{
    width: 90px;
    height: 90px;
    display: none;
}

.castomGit{
    font-size: 90px;
}

.smallCastom{
    font-size: smaller;
}

.DivCastom{
    margin: auto;
}

</style>