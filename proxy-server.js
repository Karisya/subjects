import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/save", async (req, res) => {
  try {
    console.log("📨 Получены данные от клиента:", req.body);

    const response = await axios.post("https://bgaa.by/test_result", req.body, {
      headers: { "Content-Type": "application/json" },
    });

    res.json({ success: true, message: response.data });
  } catch (error) {
    console.error("Ошибка при отправке:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(4000, () => console.log("Proxy сервер запущен на порту 4000"));
