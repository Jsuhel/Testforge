<#
 * Regenerates every TestForge logo/favicon raster from the same geometry as
 * components/ui/Logo.tsx (run: powershell -File scripts/generate-logo-assets.ps1).
 * The mark: forward-leaning T (skewX(-8)) breaking out of a tilted orbit
 * (-24 degrees) with a satellite node. White letter, voltage-blue #405bff
 * orbit, two flat colors, transparent background.
#>
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.IO

$ErrorActionPreference = 'Stop'
$proj = Split-Path $PSScriptRoot -Parent

# site palette
$blue = [System.Drawing.Color]::FromArgb(255, 64, 91, 255)      # #405bff voltage
$dimBlue = [System.Drawing.Color]::FromArgb(128, 64, 91, 255)   # far side of the ring
$white = [System.Drawing.Color]::White
$glint = [System.Drawing.Color]::FromArgb(255, 234, 249, 255)

# --- geometry constants (64-space, mirrors components/ui/Logo.tsx) ----------
$CX = 32.0; $CY = 33.0; $RX = 27.0; $RY = 11.5; $TILT = -24.0
$skewTan = [math]::Tan(-8 * [math]::PI / 180)   # skewX(-8)
function Tx([double]$x, [double]$y) {
  $nx = $x + 4.5 + ($skewTan * $y)
  return (New-Object System.Drawing.PointF([float]$nx, [float]$y))
}

$crossbar = @((Tx 13 15), (Tx 56 15), (Tx 49.5 26), (Tx 6.5 26))
$stem = @((Tx 31.5 26), (Tx 41.5 26), (Tx 36.5 52.5), (Tx 30.5 52.5))

$nodeT = 25 * [math]::PI / 180
$nodeX = $CX + $RX * [math]::Cos($nodeT)
$nodeY = $CY + $RY * [math]::Sin($nodeT)

function Draw-Mark([int]$size) {
  $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.ScaleTransform($size / 64.0, $size / 64.0)

  $ringPen = New-Object System.Drawing.Pen($blue, 2.6)
  $ringPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $ringPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $letterBrush = New-Object System.Drawing.SolidBrush($white)

  $ringRect = New-Object System.Drawing.RectangleF([float](-$RX), [float](-$RY), [float](2*$RX), [float](2*$RY))

  # --- far side of the orbit, behind the letter (dimmer) ---
  $st = $g.Save(); $g.TranslateTransform($CX, $CY); $g.RotateTransform($TILT)
  $dimPen = New-Object System.Drawing.Pen($dimBlue, 2.6)
  $dimPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $dimPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawArc($dimPen, $ringRect, 180, 180)
  $g.Restore($st); $dimPen.Dispose()

  # --- the monogram ---
  $g.FillPolygon($letterBrush, $crossbar)
  $g.FillPolygon($letterBrush, $stem)

  # --- near side of the orbit, in front + satellite ---
  $st2 = $g.Save(); $g.TranslateTransform($CX, $CY); $g.RotateTransform($TILT)
  $g.DrawArc($ringPen, $ringRect, 0, 180)
  $g.FillEllipse((New-Object System.Drawing.SolidBrush($blue)), [float]($nodeX - 2.7), [float]($nodeY - 2.7), 5.4, 5.4)
  $g.FillEllipse((New-Object System.Drawing.SolidBrush($glint)), [float]($nodeX - 1.5), [float]($nodeY - 1.5), 1.6, 1.6)
  $g.Restore($st2)

  $ringPen.Dispose(); $letterBrush.Dispose(); $g.Dispose()
  return $bmp
}

# supersampled render for small sizes: draw big, shrink with bicubic
function Draw-Mark-HQ([int]$size) {
  if ($size -ge 128) { return Draw-Mark $size }
  $big = Draw-Mark ($size * 8)
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

$out512 = Draw-Mark 512
Save-Png $out512 "$proj\public\logo.png"
$out512.Save("$proj\app\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "saved $proj\app\icon.png  (512x512)"
$out512.Dispose()

Save-Png (Draw-Mark 180) "$proj\app\apple-icon.png"
Save-Png (Draw-Mark-HQ 128) "$proj\public\logo-128.png"
Save-Png (Draw-Mark-HQ 64) "$proj\public\favicon.png"

# --- favicon.ico: 16/32/48 PNG entries in an ICO container -------------------
$sizes = @(16, 32, 48)
$blobs = @()
foreach ($s in $sizes) {
  $b = Draw-Mark-HQ $s
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
