/**
 * 创建着色器
 * @param {*} gl 渲染上下文
 * @param {*} type 着色器类型
 * @param {*} source 数据源 glsl 
 * @returns shader
 */
export const createShader = (gl, type, source) => {
    const shader = gl.createShader(type) // 着色器对象生成
    gl.shaderSource(shader, source) // 数据源关联
    gl.compileShader(shader) // 编译生成着色器

    const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    // 如果创建成功，则返回 shader
    if (status) {
        return shader
    }

    gl.deleteShader(shader)
}

/**
 * 生成着色器程序
 * @param {*} gl 渲染上下文
 * @param {*} vertexShader 顶点着色器
 * @param {*} fragmentShader 片段着色器
 * @returns 着色器程序
 */
export const createProgram = (gl, vertexShader, fragmentShader) => {

    const program = gl.createProgram()  // 创建着色器程序并链接 shader
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program)

    const status = gl.getProgramParameter(program, gl.LINK_STATUS)

    if (status) {
        return program
    }

    gl.deleteProgram(program)
}

/**
 * 创建 buffer
 * @param {*} bufferData 
 * @returns buffer
 */
export const createArrayBuffer = (gl, bufferData) => {
    const buffer = gl.createBuffer() // 创建缓冲对象
    // WebGL可以通过绑定点操控全局范围内的许多数据
    // 绑定一个数据源到绑定点，就可以引用绑定点指向该数据源（即：ARRAY_BUFFER指向缓冲数据 positionBuffer）
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    // Q: 为什么要返回 positionBuffer 对象，它包含了什么？？
    // A: 通过bindBuffer，ARRAY_BUFFER 指向 positionBuffer，然后 bufferData() 方法复制这些数据到了缓冲对象上，也就完成了缓冲数据的绑定
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData), gl.STATIC_DRAW)
    return buffer
}