<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>List of Expenses</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-searchbar v-model="searchText" placeholder="Search name..."></ion-searchbar>
      <ion-list>
        <ion-item v-for="expense in filteredExpenses" :key="expense.id">
          <ion-label>
            <h2>{{ expense.name }}</h2>
            <p>{{ expense.amount }} MGA | {{ expense.date }} | {{ expense.category }}</p>
          </ion-label>
          <ion-button slot="end" color="danger" @click="handleDeleteExpense(expense.id)">Delete</ion-button>
        </ion-item>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button router-link="/list/add">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
import { defineComponent } from 'vue';
import axios from '../utils/axios';
import router from '../router';

export default defineComponent({
  name: 'ListPage',
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonFab, IonFabButton, IonIcon },
  data() {
    return {
      searchText: '',
      expenses: [],
      currentUser: null
    }
  },
  computed: {
    filteredExpenses() {
      return this.expenses.filter(expense =>
          expense.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  },
  methods: {
    async getAllExpenses() {
      try {
        const res = await axios.get('/expenses');
        this.expenses = res.data;
      } catch (error) {
        console.error("Error fetching expenses:", error);
        if (error.response && error.response.status === 401) {
          this.handleUnauthorized();
        }
      }
    },
    async handleDeleteExpense(id) {
      try {
        await axios.delete(`/expenses/${id}`);
        this.getAllExpenses();
      } catch (error) {
        console.error("Error deleting expense:", error);
        if (error.response && error.response.status === 401) {
          this.handleUnauthorized();
        }
      }
    },
    setCurrentUser() {
      const user = localStorage.getItem("currentUser");
      this.currentUser = JSON.parse(user);
      if (this.currentUser == null) {
        this.handleUnauthorized();
      }
    },
    handleUnauthorized() {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      router.push("/login");
    }
  },
  mounted() {
    this.setCurrentUser();
    this.getAllExpenses();
  },
  setup() {
    return { add }
  }
});
</script>