<script setup lang="ts">
import {setColor} from "../../../services/settings.service";
import {injectAppContext} from "../../../contexts/app.context";

const app = injectAppContext();

const handleThemeClick = (index: number) => {
  setColor(index);
  app.gameState.value.colorIndex = index;
}
</script>

<template>
  <div class="modal fade" id="settingsModal" tabindex="-1" aria-labelledby="settingsModalLabel"
       aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" data-bs-theme="dark">
          <h5 class="modal-title" id="settingsModalLabel">Settings</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#gameTab"
                      type="button"
                      role="tab">Game
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#aboutTab"
                      type="button"
                      role="tab">About
              </button>
            </li>
          </ul>

          <div class="tab-content mt-3">
            <div class="tab-pane fade show active" id="gameTab" role="tabpanel">
              <p class="sub-title">Multiplayer</p>
              <div class="d-flex flex-row gap-2">
                <button id="copy-session-link-btn"
                        type="button"
                        class="btn btn-primary btn-primary-bd"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-custom-class="long-tooltip"
                        data-bs-title="Download your current game state in a json file"
                >
                  Copy Link
                </button>
              </div>
              <p class="sub-title">Color Settings</p>
              <div class="drowdown mb-3">
                <button class="btn btn-primary-bd dropdown-toggle" type="button"
                        id="colorSchemeDropdown"
                        data-bs-toggle="dropdown" aria-expanded="false">
                  Change Color Scheme
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <button class="dropdown-item" id="btnAquatic"
                            @click="() => handleThemeClick(1)">Aquatic
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" id="btnTropical"
                            @click="() => handleThemeClick(2)">Tropical
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" id="btnHellfire"
                            @click="() => handleThemeClick(3)">Hellfire
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" id="btnRetro" @click="() => handleThemeClick(0)">
                      Retro
                    </button>
                  </li>
                </ul>
              </div>
              <p class="sub-title">Save and Load</p>
              <div class="d-flex flex-row gap-2">
                <button id="download-btn"
                        type="button"
                        class="btn btn-primary btn-primary-bd"
                        data-bs-toggle="tooltip" data-bs-placement="top"
                        data-bs-title="Download your current game state in a json file">
                  Save Game
                </button>
                <label class="btn btn-primary btn-primary-bd" data-bs-toggle="tooltip"
                       data-bs-placement="top"
                       data-bs-title="Upload a previously downloaded save file">
                  Upload Game
                  <input type="file" name="gameFile">
                </label>
              </div>
            </div>

            <div class="tab-pane fade" id="aboutTab" role="tabpanel">
              <p class="sub-title">
                About
              </p>
              <p>This is a clone of the mobile game <a
                  href="https://apps.apple.com/de/app/blockudoku-block-puzzle/id1452227871?l=en-GB"
                  target="_blank">Blockudoku</a> written in Scala by
                Florian Dritter and Tom Berger. <br>
                This project is an academic project at HTWG Konstanz.
              </p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-primary-bd" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>