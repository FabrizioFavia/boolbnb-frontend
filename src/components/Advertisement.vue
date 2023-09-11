<script>

export default{
    name: 'Advertisement',
    data() {
        return {
            variable: 'prova'
        }
    },
    methods: {
    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    },
  },
  mounted() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3, // Il valore di soglia indica quando attivare l'animazione (0.5 = quando almeno il 50% dell'elemento è visibile)
    };

    const leftColumnObserver = new IntersectionObserver(this.handleIntersection, options);
    leftColumnObserver.observe(this.$refs.leftColumn);

    const rightColumnObserver = new IntersectionObserver(this.handleIntersection, options);
    rightColumnObserver.observe(this.$refs.rightColumn);
  },
}

</script>

<template>
    <div class="container my-5">
        <div class="row mb-4">
            <div class="leftCol col-xl-6 col-lg-7 col-md-12 col-sm-12 py-3 animate-left"  ref="leftColumn">
                <h2 class="advertText mb-4 mt-5">
                    Want to earn More? Host with Ease.
                </h2>
                <h3 class=" d-inline">Register Your Apartment</h3>
                <h3 class="d-inline ps-2"><a class="text-decoration-none orangeText" href="http://localhost:8000/register">Now!</a></h3>
            </div>
            <div class="col-xl-5 col-lg-4 col-md-12 col-sm-12 mt-5 animate-right"  ref="rightColumn">
                <img class="advImage w-100 h-100 mt-1 rounded rounded-3 object-fit-cover" src="src/assets/host.jpg" alt="Host image">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'src/style.scss' as *;

.advertText{
    font-size: 60px;
    padding: 20px 130px;
}

.orangeText{
    color: $primary-orange;
}


/* ANIMAZIONE */
 .animate-right {
  opacity: 0;
  transform: translateX(+100px); 
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.animate-left{
    opacity: 0;
  transform: translateX(-100px); 
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.animate-left.animated, .animate-right.animated {
  opacity: 1;
  transform: translateX(0);
}

/* MEDIA QUERY */

@media only screen and (max-width: 765px) {
  .advertText{
    font-size: 40px;
    padding: 20px 60px;
    margin-top: 0 !important;
  }
}

@media only screen and (max-width: 576px) {
  .advertText{
    font-size: 35px;
    margin-top: 0 !important;
  }

  .leftCol{
    padding-top: 0;
  }

  .advImage{
    width: 90% !important;
    margin: 0 auto;
  }
}



</style>