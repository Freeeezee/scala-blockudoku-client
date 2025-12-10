<script setup lang="ts">
import { ref } from 'vue';
import { setColor } from '../../../services/settings.service';
import { injectAppContext } from '../../../contexts/app.context';

const app = injectAppContext();
const dialog = ref(false);
const activeTab = ref(0);

const handleThemeClick = (index: number) => {
  setColor(index);
  app.gameState.value.colorIndex = index;
};
</script>

<template>
  <!-- Settings Button -->
  <v-btn icon color="primary" @click="dialog = true">
    <v-icon>mdi-cog</v-icon>
  </v-btn>

  <!-- Settings Modal -->
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="text-h6">
        Settings
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-tabs v-model="activeTab" background-color="transparent" grow>
          <v-tab>Game</v-tab>
          <v-tab>About</v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
          <!-- Game Tab -->
          <v-tab-item>
            <p class="sub-title">Multiplayer</p>
            <v-btn color="primary" class="mb-2">Copy Link</v-btn>

            <p class="sub-title">Color Settings</p>
            <v-menu>
              <template #activator="{ props }">
                <v-btn v-bind="props" color="primary" outlined>
                  Change Color Scheme
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="handleThemeClick(1)">
                  <v-list-item-title>Aquatic</v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleThemeClick(2)">
                  <v-list-item-title>Tropical</v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleThemeClick(3)">
                  <v-list-item-title>Hellfire</v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleThemeClick(0)">
                  <v-list-item-title>Retro</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <p class="sub-title">Save and Load</p>
            <v-btn color="primary" class="me-2">Save Game</v-btn>
            <v-btn color="primary" outlined>
              Upload Game
              <input type="file" style="display:none;" />
            </v-btn>
          </v-tab-item>

          <!-- About Tab -->
          <v-tab-item>
            <p class="sub-title">About</p>
            <p>
              This is a clone of the mobile game
              <a href="https://apps.apple.com/de/app/blockudoku-block-puzzle/id1452227871?l=en-GB" target="_blank">
                Blockudoku
              </a> written in Scala by Florian Dritter and Tom Berger.
              <br />
              This project is an academic project at HTWG Konstanz.
            </p>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
