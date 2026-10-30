<#
 * Regenerates every TestForge favicon raster from the same mark as
 * components/ui/Logo.tsx and app/icon.svg (run:
 * powershell -File scripts/generate-logo-assets.ps1).
 * Tile: rounded #4F46E5 square, flow lines #A5B4FC, middle line #FFFFFF,
 * check #FBBF24, mark centered with padding. All marks share the exact
 * curves, stroke widths (8/8/8/9) and round caps of the spec.
#>
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.IO

$ErrorActionPreference = 'Stop'
$proj = Split-Path $PSScriptRoot -Parent

# favicon tile palette (matches app/icon.svg)
$tile   = [System.Drawing.Color]::FromArgb(255, 79, 70, 229)    # #4F46E5
$outer  = [System.Drawing.Color]::FromArgb(255, 165, 180, 252)  # #A5B4FC
$middle = [System.Drawing.Color]::White                          # #FFFFFF
$check  = [System.Drawing.Color]::FromArgb(255, 251, 191, 36)   # #FBBF24

function New-Pen([System.Drawing.Color]$color, [float]$width) {
  $p = New-Object System.Drawing.Pen($color, $width)
  $p.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $p.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $p.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  return $p
}

# The mark inside its native viewBox (56 64 118 96), fitted into the
# 128-space tile with 14px padding: scale 0.847, offset (14, 23.35).
function Draw-Tile([int]$size) {
  $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.ScaleTransform($size / 128.0, $size / 128.0)

  # rounded-square background
  $rr = New-Object System.Drawing.Drawing2D.GraphicsPath
  $rr.AddArc(0, 0, 56, 56, 180, 90)
  $rr.AddArc(72, 0, 56, 56, 270, 90)
  $rr.AddArc(72, 72, 56, 56, 0, 90)
  $rr.AddArc(0, 72, 56, 56, 90, 90)
  $rr.CloseFigure()
  $g.FillPath((New-Object System.Drawing.SolidBrush($tile)), $rr)
  $rr.Dispose()

  # the mark: three lines merge into one point, then the amber check
  $g.TranslateTransform(14, 23.35)
  $g.ScaleTransform(0.847, 0.847)
  $g.TranslateTransform(-56, -64)

  $pOuter = New-Pen $outer 8.0
  $pMiddle = New-Pen $middle 8.0
  $pCheck = New-Pen $check 9.0

  $b1 = New-Object System.Drawing.Drawing2D.GraphicsPath
  $b1.AddBezier(64, 72, 94, 72, 94, 112, 120, 112)
  $g.DrawPath($pOuter, $b1); $b1.Dispose()

  $b2 = New-Object System.Drawing.Drawing2D.GraphicsPath
  $b2.AddBezier(64, 152, 94, 152, 94, 112, 120, 112)
  $g.DrawPath($pOuter, $b2); $b2.Dispose()

  $l3 = New-Object System.Drawing.Drawing2D.GraphicsPath
  $l3.AddLine(64, 112, 120, 112)
  $g.DrawPath($pMiddle, $l3); $l3.Dispose()

  $ck = New-Object System.Drawing.Drawing2D.GraphicsPath
  $ck.AddLine(120, 112, 136, 128)
  $ck.AddLine(136, 128, 166, 90)
  $g.DrawPath($pCheck, $ck); $ck.Dispose()

  $pOuter.Dispose(); $pMiddle.Dispose(); $pCheck.Dispose(); $g.Dispose()
  return $bmp
}

# supersampled render for small sizes: draw big, shrink with bicubic
function Draw-Tile-HQ([int]$size) {
  if ($size -ge 128) { return Draw-Tile $size }
  $big = Draw-Tile ($size * 8)
  $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.DrawImage($big, 0, 0, $size, $size)
  $g.Dispose(); $big.Dispose()
  return $bmp
}

function Save-Png($bmp, $path) {
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Host "saved $path  ($($bmp.Width)x$($bmp.Height))"
}

Save-Png (Draw-Tile 180) "$proj\app\apple-icon.png"
Save-Png (Draw-Tile-HQ 128) "$proj\public\logo-128.png"
Save-Png (Draw-Tile-HQ 64) "$proj\public\favicon.png"
Save-Png (Draw-Tile 512) "$proj\public\logo.png"

# --- favicon.ico: 16/32/48 PNG entries in an ICO container -------------------
$sizes = @(16, 32, 48)
$blobs = @()
foreach ($s in $sizes) {
  $b = Draw-Tile-HQ $s
  $ms = New-Object System.IO.MemoryStream
  $b.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
  $b.Dispose()
  $blobs += ,$ms.ToArray()
  $ms.Dispose()
}
$icoPath = "$proj\public\favicon.ico"
$fs = [System.IO.File]::Create($icoPath)
$w = New-Object System.IO.BinaryWriter($fs)
$w.Write([uint16]0); $w.Write([uint16]1); $w.Write([uint16]$sizes.Count)
$offset = 6 + 16 * $sizes.Count
for ($i = 0; $i -lt $sizes.Count; $i++) {
  $s = $sizes[$i]; $len = $blobs[$i].Length
  $w.Write([byte]$s); $w.Write([byte]$s); $w.Write([byte]0); $w.Write([byte]0)
  $w.Write([uint16]1); $w.Write([uint16]32); $w.Write([uint32]$len); $w.Write([uint32]$offset)
  $offset += $len
}
foreach ($blob in $blobs) { $w.Write($blob) }
$w.Flush(); $w.Close()
Write-Host "saved $proj\public\favicon.ico  (entries: $($sizes -join '/'))"
