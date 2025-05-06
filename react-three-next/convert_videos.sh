#!/bin/bash

# Array of your video files
videos=(
  "coastal1.1.mp4"
  "Coastal1.2.mp4"
  "Coastal1.3.mp4"
  "Coastal1.4.mp4"
  "Coastal1.5.mp4"
  "Coastal1.6.mp4"
)

# Create output directory if it doesn't exist
mkdir -p public/videos/converted

# Convert each video
for video in "${videos[@]}"; do
  input="public/videos/$video"
  output="public/videos/converted/${video%.*}_converted.mp4"

  echo "Converting $input to $output"

  ffmpeg -i "$input" \
    -c:v libx264 \
    -profile:v high \
    -pix_fmt yuv420p \
    -c:a aac \
    -movflags +faststart \
    "$output"
done

echo "All conversions complete!"
