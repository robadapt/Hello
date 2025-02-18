const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initial resize
resizeCanvas();

// Resize canvas when window is resized
window.addEventListener('resize', resizeCanvas);

// Fractal parameters
const maxIterations = 100;
let zoom = 200;
let offsetX = 0;
let offsetY = 0;

function drawFractal(timestamp) {
    const width = canvas.width;
    const height = canvas.height;
    
    // Create image data
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    // Animation parameters
    const time = timestamp / 1000;
    const zoomOscillation = Math.sin(time * 0.5) * 50 + 200;
    const colorShift = time * 0.5;

    // Calculate each pixel
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let real = (x - width / 2) / zoomOscillation + offsetX;
            let imag = (y - height / 2) / zoomOscillation + offsetY;
            
            let cReal = real;
            let cImag = imag;
            
            let n = 0;
            
            while (n < maxIterations) {
                const aa = real * real - imag * imag;
                const bb = 2 * real * imag;
                
                if (aa + bb > 16) {
                    break;
                }
                
                real = aa + cReal;
                imag = bb + cImag;
                n++;
            }
            
            // Calculate color based on iteration count
            const hue = (n / maxIterations * 360 + colorShift * 50) % 360;
            const saturation = 100;
            const lightness = n < maxIterations ? 50 : 0;
            
            // Convert HSL to RGB
            const c = (1 - Math.abs(2 * lightness / 100 - 1)) * saturation / 100;
            const xComponent = c * (1 - Math.abs((hue / 60) % 2 - 1));
            const m = lightness / 100 - c / 2;
            
            let r, g, b;
            
            if (hue < 60) {
                [r, g, b] = [c, xComponent, 0];
            } else if (hue < 120) {
                [r, g, b] = [xComponent, c, 0];
            } else if (hue < 180) {
                [r, g, b] = [0, c, xComponent];
            } else if (hue < 240) {
                [r, g, b] = [0, xComponent, c];
            } else if (hue < 300) {
                [r, g, b] = [xComponent, 0, c];
            } else {
                [r, g, b] = [c, 0, xComponent];
            }
            
            const index = (y * width + x) * 4;
            data[index] = Math.round((r + m) * 255);
            data[index + 1] = Math.round((g + m) * 255);
            data[index + 2] = Math.round((b + m) * 255);
            data[index + 3] = 255;
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(drawFractal);
}

// Start the animation
requestAnimationFrame(drawFractal); 