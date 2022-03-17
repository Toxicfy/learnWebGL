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

    gl.completeShader(shader) // 编译生成着色器

    const status = gl.getShaderParameter(shader, gl.COMPLICE_STATUS)

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