<template>
  <div>
    <br />

    <v-container>
      <v-card>
        <v-text-field
          placeholder="発言内容を入力してや"
          v-model="text"
        ></v-text-field>
        <v-btn v-on:click="sendMessage" color="primary">送信</v-btn>
      </v-card>

      <div v-for="message in this.messages" :key="message.messageId">
        <v-row>
          <v-col>
            <div v-if="message.playerId === id">
              <v-card class="float-right" width="40%">
                <v-card-title>{{ message.playerName }}</v-card-title>
                <v-card-text>{{ message.text }}</v-card-text>
              </v-card>
            </div>
            <div v-else>
              <v-card width="40%">
                <v-card-title>{{ message.playerName }}</v-card-title>
                <v-card-text>{{ message.text }}</v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import io from "socket.io-client";
import { v4 as uuid } from "uuid";

export default {
  name: "ChatRoom",
  props: {
    id: String,
    roomName: String,
    playerName: String,
  },
  data() {
    return {
      socket: io("localhost:9090"),
      players: [],
      text: "",
      messages: [],
    };
  },
  // 入室処理全般
  created() {
    const roomName = this.roomName;
    const playerName = this.playerName;
    // 部屋に入る
    this.socket.emit("ENTER-ROOM", { roomName, playerName });
  },
  methods: {
    sendMessage() {
      if (this.text === "") {
        return;
      }
      const messageId = uuid();
      const playerId = this.id;
      const playerName = this.playerName;
      const text = this.text;

      this.messages.push({ messageId, playerId, playerName, text });

      let roomName = this.roomName;
      this.socket.emit("CHAT-MESSAGE", {
        roomName,
        messageId,
        playerId,
        playerName,
        text,
      });
      this.text = "";
    },
  },
  mounted() {
    this.socket.on("CHAT-MESSAGE", (data) => {
      if (data.playerId !== this.id) {
        const messageId = data.messageId;
        const playerId = data.playerId;
        const playerName = data.playerName;
        const text = data.text;
        this.messages.push({ messageId, playerId, playerName, text });
      }
    });
  },
};
</script>

<style></style>
