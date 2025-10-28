import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());

const FILE = "counter.json";

// crea file contatore se non esiste
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, JSON.stringify({ current: 0 }));
}

app.get("/get-code", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
  let current = data.current;

  if (current >= 100) {
    return res.json({ success: false, message: "Codici esauriti." });
  }

  current++;
  fs.writeFileSync(FILE, JSON.stringify({ current }));

  const code = `NSG25-${current}-T`;
  res.json({ success: true, code });
});

app.listen(10000, () => console.log("✅ Server attivo"));
