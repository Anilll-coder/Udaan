import React, { useRef, useEffect, useState } from "react";

const SYMBOLS = ['square', 'triangle', 'x', 'circle'];
const QUESTIONS = [
  { q:"2 + 2 = ?", options:["2","3","4","5"], correct:2 },
  { q:"5 - 3 = ?", options:["1","2","3","4"], correct:1 },
  { q:"3 × 2 = ?", options:["5","6","7","8"], correct:1 },
  { q:"9 ÷ 3 = ?", options:["2","3","4","5"], correct:1 }
];
const SEGMENTS = 24, SEG_SPACING = 10, HEAD_RADIUS = 9;
const SPEED = 3.8;

function Quiz1() {
  const canvasRef = useRef(null);
  const eatSound = useRef(null);
  const wrongSound = useRef(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const pointer = useRef({ x: 0, y: 0 });
  const segmentsPos = useRef([]);
  const headPos = useRef({ x: 0, y: 0 });
  const foods = useRef([]);
  const optionNodes = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sidebarWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebar-w')) || 320;

    function resize() {
      canvas.width = Math.max(300, window.innerWidth - sidebarWidth);
      canvas.height = window.innerHeight;
      headPos.current = { x: canvas.width/2, y: canvas.height/2 };
      segmentsPos.current = Array.from({length: SEGMENTS}, () => ({ x: canvas.width/2, y: canvas.height/2 }));
      pointer.current = { x: canvas.width/2, y: canvas.height/2 };
      spawnForQuestion();
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Mouse move event
  useEffect(() => {
    function onMouseMove(e) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      pointer.current.y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    }
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Setup sounds
  useEffect(() => {
    eatSound.current = new Audio('eat.mp3');
    wrongSound.current = new Audio('wrong.mp3');
  }, []);

  // Create option UI in sidebar
  function clearOptionsUI() {
    optionNodes.current = [];
    const optionsEl = document.getElementById('options');
    if(optionsEl) optionsEl.innerHTML = '';
  }

  function createOptionUI(optText, symbolType, index) {
    const optionsEl = document.getElementById('options');
    if(!optionsEl) return;
    const div = document.createElement('div');
    div.className = 'option';
    div.dataset.index = index;
    const mini = document.createElement('canvas');
    mini.className = 'symbol-mini';
    mini.width = 36;
    mini.height = 36;
    div.appendChild(mini);
    const span = document.createElement('div');
    span.className = 'opt-text';
    span.textContent = optText;
    div.appendChild(span);
    const mctx = mini.getContext('2d');
    drawSymbolAt(mctx, symbolType, 18, 18, 22);
    div.onclick = () => nextQuestion(index);
    optionsEl.appendChild(div);
    optionNodes.current.push(div);
  }

  // Draw symbol shape on canvas context
  function drawSymbolAt(ctx, type, x, y, size) {
    ctx.save();
    ctx.translate(x,y);
    ctx.lineWidth = Math.max(2,size*0.12);
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    switch(type){
      case 'square':
        ctx.beginPath();
        ctx.rect(-size/2,-size/2,size,size);
        ctx.fill();
        ctx.stroke();
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(0,-size*0.55);
        ctx.lineTo(size*0.6,size*0.55);
        ctx.lineTo(-size*0.6,size*0.55);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      case 'x':
        ctx.beginPath();
        ctx.moveTo(-size*0.5,-size*0.5);
        ctx.lineTo(size*0.5,size*0.5);
        ctx.moveTo(size*0.5,-size*0.5);
        ctx.lineTo(-size*0.5,size*0.5);
        ctx.stroke();
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(0,0,size*0.45,0,Math.PI*2);
        ctx.fill();
        ctx.stroke();
        break;
    }
    ctx.restore();
  }

  // Spawn food and update question UI
  function spawnForQuestion() {
    foods.current = [];
    clearOptionsUI();
    const q = QUESTIONS[currentQ];
    const questionEl = document.getElementById('question');
    if(questionEl) questionEl.textContent = q.q;
    SYMBOLS.forEach((sym, i) => {
      const canvas = canvasRef.current;
      const x = Math.random()*(canvas.width-60)+30;
      const y = Math.random()*(canvas.height-60)+30;
      foods.current.push({x, y, type: sym, size:16, optionIndex: i});
      createOptionUI(q.options[i], sym, i);
    });
  }

  // Validate answer, play sounds, update score and load next question
  function nextQuestion(optionIndex) {
    const q = QUESTIONS[currentQ];
    const correct = (optionIndex === q.correct);
    
    if(correct) eatSound.current.play();
    else wrongSound.current.play();
    setScore(prev => prev + (correct ? 1 : -1));
    
    // Highlight sidebar option
    const node = optionNodes.current[optionIndex];
    if(node){
      node.classList.add('highlight');
      setTimeout(() => node.classList.remove('highlight'),600);
    }
    
    setCurrentQ(prev => (prev + 1) % QUESTIONS.length);
    setTimeout(spawnForQuestion, 100);
  }

  // Update snake position segments based on pointer
  function updatePhysics() {
    const dx = pointer.current.x - headPos.current.x;
    const dy = pointer.current.y - headPos.current.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 1) {
      const angle = Math.atan2(dy, dx);
      headPos.current.x += Math.cos(angle) * SPEED;
      headPos.current.y += Math.sin(angle) * SPEED;
    }
    const canvas = canvasRef.current;
    headPos.current.x = Math.max(HEAD_RADIUS, Math.min(canvas.width-HEAD_RADIUS, headPos.current.x));
    headPos.current.y = Math.max(HEAD_RADIUS, Math.min(canvas.height-HEAD_RADIUS, headPos.current.y));

    segmentsPos.current[0].x = headPos.current.x;
    segmentsPos.current[0].y = headPos.current.y;
    for(let i=1; i<SEGMENTS; i++) {
      const prev = segmentsPos.current[i-1];
      const cur = segmentsPos.current[i];
      let dx2 = prev.x - cur.x, dy2 = prev.y - cur.y;
      let d = Math.hypot(dx2, dy2) || 0.0001;
      let diff = d - SEG_SPACING;
      const spring = 0.45;
      cur.x += dx2 / d * diff * spring;
      cur.y += dy2 / d * diff * spring;
    }
  }

  // Detect collisions between snake head and food
  function checkCollisions() {
    for(let i=foods.current.length-1; i >= 0; i--) {
      const f = foods.current[i];
      const d = Math.hypot(headPos.current.x - f.x, headPos.current.y - f.y);
      if(d < HEAD_RADIUS + f.size*0.6) {
        nextQuestion(f.optionIndex);
        foods.current.splice(i,1);
      }
    }
  }

  // Draw everything on canvas
  function drawFrame() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle='rgba(3,6,9,0.18)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    foods.current.forEach(f => {
      drawSymbolAt(ctx, f.type, f.x, f.y, f.size);
    });

    ctx.save();
    ctx.strokeStyle = '#ffffff55';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    for(let i=SEGMENTS-1; i>=0; i--) {
      const p = segmentsPos.current[i];
      const t = i/(SEGMENTS - 1);
      const r = HEAD_RADIUS*(0.55+0.9*(1 - t));
      const hue = 140 - t * 60;
      ctx.beginPath();
      ctx.fillStyle = `hsl(${hue} 75% ${42 + (1 - t) * 10}%)`;
      ctx.arc(p.x, p.y, r, 0, Math.PI*2);
      ctx.fill();
    }

    // Draw snake head eyes
    const head = segmentsPos.current[0];
    const next = segmentsPos.current[1];
    const ang = Math.atan2(next.y - head.y, next.x - head.x);
    ctx.save();
    ctx.translate(head.x, head.y);
    ctx.rotate(ang);
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.beginPath(); ctx.ellipse(7,-4,3.2,5,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(7,4,3.2,5,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#041022';
    ctx.beginPath(); ctx.arc(8,-4,1.8,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(8,4,1.8,0,Math.PI*2); ctx.fill();
    ctx.restore();

    // Draw pointer cursor
    ctx.save();
    ctx.beginPath();
    ctx.arc(pointer.current.x, pointer.current.y, 6, 0, Math.PI*2);
    ctx.fillStyle = '#10b981';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    ctx.restore();
  }

  // Game loop
  useEffect(() => {
    let animationId;
    function loop(){
      updatePhysics();
      checkCollisions();
      drawFrame();
      animationId = requestAnimationFrame(loop);
    }
    loop();
    return () => cancelAnimationFrame(animationId);
  }, [currentQ]); 

  useEffect(() => {
    spawnForQuestion();
  }, [currentQ]);

  return (
    <>
      <div className="app" style={{ display: 'flex', height: '100vh' }}>
        <canvas ref={canvasRef} id="game" className="game" style={{ flex:1, cursor: 'none', background: 'linear-gradient(180deg,#071022 0%, #04101a 100%)' }} />
        <div id="sidebar" style={{ width: 320, padding: 18, boxSizing: "border-box", background: '#1b1f24', borderLeft: '1px solid rgba(255,255,255,0.03)', overflow: 'auto', color: '#eee', fontFamily: 'Inter, system-ui, Segoe UI, Roboto, Helvetica, Arial'}}>
          <h2 style={{ marginBottom: 10, fontWeight: 600, fontSize: 18, color: '#fff' }}>Math Quiz</h2>
          <div id="questionArea">
            <p id="question" style={{ margin: '10px 0 12px 0', fontSize: 16, lineHeight: 1.3 }}>{QUESTIONS[currentQ].q}</p>
            <div id="options"></div>
          </div>
          <div id="scoreBox" style={{ marginTop: 16, padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 8, textAlign: 'center' }}>
            Score
            <p id="score" style={{ margin: 0, fontWeight: 700, fontSize: 20, color: '#10b981' }}>{score}</p>
          </div>
          <div className="meta" style={{ marginTop: 12, fontSize: 12, color: '#a7b0bd' }}>
            Eat the symbol that matches the correct option.<br />
            Snake cannot escape and does not grow.
          </div>
        </div>
      </div>
      <footer style={{ position: 'fixed', left: 320, bottom: 6, fontSize: 12, color: '#93a0b2', paddingLeft: 12 }}>
        Move the mouse to steer the snake. Borders prevent escape.
      </footer>
    </>
  );
}

export default Quiz1;
