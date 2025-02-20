"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { RotateCcw, Play, Pause, ZoomIn, ZoomOut, RotateCw, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ThreeSixtyViewProps {
  images: string[]
  width: number
  height: number
  autoRotate?: boolean
  autoRotateSpeed?: number
}

export default function ThreeSixtyView({
  images,
  width,
  height,
  autoRotate = false,
  autoRotateSpeed = 50, // ms per frame
}: ThreeSixtyViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoRotate)
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const loadedImages = useRef<HTMLImageElement[]>([])
  const autoRotateInterval = useRef<NodeJS.Timeout>()
  const lastTouchDistance = useRef<number>(0)

  const renderFrame = useCallback(
    (frameIndex: number, scale: number = zoom) => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (!canvas || !ctx || !loadedImages.current[frameIndex]) return

      const img = loadedImages.current[frameIndex]
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate centered position for zoomed image
      const scaledWidth = img.width * scale
      const scaledHeight = img.height * scale
      const x = (canvas.width - scaledWidth) / 2
      const y = (canvas.height - scaledHeight) / 2

      ctx.drawImage(img, x, y, scaledWidth, scaledHeight)
    },
    [zoom],
  )

  // Load images with progress tracking
  useEffect(() => {
    let mounted = true
    const loadImages = async () => {
      try {
        const loadedCount = { current: 0 }
        const imagePromises = images.map((src) => {
          return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image()
            img.crossOrigin = "anonymous"
            img.src = src
            img.onload = () => {
              if (mounted) {
                loadedCount.current++
                setLoadingProgress((loadedCount.current / images.length) * 100)
                resolve(img)
              }
            }
            img.onerror = reject
          })
        })

        loadedImages.current = await Promise.all(imagePromises)
        if (mounted) {
          setIsLoading(false)
          renderFrame(0)
        }
      } catch (error) {
        console.error("Error loading images:", error)
        if (mounted) setIsLoading(false)
      }
    }

    loadImages()
    return () => {
      mounted = false
    }
  }, [images, renderFrame])

  // Auto-rotation handler
  useEffect(() => {
    if (isAutoPlaying && !isDragging) {
      autoRotateInterval.current = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % images.length)
        renderFrame((currentFrame + 1) % images.length)
      }, autoRotateSpeed)
    }

    return () => {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current)
      }
    }
  }, [isAutoPlaying, isDragging, currentFrame, images.length, autoRotateSpeed, renderFrame])

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setIsAutoPlaying(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const diff = e.clientX - startX
    const frameCount = images.length
    const frameDiff = Math.floor(diff / 10) % frameCount
    const newFrame = (currentFrame + frameDiff + frameCount) % frameCount

    if (newFrame !== currentFrame) {
      setCurrentFrame(newFrame)
      renderFrame(newFrame)
      setStartX(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      setStartX(e.touches[0].clientX)
      setIsAutoPlaying(false)
    } else if (e.touches.length === 2) {
      // Store initial distance between two fingers for pinch zoom
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      lastTouchDistance.current = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      const diff = e.touches[0].clientX - startX
      const frameCount = images.length
      const frameDiff = Math.floor(diff / 10) % frameCount
      const newFrame = (currentFrame + frameDiff + frameCount) % frameCount

      if (newFrame !== currentFrame) {
        setCurrentFrame(newFrame)
        renderFrame(newFrame)
        setStartX(e.touches[0].clientX)
      }
    } else if (e.touches.length === 2) {
      // Handle pinch zoom
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY)

      const deltaDistance = distance - lastTouchDistance.current
      const deltaZoom = deltaDistance * 0.01

      setZoom((prevZoom) => Math.min(Math.max(prevZoom + deltaZoom, 1), 3))
      lastTouchDistance.current = distance
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Zoom handlers
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1))
  }

  useEffect(() => {
    renderFrame(currentFrame)
  }, [currentFrame, renderFrame])

  // Fullscreen handlers
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  return (
    <div ref={containerRef} className="relative flex flex-col items-center gap-4 p-4">
      <div className="relative">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="mt-2 text-sm text-muted-foreground">Loading... {Math.round(loadingProgress)}%</p>
          </div>
        ) : null}
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className={`cursor-grab touch-none ${isDragging ? "cursor-grabbing" : ""}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>

      {/* Controls */}
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <TooltipProvider>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setIsAutoPlaying(!isAutoPlaying)}>
                  {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isAutoPlaying ? "Pause rotation" : "Auto-rotate"}</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setCurrentFrame(0)
                    renderFrame(0)
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset position</TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={zoom <= 1}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom out</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={zoom >= 3}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom in</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        <div className="flex w-full max-w-xs items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          <Slider
            value={[currentFrame]}
            max={images.length - 1}
            step={1}
            onValueChange={([value]) => {
              setCurrentFrame(value)
              renderFrame(value)
            }}
          />
          <RotateCw className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}

