<script>
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: "ContactForm",
    data() {
        return {
            requestData: { apartment_id: '', user_mail: '', text: '' },
            loading: false,
            errors: [],
            success: false,
            failure: false
        }
    },
    // Get Auth User Email from API Call
    created() {
        axios.get(import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_AUTH_EMAIL_API_PATH)
            .then(response => this.requestData.user_mail = response.data.email)
            .catch(err => console.error('Contact Request GET AUTH MAIL API Failure. ', err));
    },
    watch: {
        // Immediately Sets Failure False When Success Becomes True
        success() {
            if (this.success) {
                this.failure = false
            }
        }
    },
    methods: {
        // Send New Message with API
        sendForm() {
            this.loading = true;
            this.errors = [];
            this.success = false;
            this.requestData.apartment_id = this.$route.params.id;
            console.log('requestData before api call: ', this.requestData)

            axios.post(import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_CONTACT_API_PATH, this.requestData).then((response) => {
                this.loading = false;
                if (!response.data.success) {
                    this.errors = response.data.errors;
                    console.error('Contact Request POST API Failure.');
                    setTimeout(() => this.errors = [], 1 * 5000);
                } else {
                    this.success = true;
                    this.requestData = { apartment_id: '', user_mail: '', text: '' },
                        setTimeout(() => this.success = false, 1 * 5000);
                }
            }).catch(err => {
                this.loading = false,
                    this.failure = true,
                    setTimeout(() => this.failure = false, 1 * 5000),
                    console.error('Contact Request POST API Failure. ', err)
            })
        }
    }
}

</script>

<template>
    <!-- Apartment Contact Form -->
    <div class="col-12 col-lg-5 d-flex justify-content-center align-content-center py-5">
        <div class="message-box">
            <h2>Contact Host</h2>
            <form @submit.prevent="sendForm()">

                <!-- Email -->
                <div class="user-box text-white">
                    <input type="email" name="user_mail" id="user_mail" required min="5"
                        :class="{ 'is-invalid': errors.user_mail }" v-model="requestData.user_mail">
                    <label for="user_mail">Email</label>
                    <div class="invalid-feedback">
                        <template v-for="error in errors.user_mail">
                            <span>{{ error }}. </span>
                        </template>
                    </div>
                </div>

                <!-- Message -->
                <div class="user-box">
                    <textarea class="formCustom" name="text" id="text" cols="30" rows="5" required min="5"
                        v-model="requestData.text" :class="{ 'is-invalid': errors.text }"
                        placeholder="Write here your message...."></textarea>
                    <div class="invalid-feedback">
                        <template v-for="error in errors.text">
                            <span>{{ error }}. </span>
                        </template>
                    </div>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="btn" :disabled="loading">{{ loading ? 'SENDING...' : 'SEND' }}</button>

                <!-- Confirmation Message -->
                <p class="text-success text-sm mt-3" v-if="success">Your message has been successfully sent!</p>
                <p class="text-danger text-sm mt-3" v-if="failure">Something went wrong while sending your message</p>

            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../style.scss' as *;

.text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
}

.message-box {
    width: 400px;
    padding: 40px;
    // background-color: #F9913D;
    background: rgb(245,55,50);
    background: linear-gradient(57deg, rgba(245,55,50,1) 1%, rgba(242,93,52,1) 36%, rgba(254,155,57,1) 84%);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
    border-radius: 10px;
    transition: all .8s ease-in-out;

    &:hover {
        -webkit-box-shadow: 0px 7px 50px 11px rgba(24, 24, 24, 0.465) !important;
        box-shadow: 0px 3px 50px 10px rgba(24, 24, 24, 0.465) !important;
    }
}

.message-box h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
}

.message-box .user-box {
    position: relative;
}

.message-box .user-box input{
    width: 100%;
    padding: 10px 0;
    font-size: 18px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
}

.message-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
}

.message-box .user-box input:focus~label,
.message-box .user-box input:valid~label {
    top: -20px;
    left: 0;
    color: white;
    font-size: 12px;
}

.message-box form button {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    // color: #03e9f4;
    color: white;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px
}

.message-box button:hover {
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px white,
        0 0 25px white,
        0 0 50px white,
        0 0 100px white;
}

.message-box button span {
    position: absolute;
    display: block;
}

.message-box button span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
    0% {
        left: -100%;
    }

    50%,
    100% {
        left: 100%;
    }
}

.message-box button span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: btn-anim2 1s linear infinite;
    animation-delay: .25s
}

@keyframes btn-anim2 {
    0% {
        top: -100%;
    }

    50%,
    100% {
        top: 100%;
    }
}

.message-box button span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: btn-anim3 1s linear infinite;
    animation-delay: .5s
}

@keyframes btn-anim3 {
    0% {
        right: -100%;
    }

    50%,
    100% {
        right: 100%;
    }
}

.message-box button span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: btn-anim4 1s linear infinite;
    animation-delay: .75s
}

@keyframes btn-anim4 {
    0% {
        bottom: -100%;
    }

    50%,
    100% {
        bottom: 100%;
    }
}

.formCustom {
    width: 100%;
    padding: 10px 0;
    font-size: 18px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
}

textarea::placeholder{
    color: white;
}
</style>