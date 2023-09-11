<script>
import AppFooter from '../components/AppFooter.vue';

export default {
    name: "AppError",
    components: {
        AppFooter
    },
    props: [
        'code'
    ],
    data() {
        return {
            errMessage: undefined,
            showAlert: false,
            errorText: "Something went wrong while attempting to load apartments data. This may be due to a temporary problem on our end. We apologize for the inconvenience. Please try again later or contact support if the issue persists."
        }
    },
    mounted() {
        this.errMessage = this.$route.query.message ?? 'Something went wrong while loading data'
    }
}
</script>
<template>
    <!-- Error Message with Custom Background -->
    <section class="bg-gray-900 h-100">
        <div class="h-100 position-relative">
            <div v-show="showAlert" class="mx-4 my-2 py-2 px-5 alert alert-danger position-absolute top-0 start-0">
                <p><strong>Error {{ code }}: {{ errMessage }}</strong></p>
                <p>{{ errorText }}</p>
            </div>
            <div class="h-100 d-flex align-items-center justify-content-evenly text-center">
                <div>
                    <h3 class="text-xl">Houston, </h3>
                    <h3 class="text-xl">we have a problem. </h3>
                    <h1 class="text-white">{{ code }}</h1>
                    <h2 class="text-xl text-center">{{ errMessage }}</h2>
                    <router-link :to="{ name: 'home' }">
                        <button class="bg-gray-900 px-3 py-1 border border-secondary rounded mt-5">
                            <i class="fa-solid fa-arrow-left"></i> GO BACK HOME
                        </button>
                    </router-link>
                    <button @click="showAlert = !showAlert"
                        class="bg-gray-900 px-3 py-1 border border-secondary rounded mt-5 ms-2">
                        {{ showAlert ? 'SHOW LESS' : 'LEARN MORE' }} <i v-show="!showAlert"
                            class="fa-solid fa-circle-info fa-sm"></i>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

section {
    &>div {
        background-image: url(../assets/goldpoints.png);
        background-size: cover;

        &>div:last-child {
            background-image: url(../assets/errorwallpaper.png);
            background-size: cover;
            background-position: bottom;

            & .text-xl {
                font-size: 1.875rem;
                line-height: 2.25rem;
            }

            & h1 {
                -webkit-text-stroke: 3px $primary-orange; // #FBAB1B;
                font-size: 11.25rem;
                letter-spacing: 0.1em;
                font-weight: 700;
            }

            & h2 {
                margin-top: -1.5rem;
                font-size: 1.3rem !important;
            }

            & h3,
            h2,
            button {
                font-weight: 700;
                color: $primary-orange; //#FBAB1B;
            }

            & h3:nth-child(2) {
                margin-bottom: -.1.5rem;
            }

            & button:hover {
                box-shadow: 0 1px 3px 0 $primary-orange, 0 1px 2px -1px $primary-orange;
            }
        }
    }
}

@media screen and (max-width: 576px) {

    section {
        & .text-xl {
            font-size: 1.25rem !important;
            line-height: 1.75rem !important;
        }

        & h1 {
            font-size: 7.5rem !important;
        }

        & h2 {
            font-size: 3rem !important;
            line-height: 1 !important;
        }
    }
}</style>