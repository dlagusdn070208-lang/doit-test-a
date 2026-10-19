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


// 7. 할일 수정 (PUT) 라우트 처리 및 로그 출력
app.put('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const text = (req.body.text || '').trim();
  
  // 터미널에 출력될 로그
  console.log(`PUT /todo/${id}, 내용 : ${text} 요청 처리`);

  if (text) {
    todos = todos.map(todo => todo.id === id ? { ...todo, text } : todo);
  }
  res.redirect('/');
});

// 8. 할일 삭제 (DELETE) 라우트 처리 및 로그 출력
app.delete('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  // 터미널에 출력될 로그
  console.log(`DELETE /todo/${id} 요청 처리`);

  todos = todos.filter(todo => todo.id !== id);
  res.redirect('/');
});