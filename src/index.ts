import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[SERVER] 🚀 Serveur lancé sur http://localhost:${PORT}`);
  console.log(`📚 API MYIUC Sheets v1.0.0`);
});
