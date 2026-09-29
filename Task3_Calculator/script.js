const display=document.getElementById('display'),history=document.getElementById('history');let expr='';
function render(){display.textContent=expr||'0'}
function calculate(){try{let safe=expr.replace(/%/g,'/100');let result=Function('"use strict";return ('+safe+')')();if(!Number.isFinite(result))throw Error();return Math.round(result*1e10)/1e10}catch(e){return null}}
document.querySelectorAll('[data-value]').forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.value;if(v==='.'&&expr.split(/[+\-*/%]/).pop().includes('.'))return;expr+=v;render()}));
document.querySelector('[data-action="clear"]').onclick=()=>{expr='';history.textContent='';render()};
document.querySelector('[data-action="delete"]').onclick=()=>{expr=expr.slice(0,-1);render()};
document.querySelector('[data-action="equals"]').onclick=()=>{const r=calculate();if(r===null){history.textContent='Invalid expression';expr='';render();return}history.textContent=expr+' =';expr=String(r);render()};
document.addEventListener('keydown',e=>{if(/[0-9.+\-*/%]/.test(e.key)){expr+=e.key;render()}if(e.key==='Enter'){document.querySelector('[data-action="equals"]').click()}if(e.key==='Backspace'){expr=expr.slice(0,-1);render()}if(e.key==='Escape'){document.querySelector('[data-action="clear"]').click()}});
document.getElementById('theme').onclick=()=>document.body.classList.toggle('light');render();