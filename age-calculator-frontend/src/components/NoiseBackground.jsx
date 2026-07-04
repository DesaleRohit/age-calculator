import { useEffect, useRef } from 'react'

function NoiseBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    function draw() {
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width
      canvas.height = height
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'

      const pointCount = 60000
      for (let i = 0; i < pointCount; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        ctx.fillRect(x, y, 0.6, 0.6)
      }
    }

    draw()

    let resizeTimeout
    function handleResize() {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(draw, 150)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return <canvas ref={canvasRef} className="noise-canvas" aria-hidden="true" />
}

export default NoiseBackground
