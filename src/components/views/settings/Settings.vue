<script setup lang="ts">
import useSettings from "../../../composables/useSettings";

const {
  dialog,
  activeTab,
  numElements,
  handleThemeClick,
} = useSettings();

</script>

<template>
  <!-- Settings Button -->
  <v-btn icon color="#0099cc" @click="dialog = true" class="settings-btn">
    <i class="bi bi-gear-fill fs-4"></i>
  </v-btn>

  <!-- Settings Modal -->
  <v-dialog v-model="dialog" max-width="600">
    <v-card color="#2a2a4a" border="sm">
      <v-card-title class="text-h6">
        Settings
        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-text>
        <v-tabs v-model="activeTab" background-color="transparent" grow>
          <v-tab>Game</v-tab>
          <v-tab>About</v-tab>
        </v-tabs>

        <v-tabs-window v-model="activeTab">
          <!-- Game Tab -->
          <v-tabs-window-item>
            <p class="sub-title">Multiplayer</p>
            <v-btn color="#0099cc" class="mb-2">Copy Link</v-btn>

            <p class="sub-title">Color Settings</p>
            <v-menu>
              <template #activator="{ props }">
                <v-btn v-bind="props" color="#0099cc" outlined>
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

            <p class="sub-title">Difficulty</p>
            <p class="mb-2"> Note: The change will take effect
              <b> after </b> the next element placement.</p>
              <v-slider
                  v-model="numElements"
                  :max="9"
                  :min="1"
                  :step="1"
                  thumb-label
                  label="Number of Elements"
              ></v-slider>

            <p class="sub-title">Save and Load</p>
            <v-btn color="#0099cc" class="me-2">Save Game</v-btn>
            <v-btn color="#0099cc" outlined>
              Upload Game
              <input type="file" style="display:none;" />
            </v-btn>
          </v-tabs-window-item>

          <!-- About Tab -->
          <v-tabs-window-item>
            <p class="sub-title">About</p>
            <p>
              This is a clone of the mobile game
              <a href="https://apps.apple.com/de/app/blockudoku-block-puzzle/id1452227871?l=en-GB" target="_blank">
                Blockudoku
              </a> written in Scala by Florian Dritter and Tom Berger.
              <br />
              This project is an academic project at HTWG Konstanz.
            </p>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#0099cc" @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>