<script>
export default {
    name: 'MainApartmentCard',
    props: {
        apartment: Object,
        sponsored: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<template>
    <!-- Apartment Card -->

    <div class="apartment-card position-relative overflow-hidden rounded text-start">
        <router-link :to="{ name: 'show-apartments', params: { id: apartment.id } }">
            <!-- On Click Redirect to Route 'show-apartments' -->

            <img :src='"http://localhost:8000/storage/" + apartment.image' :alt="apartment.name"
                class="card-image w-100 h-100 position-absolute top-0 start-0">
            <div v-show="sponsored || (apartment.sponsorships && apartment.sponsorships.length > 0)" class="sponsored rounded position-absolute text-white px-2 start-0 top-0">
                <i class="fa-solid fa-medal me-1"></i>
                <span>BEST CHOICE</span>
            </div>

            <!-- Retractable Overlay -->
            <div class="overlay position-absolute bottom-0 text-white p-4">
                <h2 class="title mb-2 w-100">{{ apartment.name }}</h2>
                <div class="post-date mb-2 text-white-50">{{ apartment.address }}</div>
                <div class="details-overlay">
                    <p class="fw-light">{{ apartment.description }}</p>
                    <p>€ {{ apartment.price }}</p>

                    <!-- On Click Redirect to Route 'show-apartments' -->

                    <button
                        class="btn bg-dark text-white-50 rounded read-more px-2 py-1 mt-2 text-decoration-none border border-secondary ms-auto d-block position-relative">READ
                        MORE <i class="fas fa-long-arrow-alt-right position-relative"></i>
                    </button>
                </div>
            </div>
        </router-link>
    </div>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.sponsored {
    background-color: rgba(128, 128, 128, 0.565) !important;

    &>span {
        font-size: 0.8rem;
    }

    &>i {
        color: #e6bd37;
    }
}

a {
    text-decoration: none;
}

.apartment-card {
    width: 30%;
    height: 20rem;
    box-shadow: 0 0 1rem #f9923d77;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);

    & .card-image {
        object-fit: cover;
        transition: transform 3s ease;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        z-index: -1;
    }

    & .overlay {
        transition: background-color 1.5s ease;
        background-color: rgba(0, 0, 0, 0.466);
    }

    & .title {
        transition: color 1s ease;
    }

    & .post-date {
        font-size: .7rem;
    }

    &:hover .overlay {
        background-color: rgba(0, 0, 0, 0.636);
    }

    & .details-overlay {
        max-height: 0;
        opacity: 0;
        transition: max-height 1.5s ease, opacity 1s ease;

        & p {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }

    &:hover .details-overlay {
        max-height: 20rem;
        opacity: 1;

    }

    &:hover .title {
        color: $light-orange;
    }

    &:hover .card-image {
        transform: scale(1.2);
    }

    &:hover .read-more {
        color: $light-blue !important;
    }

    & .read-more {
        font-size: 0.8rem;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        z-index: 5;
        transition: color 3s ease;

        i {
            left: 0.1rem;
            transition: left 0.5s ease, color 0.6s ease;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
        }

        &:hover i {
            left: 0.4rem;
            color: $light-blue;
        }
    }
}

/**************** MEDIA QUERY *****************/  

@media (min-width: 1200px) {
    .apartment-card {
        min-width: 290px;
    }
}

@media (max-width: 1199px) {
    .apartment-card {
        width: 400px;
    }
}

@media (max-width: 992px) {
    .apartment-card {
        width: 45%;
    }
}

@media (max-width: 768px) {
    .apartment-card {
        min-width: 44%;
    }
}

@media (max-width: 576px) {
    .apartment-card {
        width: 90%;
    }
}
</style>