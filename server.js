const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3412;

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride(function (req, res) {
  if (req.query && '_method' in req.query) {
    const method = req.query._method;
    delete req.query._method;
    return method;
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

// 메모리 저장 (서버 재시작 시 초기화)
let todos = [
  { id: 1, text: '아침 운동하기' },
  { id: 2, text: '이메일 확인하기' },
  { id: 3, text: '장보기' },
];
let nextId = 4;

app.get('/todo', (req, res) => {
  res.json(todos);
});

app.post('/todo', (req, res) => {
  const text = (req.body.text || '').trim();
  if (text) todos.push({ id: nextId++, text });
  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});


// 7. PUT 요청 처리 (화면에 텍스트 응답)
app.put('/todo/:id', (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  
  // 브라우저 화면에 이 문구가 출력됩니다.
  res.send(`PUT /todo/:${id}, 내용 : ${text} 요청 처리`);
});

// 8. DELETE 요청 처리 (화면에 텍스트 응답)
app.delete('/todo/:id', (req, res) => {
  const id = req.params.id;
  
  // 브라우저 화면에 이 문구가 출력됩니다.
  res.send(`DELETE /todo/:${id} 요청 처리`);
});