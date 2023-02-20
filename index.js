import express from "express";
import { v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

app.listen(4000, () => {
  console.log("Server up and running on port 4000.");
});

const data = [];

app.post("/", (req, res) => {
  const entry = { ...req.body, id: uuid() };
  data.push(entry);
  return res.status(201).json(entry);
});

app.get("/", (req, res) => {
  return res.status(200).json(data);
});

app.get("/:entryId", (req, res) => {
  const { entryId } = req.params;
  const reqEntry = data.find((cE) => cE.id === entryId);
  return res.status(200).json(reqEntry);
});

app.put("/:entryId", (req, res) => {
  const { entryId } = req.params;
  let reqEntry = data.find((cE) => cE.id === entryId),
    index = data.findIndex((cE) => cE.id === entryId);
  data.splice(index, 1, { ...req.body, id: entryId });
  reqEntry = data.find((cE) => cE.id === entryId); // atualizar reqEntry após a alteração
  return res.status(202).json(reqEntry);
});

app.delete("/:entryId", (req, res) => {
  const { entryId } = req.params;
  const reqEntry = data.find((cE) => cE.id === entryId),
    index = data.findIndex((cE) => cE.id === entryId);
  data.splice(index, 1);
  return res.status(202).json(reqEntry);
});
