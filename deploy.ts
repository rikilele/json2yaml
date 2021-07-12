import { json2yaml } from "./mod.ts";
import { Kyuko } from "https://deno.land/x/kyuko@v0.4.1/mod.ts";

const app = new Kyuko();

app.post("/", async (req, res) => {
  const body = await req.text();
  res.send(json2yaml(body));
});

app.error((_err, _req, res) => {
  res.status(400).send();
});

app.default((_req, res) => {
  res.status(405).send();
});

app.listen();
