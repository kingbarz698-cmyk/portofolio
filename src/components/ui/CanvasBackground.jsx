import { useEffect, useRef } from 'react'

export function CanvasBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Beam {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + 100
        this.len = 200 + Math.random() * 300
        this.speed = 0.4 + Math.random() * 0.6
        this.opacity = 0.06 + Math.random() * 0.1
        this.hue = Math.random() > 0.5 ? 228 : 270
        this.width = 1 + Math.random() * 1.5
      }
      draw() {
        this.y -= this.speed
        if (this.y + this.len < 0) this.reset()
        const grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y - this.len)
        grad.addColorStop(0, `hsla(${this.hue},80%,65%,0)`)
        grad.addColorStop(0.4, `hsla(${this.hue},80%,65%,${this.opacity})`)
        grad.addColorStop(1, `hsla(${this.hue},80%,65%,0)`)
        ctx.strokeStyle = grad
        ctx.lineWidth = this.width
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x, this.y - this.len)
        ctx.stroke()
      }
    }

    const beams = Array.from({ length: 18 }, () => {
      const b = new Beam()
      b.y = Math.random() * canvas.height
      return b
    })

    let raf
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      beams.forEach(b => b.draw())
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}

export default CanvasBackground
