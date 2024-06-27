<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form @submit.prevent="login">
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="loginCredentials.email" type="email" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="loginCredentials.password" type="password" required></ion-input>
        </ion-item>
        <ion-button type="submit" expand="block">Login</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from '../utils/axios';
import router from '../router';

export default defineComponent({
  name: 'LoginPage',
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton },
  data() {
    return {
      loginCredentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("/login", this.loginCredentials);
        const {token, user} = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("currentUser", JSON.stringify(user));

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        router.push("/");
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  }
});
</script>