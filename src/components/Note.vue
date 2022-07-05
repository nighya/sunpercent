<template>
  <v-card>
    <v-tabs color="deep-purple accent-4" right>
      <v-tab>쪽지보내기</v-tab>
      <v-tab>받은쪽지</v-tab>
      <v-tab>보낸쪽지</v-tab>

      <v-tab-item v-for="n in 3" :key="n">
        <v-container fluid>
          <v-row>
            <v-col>
              <h1 v-if="n == 1">1번텝</h1>
              <h1 v-if="n == 2">2번텝</h1>
              <h1 v-if="n == 3">3번텝</h1>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {};
</script>
