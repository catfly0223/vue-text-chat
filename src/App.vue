<template>
  <v-app>
    <v-app-bar app color="primary" dark>簡易チャットルーム</v-app-bar>

    <v-main>
      <div v-if="this.roomName === ''">
        <Entrance v-on:enter-room="enterRoom" />
      </div>
      <div v-else>
        <ChatRoom
          :roomName="roomName"
          :playerName="playerName"
          :id="id"
        ></ChatRoom>
      </div>
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";
import Entrance from "./components/Entrance";
import ChatRoom from "./components/ChatRoom";
import { v4 as uuid } from "uuid";

export default {
  name: "App",

  components: {
    Entrance,
    ChatRoom,
  },

  data() {
    return {
      roomName: "",
      playerName: "",
      id: "",
    };
  },
  methods: {
    enterRoom(data) {
      this.roomName = data.roomName;
      this.playerName = data.playerName;
      this.id = uuid();
    },
  },
};
</script>
