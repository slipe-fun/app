import React, { useRef, useMemo, useCallback, useEffect } from 'react'
import { GLView } from 'expo-gl'
import vertexShader from '@constants/shaders/vertexShader'
import fragmentShader from '@constants/shaders/fragmentShader'

const MAX_COLORS = 16

const parseColors = colors => {
  const arr = new Float32Array(MAX_COLORS * 3)
  for (let i = 0; i < Math.min(colors.length, MAX_COLORS); i++) {
    const hex = colors[i].replace('#', '')
    arr[i * 3 + 0] = parseInt(hex.slice(0, 2), 16) / 255
    arr[i * 3 + 1] = parseInt(hex.slice(2, 4), 16) / 255
    arr[i * 3 + 2] = parseInt(hex.slice(4, 6), 16) / 255
  }
  return arr
}

const ShaderShi = ({
  style,
  colors,
  speed = 0.5,
  amp = 1.0,
  freq = 3.0,
  brightness = 1.0,
  blendMode = 'average'
}) => {
  const time = useRef(0)
  const frame = useRef(null)

  const colorArray = useMemo(() => {
    const c = (colors || []).slice(0, MAX_COLORS)
    if (c.length < 2) c.push('#ffffff')
    return parseColors(c)
  }, [colors])

  const colorCount = useMemo(() => Math.min(colors?.length || 0, MAX_COLORS), [colors])
  const blendModeCode = blendMode === 'additive' ? 1 : 0

  const onContextCreate = useCallback(async gl => {
    const w = gl.drawingBufferWidth
    const h = gl.drawingBufferHeight

    const vShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vShader, vertexShader)
    gl.compileShader(vShader)

    const fShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fShader, fragmentShader)
    gl.compileShader(fShader)

    const program = gl.createProgram()
    gl.attachShader(program, vShader)
    gl.attachShader(program, fShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    const pos = gl.getAttribLocation(program, 'position')
    const u_time = gl.getUniformLocation(program, 'u_time')
    const u_speed = gl.getUniformLocation(program, 'u_speed')
    const u_amp = gl.getUniformLocation(program, 'u_amp')
    const u_freq = gl.getUniformLocation(program, 'u_freq')
    const u_brightness = gl.getUniformLocation(program, 'u_brightness')
    const u_colorCount = gl.getUniformLocation(program, 'u_colorCount')
    const u_colors = gl.getUniformLocation(program, 'u_colors')
    const u_blendMode = gl.getUniformLocation(program, 'u_blendMode')

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1, 1, 1
    ]), gl.STATIC_DRAW)

    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)
    gl.viewport(0, 0, w, h)

    gl.uniform1f(u_speed, speed)
    gl.uniform1f(u_amp, amp)
    gl.uniform1f(u_freq, freq)
    gl.uniform1f(u_brightness, brightness)
    gl.uniform1i(u_colorCount, colorCount)
    gl.uniform3fv(u_colors, colorArray)
    gl.uniform1i(u_blendMode, blendModeCode)

    const render = () => {
      time.current += 0.016
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(u_time, time.current)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      gl.endFrameEXP()
      frame.current = requestAnimationFrame(render)
    }

    render()
  }, [speed, amp, freq, brightness, colorCount, colorArray, blendModeCode])

  useEffect(() => {
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [])

  return <GLView style={style} onContextCreate={onContextCreate} />
}

export default ShaderShi