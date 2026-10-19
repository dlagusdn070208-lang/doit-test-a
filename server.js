const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3412;

app.use(express.urlencoded({ extended: true }));
// POST /todo/1?_method=PUT → PUT /todo/1 로 처리
app.use(methodOverride('_method'));
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


// 7. 참고사이트(프론트엔드)와 같이 수정처리가 될 수 있도록 PUT 라우트 처리
app.put('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const text = (req.body.text || '').trim();
  
  if (text) {
    todos = todos.map(todo => todo.id === id ? { ...todo, text } : todo);
  }
  res.redirect('/');
});

// 8. 참고사이트(프론트엔드)와 같이 삭제처리가 될 수 있도록 DELETE 라우트 처리
app.delete('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.redirect('/');
});
