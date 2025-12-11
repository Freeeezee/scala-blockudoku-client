import {MouseEventHandler, useState} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Tabs,
    Tab,
    Menu,
    MenuItem,
    Card,
    CardContent,
    IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import {useAppContext} from "../../contexts/AppContext";

export default function() {
    const {
        updateTheme
    } = useAppContext();

    const [dialog, setDialog] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [menuAnchor, setMenuAnchor] = useState<Element | null>(null);

    const openMenu: MouseEventHandler<HTMLButtonElement> = (e) => setMenuAnchor(e.currentTarget);
    const closeMenu = () => setMenuAnchor(null);

    const handleThemeClick = (index: number) => {
        updateTheme(index);
        closeMenu();
    };

    return (
        <>
            <IconButton onClick={() => setDialog(true)} sx={{ color: "#0099cc", position: 'absolute', bottom: 20, right: 20 }}>
                <SettingsIcon fontSize="large" />
            </IconButton>

            <Dialog open={dialog} onClose={() => setDialog(false)} maxWidth="sm" fullWidth>
                <Card sx={{ background: "#2a2a4a" }}>
                    <DialogTitle sx={{ color: "white" }}>Settings</DialogTitle>

                    <DialogContent>
                        <Tabs
                            value={activeTab}
                            onChange={(_, v) => setActiveTab(v)}
                            textColor="inherit"
                            indicatorColor="primary"
                        >
                            <Tab label="Game" sx={{ color: "white" }} />
                            <Tab label="About" sx={{ color: "white" }} />
                        </Tabs>

                        {activeTab === 0 && (
                            <CardContent sx={{ color: "white" }}>
                                <p>Multiplayer</p>
                                <Button variant="contained" sx={{ mb: 2, background: "#0099cc" }}>
                                    Copy Link
                                </Button>

                                <p>Color Settings</p>
                                <Button
                                    variant="contained"
                                    sx={{ mb: 2, background: "#0099cc" }}
                                    onClick={openMenu}
                                >
                                    Change Color Scheme
                                </Button>

                                <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
                                    <MenuItem onClick={() => handleThemeClick(1)}>Aquatic</MenuItem>
                                    <MenuItem onClick={() => handleThemeClick(2)}>Tropical</MenuItem>
                                    <MenuItem onClick={() => handleThemeClick(3)}>Hellfire</MenuItem>
                                    <MenuItem onClick={() => handleThemeClick(0)}>Retro</MenuItem>
                                </Menu>

                                <p>Save and Load</p>
                                <Button variant="contained" sx={{ mr: 2, background: "#0099cc" }}>
                                    Save Game
                                </Button>

                                <Button variant="outlined" component="label" sx={{ borderColor: "#0099cc", color: "#0099cc" }}>
                                    Upload Game
                                    <input type="file" hidden />
                                </Button>
                            </CardContent>
                        )}

                        {activeTab === 1 && (
                            <CardContent sx={{ color: "white" }}>
                                <p>About</p>
                                <p>
                                    This is a clone of the mobile game
                                    <a
                                        href="https://apps.apple.com/de/app/blockudoku-block-puzzle/id1452227871?l=en-GB"
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ color: "#0099cc" }}
                                    >
                                        Blockudoku
                                    </a>
                                    written in Scala. This project is an academic project at HTWG Konstanz.
                                </p>
                            </CardContent>
                        )}
                    </DialogContent>

                    <DialogActions>
                        <Button sx={{ color: "#0099cc" }} onClick={() => setDialog(false)}>
                            Close
                        </Button>
                    </DialogActions>
                </Card>
            </Dialog>
        </>
    );
}
