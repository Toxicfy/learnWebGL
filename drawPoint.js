/**
 * 想法：glsl 中内置了一些变量，直接可以使用，不需要申明
 */
const canvas = document.createElement('canvas')

const gl = canvas.getContext('webgl') // 获取 webgl 上下文

// 指定顶点、片元着色器源
// gl_Position 是一个顶点着色器主要设置的变量
const vertexShaderSource = `
    void main() {
        gl_PointSize = 20.0; // 像素大小
        gl_position = vec4(0.0, 0.0, 0.0, 1.0); // 指定位置在原点
    }
`
// gl_FragColor是一个片元着色器主要设置的变量
const fragmentShaderSource = `
    void main() {
        //  颜色范围 [0,1], 类似于 rgba
        gl_FragColor = vec4(1, 0, 0.5, 1);
    }
`

const initShader = (gl, vertexShaderSource, fragmentShaderSource) => {
  let vertexShader = gl.createShader(gl.VERTEX_SHADER)
  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

  gl.shaderSource(vertexShader, vertexShaderSource)
  gl.shaderSource(fragmentShader, fragmentShaderSource)

  // 编译
  gl.compileShader(vertexShader)
  gl.compileShader(fragmentShader)

  // 创建 program, 并挂载着色器
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.useProgram(program)

  return program
}

const program = initShader(gl, vertexShaderSource, fragmentShaderSource)
gl.drawArrays(gl.POINTS, 0, 1)
