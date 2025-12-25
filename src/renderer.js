
const canvas = document.getElementById('canvas');

canvas.width = 1280;
canvas.height = 720;

const ctx = canvas.getContext('2d');

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
