"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


// 1. タスク管理 (Tasks)

let tasks = [
  { id: 1, task: "レポート提出", kigen: "2025-01-28", detail: "Webプログラミングの仕様書" },
  { id: 2, task: "買い物", kigen: "2025-01-15", detail: "ガムテープが必要" },
  { id: 3, task: "髪を切る", kigen: "2025-02-01", detail: "13:00に予約済み" },
];

app.get("/tasks", (req, res) => {
  res.render('tasks', { data: tasks });
});

app.get("/tasks/create", (req, res) => {
  res.redirect('/public/tasks_new.html');
});

app.post("/tasks", (req, res) => {
  const id = tasks.length + 1;
  const task = req.body.task;
  const kigen = req.body.kigen;
  const detail = req.body.detail;
  
  tasks.push({ id: id, task: task, kigen: kigen, detail: detail });
  res.render('tasks', { data: tasks });
});

app.get("/tasks/:number", (req, res) => {
  const number = req.params.number;
  const item = tasks[number];
  res.render('tasks_detail', { id: number, data: item });
});

app.get("/tasks/edit/:number", (req, res) => {
  const number = req.params.number;
  const item = tasks[number];
  res.render('tasks_edit', { id: number, data: item });
});

app.post("/tasks/update/:number", (req, res) => {
  const number = req.params.number;
  
  tasks[number].task = req.body.task;
  tasks[number].kigen = req.body.kigen;
  tasks[number].detail = req.body.detail;
  
  res.redirect('/tasks');
});

app.get("/tasks/delete/:number", (req, res) => {
  tasks.splice(req.params.number, 1);
  res.redirect('/tasks');
});


// 2. 賞味期限管理 (Foods)

let foods = [
  { id: 1, name: "牛乳", limit: "2025-01-10", qty: "1本", memo: "特売" },
  { id: 2, name: "卵", limit: "2025-01-15", qty: "1パック", memo: "Lサイズ" },
];

app.get("/foods", (req, res) => {
  res.render('foods', { data: foods });
});

app.get("/foods/create", (req, res) => {
  res.redirect('/public/foods_new.html');
});

app.post("/foods", (req, res) => {
  const id = foods.length + 1;
  const name = req.body.name;
  const limit = req.body.limit;
  const qty = req.body.qty;
  const memo = req.body.memo;
  
  foods.push({ id: id, name: name, limit: limit, qty: qty, memo: memo });
  res.render('foods', { data: foods });
});

app.get("/foods/:number", (req, res) => {
  const number = req.params.number;
  const item = foods[number];
  res.render('foods_detail', { id: number, data: item });
});

app.get("/foods/edit/:number", (req, res) => {
  const number = req.params.number;
  const item = foods[number];
  res.render('foods_edit', { id: number, data: item });
});

app.post("/foods/update/:number", (req, res) => {
  const number = req.params.number;
  
  foods[number].name = req.body.name;
  foods[number].limit = req.body.limit;
  foods[number].qty = req.body.qty;
  foods[number].memo = req.body.memo;
  
  res.redirect('/foods');
});

app.get("/foods/delete/:number", (req, res) => {
  foods.splice(req.params.number, 1);
  res.redirect('/foods');
});


// 3. ポケモン育成管理 (Pokemon)

let pokemon = [
  { id: 1, name: "バドレックス（黒馬）", goods: "こだわりスカーフ", skill: "じんばいったい", move: "アストラルビット/サイコキネシス/おにび/トリック", nature: "おくびょう", point: "H124 B4 C212 D4 S164", teras: "ゴースト" },
  { id: 2, name: "ザシアン", goods: "くちたけん", skill: "ふとうのけん", move: "きょじゅうざん/じゃれつく/テラバースト/くさわけ", nature: "いじっぱり", point: "H204 A236 B4 D4 S60", teras: "じめん" },
  { id: 3, name: "ディンルー", goods: "オボンのみ", skill: "わざわいのうつわ", move: "じしん/ステルスロック/まきびし/ふきとばし", nature: "わんぱく", point: "H244 A4 B44 D212 S4", teras: "ほのお" },
  { id: 4, name: "キノガッサ", goods: "きあいのタスキ", skill: "テクニシャン", move: "キノコのほうし/タネマシンガン/マッハパンチ/つるぎのまい", nature: "いじっぱり", point: "A252 B4 S252", teras: "ステラ" },
  { id: 5, name: "アシレーヌ", goods: "とつげきチョッキ", skill: "うるおいボイス", move: "ムーンフォース/アクアジェット/シャドーボール/サイコノイズ", nature: "ひかえめ", point: "H220 B4 C188 D92 S4", teras: "じめん" },
  { id: 6, name: "キョジオーン", goods: "たべのこし", skill: "きよめのしお", move: "しおづけ/まもる/みがわり/じこさいせい", nature: "しんちょう", point: "H252 D236  S20", teras: "くさ" },
];

app.get("/pokemon", (req, res) => {
  res.render('pokemon', { data: pokemon });
});

app.get("/pokemon/create", (req, res) => {
  res.redirect('/public/pokemon_new.html');
});

app.post("/pokemon", (req, res) => {
  const id = pokemon.length + 1;
  const name = req.body.name;
  const goods = req.body.goods;
  const skill = req.body.skill;
  const move = req.body.move;
  const nature = req.body.nature;
  const point = req.body.point;
  const teras = req.body.teras;
  
  pokemon.push({ id: id, name: name, goods: goods, skill: skill, move: move, nature: nature, point: point, teras: teras });
  res.render('pokemon', { data: pokemon });
});

app.get("/pokemon/:number", (req, res) => {
  const number = req.params.number;
  const item = pokemon[number];
  res.render('pokemon_detail', { id: number, data: item });
});

app.get("/pokemon/edit/:number", (req, res) => {
  const number = req.params.number;
  const item = pokemon[number];
  res.render('pokemon_edit', { id: number, data: item });
});

app.post("/pokemon/update/:number", (req, res) => {
  const number = req.params.number;
  
  pokemon[number].name = req.body.name;
  pokemon[number].goods = req.body.goods;
  pokemon[number].skill = req.body.skill;
  pokemon[number].move = req.body.move;
  pokemon[number].nature = req.body.nature;
  pokemon[number].point = req.body.point;
  pokemon[number].teras = req.body.teras;
  
  res.redirect('/pokemon');
});

app.get("/pokemon/delete/:number", (req, res) => {
  pokemon.splice(req.params.number, 1);
  res.redirect('/pokemon');
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));