<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="5">
          <form @submit="enterRoom">
            <v-card>
              <v-card-title> 送信フォーム </v-card-title>
              <v-card-text>
                <v-text-field
                  label="部屋名"
                  type="text"
                  v-model="roomName"
                ></v-text-field>
                <v-text-field
                  label="名前"
                  type="text"
                  v-model="playerName"
                ></v-text-field>
              </v-card-text>
            </v-card>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary">入室！</v-btn>
            </v-card-actions>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Entrance",
  data() {
    return {
      roomName: "",
      playerName: "匿名さん",
    };
  },
  methods: {
    enterRoom(e) {
      e.preventDefault();

      var data = {
        roomName: this.roomName,
        playerName: this.playerName,
      };

      this.$emit("enter-room", data);
      this.playerName = "";
      this.playerName = "";
    },
  },
};
</script>

<style></style>
