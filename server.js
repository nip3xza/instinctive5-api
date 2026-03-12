const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const FACEIT_API_KEY = "519da6fb-35fc-45c6-b2e7-d1ccd6b648d0";

/* PLAYER INFO */

app.get("/faceit/:player", async (req, res) => {

    const player = req.params.player;

    try {

        const response = await fetch(
            `https://open.faceit.com/data/v4/players?nickname=${player}`,
            {
                headers: {
                    "Authorization": `Bearer ${FACEIT_API_KEY}`
                }
            }
        );

        const data = await response.json();
        res.json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch Faceit player" });
    }

});

/* PLAYER STATS */

app.get("/stats/:playerid", async (req, res) => {

    try {

        const response = await fetch(
            `https://open.faceit.com/data/v4/players/${req.params.playerid}/stats/cs2`,
            {
                headers: {
                    "Authorization": `Bearer ${FACEIT_API_KEY}`
                }
            }
        );

        const data = await response.json();
        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }

});

/* TEAM STATS */

app.get("/teamstats/:teamid", async (req, res) => {

    try {

        const response = await fetch(
            `https://open.faceit.com/data/v4/teams/${req.params.teamid}/stats/cs2`,
            {
                headers: {
                    "Authorization": `Bearer ${FACEIT_API_KEY}`
                }
            }
        );

        const data = await response.json();
        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Failed to fetch team stats" });
    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});