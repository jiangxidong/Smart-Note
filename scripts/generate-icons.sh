#!/bin/bash

# Create assets directory if it doesn't exist
mkdir -p assets

# Convert SVG to different sized PNGs
for size in 16 32 48 128; do
    convert assets/icon.svg -resize ${size}x${size} assets/icon${size}.png
done 