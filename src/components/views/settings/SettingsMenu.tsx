import {setColor} from "../../../services/settings.service";
import {useAppContext} from "../../contexts/AppContext";

export default function () {
    const {
        updateTheme,
    } = useAppContext();

    const handleThemeClick = (index: number) => {
        setColor(index);
        updateTheme(index);
    }

    return (
        <div className="modal fade" id="settingsModal" tabIndex={-1} aria-labelledby="settingsModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header" data-bs-theme="dark">
                        <h5 className="modal-title" id="settingsModalLabel">Settings</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#gameTab"
                                        type="button"
                                        role="tab">Game
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#aboutTab"
                                        type="button"
                                        role="tab">About
                                </button>
                            </li>
                        </ul>

                        <div className="tab-content mt-3">
                            <div className="tab-pane fade show active" id="gameTab" role="tabpanel">
                                <p className="sub-title">Multiplayer</p>
                                <div className="d-flex flex-row gap-2">
                                    <button id="copy-session-link-btn"
                                            type="button"
                                            className="btn btn-primary btn-primary-bd"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            data-bs-custom-class-name="long-tooltip"
                                            data-bs-title="Download your current game state in a json file"
                                    >
                                        Copy Link
                                    </button>
                                </div>
                                <p className="sub-title">Color Settings</p>
                                <div className="drowdown mb-3">
                                    <button className="btn btn-primary-bd dropdown-toggle" type="button"
                                            id="colorSchemeDropdown"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        Change Color Scheme
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button className="dropdown-item" id="btnAquatic"
                                                    onClick={() => handleThemeClick(1)}>Aquatic
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" id="btnTropical"
                                                    onClick={() => handleThemeClick(2)}>Tropical
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" id="btnHellfire"
                                                    onClick={() => handleThemeClick(3)}>Hellfire
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" id="btnRetro"
                                                    onClick={() => handleThemeClick(0)}>Retro
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <p className="sub-title">Save and Load</p>
                                <div className="d-flex flex-row gap-2">
                                    <button id="download-btn"
                                            type="button"
                                            className="btn btn-primary btn-primary-bd"
                                            data-bs-toggle="tooltip" data-bs-placement="top"
                                            data-bs-title="Download your current game state in a json file">
                                        Save Game
                                    </button>
                                    <label className="btn btn-primary btn-primary-bd" data-bs-toggle="tooltip"
                                           data-bs-placement="top"
                                           data-bs-title="Upload a previously downloaded save file">
                                        Upload Game
                                        <input type="file" name="gameFile"/>
                                    </label>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="aboutTab" role="tabpanel">
                                <p className="sub-title">
                                    About
                                </p>
                                <p>This is a clone of the mobile game <a
                                    href="https://apps.apple.com/de/app/blockudoku-block-puzzle/id1452227871?l=en-GB"
                                    target="_blank">Blockudoku</a> written in Scala by
                                    Florian Dritter and Tom Berger. <br/>
                                    This project is an academic project at HTWG Konstanz.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary btn-primary-bd" data-bs-dismiss="modal">Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}