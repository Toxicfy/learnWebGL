import { createShader, createProgram } from './createShader&Program'

const initBuffer = (gl) => {
    // 创建缓冲对象
    const positionBuffer = gl.createBuffer()
    // WebGL可以通过绑定点操控全局范围内的许多数据
    // 绑定一个数据源到绑定点，就可以引用绑定点指向该数据源（即：ARRAY_BUFFER指向缓冲数据 positionBuffer）
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    const vertices = [
        1.0, 1.0, 0.0,
        -1.0, 1.0, 0.0,
        1.0, -1.0, 0.0,
        -1.0, -1.0, 0.0
    ]
    // 通过绑定点（gl.ARRAY_BUFFER）向缓冲（positionBuffer）存放数据
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    return {
        // Q: 为什么要返回 positionBuffer 对象，它包含了什么？？
        // A: 通过bindBuffer，ARRAY_BUFFER 指向 positionBuffer，然后 bufferData() 方法复制这些数据到了缓冲对象上，也就完成了缓冲数据的绑定
        position: positionBuffer
    }

}