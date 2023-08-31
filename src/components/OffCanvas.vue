<script>

export default {
    name: 'OffCanvas',
    data() {
        return {
            range: 20
        }
    },
}

</script>


<template>
    <div class="offcanvas offcanvas offcanvas-top mt-5" :offsetTop="100" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
        id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Filtra i tuoi risultati</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="container-fluid">
                <div class="row">
                    <!-- LEFT -->
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Camere</label>
                            <input type="number" class="form-control" id="exampleFormControlInput1">
                        </div>

                    </div>
                    <!-- RIGHT -->
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Posti letto</label>
                            <input type="number" class="form-control" id="exampleFormControlInput1">
                        </div>

                    </div>
                    <!-- CENTER -->
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Raggio</label>
                            <input type="range" min="20" max="1000" step="10" class="form-control"
                                id="exampleFormControlInput1" v-model="range">
                            <span>{{ range }}</span>
                        </div>
                        <div class="m-3">
                            <label for="exampleFormControlInput1" class="form-label">Servizi</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>