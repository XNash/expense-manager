<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>Welcome, {{ currentUser.name }}!</h1>
      <h3>Keep your expenses under control with Nasshu's Expense manager!</h3>
      <ion-button router-link="/list">Get started</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import router from '../router';

export default defineComponent({
  name: 'HomePage',
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton },
  data() {
    return {
      currentUser: {name: ''}
    }
  },
  methods: {
    setCurrentUser() {
      const user = localStorage.getItem("currentUser");
      if (user) {
        this.currentUser = JSON.parse(user);
      } else {
        router.push("/login");
      }
    }
  },
  mounted() {
    this.setCurrentUser();
  }
});
</script>