const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
const gl = canvas.getContext('webgl')

const vsGLSL = `
    attribute vec4 position;
    void main() {
        gl_Position = position;
    }
`
const fsGLSL = `
    precision highp float;
    void main() {
        gl_FragColor = vec4(0,1,0.5,1);
    }
`

const vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, vsGLSL)
gl.compileShader(vertexShader)

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, fsGLSL)
gl.compileShader(fragmentShader)

const prg = gl.createProgram()
gl.attachShader(prg, vertexShader)
gl.attachShader(prg, fragmentShader)
gl.linkProgram(prg)

// attribute vec4 position
// 每一个 attribute 变量都有一个位置值，在 program 被 link 前，可以 bind，之后可以 get，这样就可以建立 attribute 变量与顶点属性的联系
const positionLoc = gl.getAttribLocation(prg, 'position')
const vertexPositions = new Float32Array([ // 裁剪空间
    0, 0.7,
    0.5, -0.7,
    -0.5, -0.7
])
const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, vertexPositions, gl.STATIC_DRAW)

gl.enableVertexAttribArray(positionLoc)
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0) // 指定读取规则
gl.useProgram(prg)
const renderCount = 3
gl.drawArrays(gl.TRIANGLES, 0, renderCount)