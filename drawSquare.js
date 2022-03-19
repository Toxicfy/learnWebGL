import { createShader, createProgram, createArrayBuffer } from './createUtils.js'

// 确认渲染的位置
const vertexShaderSource = `
    attribute vec4 myVertexPosition;
    void main() {
        gl_Position = myVertexPosition
    }
`
// 确定渲染的颜色
const fragmentShaderSource = `
    void main() {
        gl_FragColor = vec4(1.0, 0, 0.5, 0.5)
`

const main = () => {
    const canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    const gl = canvas.getContext('webgl')

    gl.clearColor(0, 0, 0, 0.1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

    console.log(vertexShader, fragmentShader);
    // 通过 shader 创建 着色器程序
    const program = createProgram(gl, vertexShader, fragmentShader)
    gl.useProgram(program)

    // 创建缓冲器存储对象的顶点
    const position = [
        0, 0,
        0, 0.5,
        0.7, 0.5,
        0.7, 0,
    ]
    createArrayBuffer(gl, position)

    // 指定 attribute 如何从 buffer 中读取数据
    const location = gl.getAttribLocation(program, 'myVertexPosition') // 获取指向位置
    const size = 2 // 每次读取几个单位的数据
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0 // 起始位置偏移多少
    gl.vertexAttribPointer(location, size, type, normalize, stride, offset)

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

export default main