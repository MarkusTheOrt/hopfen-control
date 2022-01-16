import time

import board
import neopixel

num_pixels = 48

pixels = neopixel.NeoPixel(board.D18, num_pixels)

def wheel(pos):
  if pos < 0 or pos > 255:
    return (0,0,0)
  if pos < 85:
    return (255 - pos * 3, pos * 3, 0)
  if pos < 170:
    pos -= 85
    return (0, 255 - pos * 3, pos * 3)
  pos-=170
  return(pos * 3, 0, 255 - pos * 3)

def color_chase(color, wait):
  for i in range(num_pixels):
    pixels[i] = color
    time.sleep(wait)
    pixels.write()
    time.sleep(0.5)

def rainbow_cycle():
  for j in range(255):
    for i in range(num_pixels):
      rc_index = (i * 256 // num_pixels) + j
      pixels[i] = wheel(rc_index & 255)
    pixels.write()

RED = (255, 0, 0)
YELLOW = (255, 150, 0)
GREEN = (0, 255, 0)
CYAN = (0, 255, 255)
BLUE = (0, 255, 255)
PURPLE = (180, 0, 255)

while True:
  pixels.fill(RED)
  pixels.show()
  time.sleep(1)
  pixels.fill(GREEN)
  pixels.show()
  time.sleep(1)
  pixels.fill(BLUE)
  pixels.show()
  time.sleep(1)

  color_chase(RED, 0.1)
  color_chase(YELLOW, 0.1)
  color_chase(GREEN, 0.1)
  color_chase(CYAN, 0.1)
  color_chase(BLUE, 0.1)
  color_chase(PURPLE, 0.1)

  rainbow_cycle(0.05)