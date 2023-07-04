/**
 * Setups the home background
 * @param {HTMLCanvasElement} canvas 
 */
export async function setupBackground(canvas) {
    const ctx = canvas.getContext('webgl2');

    if (!ctx) {
        console.error('WebGL2 not supported');
        return;
    }

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    const vertexShader = await fetch('./shaders/background.vert.glsl').then(res => res.text());
    const fragmentShader = await fetch('./shaders/background.frag.glsl').then(res => res.text());

    const vertexShaderObj = ctx.createShader(ctx.VERTEX_SHADER);
    ctx.shaderSource(vertexShaderObj, vertexShader);
    ctx.compileShader(vertexShaderObj);

    const fragmentShaderObj = ctx.createShader(ctx.FRAGMENT_SHADER);
    ctx.shaderSource(fragmentShaderObj, fragmentShader);
    ctx.compileShader(fragmentShaderObj);

    const program = ctx.createProgram();
    ctx.attachShader(program, vertexShaderObj);
    ctx.attachShader(program, fragmentShaderObj);
    ctx.linkProgram(program);

    const positionAttributeLocation = ctx.getAttribLocation(program, 'a_position');
    const resolutionUniformLocation = ctx.getUniformLocation(program, 'u_resolution');
    const timeUniformLocation = ctx.getUniformLocation(program, 'time');
    const scrollUniformLocation = ctx.getUniformLocation(program, 'scroll');

    const positionBuffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, positionBuffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1
    ]), ctx.STATIC_DRAW);

    ctx.viewport(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.useProgram(program);
    ctx.enableVertexAttribArray(positionAttributeLocation);
    ctx.bindBuffer(ctx.ARRAY_BUFFER, positionBuffer);
    ctx.vertexAttribPointer(positionAttributeLocation, 2, ctx.FLOAT, false, 0, 0);
    ctx.uniform2f(resolutionUniformLocation, ctx.canvas.width, ctx.canvas.height);

    const content = document.querySelector('#page-content');

    let start = Date.now();
    let lastTime = 0;
    let scroll = 0;
    const render = () => {
        const time = (Date.now() - start) / 1000;
        const delta = time - lastTime;
        lastTime = time;
        const newScroll = content.scrollTop / window.innerHeight;
        scroll += (newScroll - scroll) * delta * 5;
        ctx.uniform1f(timeUniformLocation, time);
        ctx.uniform1f(scrollUniformLocation, scroll);
        ctx.clearColor(0, 0, 0, 0);
        ctx.drawArrays(ctx.TRIANGLES, 0, 6);
        requestAnimationFrame(render);
    }

    ctx.enable(ctx.BLEND);
    ctx.blendFunc(ctx.SRC_ALPHA, ctx.ONE_MINUS_SRC_ALPHA);

    requestAnimationFrame(render);
}