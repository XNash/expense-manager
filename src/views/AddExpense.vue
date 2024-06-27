<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add a new expense</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form @submit.prevent="handleAddExpense">
        <ion-item>
          <ion-label position="floating">Expense name</ion-label>
          <ion-input v-model="newExpense.name" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Amount</ion-label>
          <ion-input v-model="newExpense.amount" type="number" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Category</ion-label>
          <ion-input v-model="newExpense.category"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Description</ion-label>
          <ion-textarea v-model="newExpense.description"></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Date</ion-label>
          <ion-datetime v-model="newExpense.date" display-format="YYYY-MM-DD" picker-format="YYYY-MM-DD"></ion-datetime>
        </ion-item>
        <ion-button type="submit" expand="block">Add expense</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonDatetime, IonTextarea, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from '../utils/axios';
import router from '../router';

export default defineComponent({
  name: 'AddExpense',
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonDatetime, IonTextarea, IonButton },
  data() {
    return {
      newExpense: {
        name: '',
        amount: 0,
        date: new Date().toISOString(),
        category: '',
        description: ''
      }
    }
  },
  methods: {
    async handleAddExpense() {
      try {
        await axios.post('/expenses', this.newExpense);
        router.push("/list");
      } catch (error) {
        console.error("Error adding expense:", error.response ? error.response.data : error.message);
      }
    }
  }
});
</script>