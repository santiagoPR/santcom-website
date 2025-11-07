# Correct Wix Site Structure - Detailed Analysis

## CRITICAL FINDINGS FROM INSPECTION

### 1. Main Feature Section ("Empower Your Business")

**ACTUAL STRUCTURE:**
- LEFT SIDE (705px width): Image with TEXT OVERLAY on top
  - Image: `c837a6_eb322a4179e54d788eef68...` (846x1191)
  - Heading "Empower Your Business..." positioned at x:282, y:231 (OVER the image)
  - Description text also overlaid on the image
  - Image parent at x:71, width 705 (LEFT column)

- RIGHT SIDE (wider): Feature cards in vertical stack
  - Feature card text at x:1060, x:1315 (RIGHT side)
  - Cards are separate from image, not overlaid

**WHAT I DID WRONG:**
- Put ALL text on the right side
- Put image on left without text overlay
- Need to position heading and intro text OVER the left image

**CORRECT FIX:**
```html
<div class="section-frame">
    <div class="frame-left with-text-overlay">
        <img src="left-section.jpg">
        <div class="text-overlay">
            <h2>Empower Your Business...</h2>
            <p>Santcom is dedicated...</p>
        </div>
    </div>
    <div class="frame-divider"></div>
    <div class="frame-right">
        <!-- Feature cards here -->
    </div>
</div>
```

### 2. Transform Section & Stats Section

**ACTUAL STRUCTURE:**
- ONE SINGLE TALL IMAGE spans both sections
  - Image: `c837a6_41aece62e57346379d1201...`
  - Dimensions: 880x1438 (or 880x1222 depending on scroll)
  - Position: x:71, starts at y:246
  - Height: 1222-1438px (spans ~1200px vertically)

- Transform heading at y:816 (overlays TOP portion of image)
- Experience and Reach heading at y:1341 (overlays BOTTOM portion of same image)

**THE IMAGE IS ON THE LEFT, TEXT IS OVERLAID ON IT**

**WHAT I DID WRONG:**
- Created TWO separate images
- Put images in their own container, text separate
- The user said "top red image" - I need to verify if there's actually a red image

**CORRECT FIX:**
- ONE tall background image
- Transform text overlaid on top portion
- Stats text and numbers overlaid on bottom portion
- Image has horizontal parallax scroll effect

### 3. Video Section

**ACTUAL STRUCTURE:**
Found 2 images + 1 video:
1. Background image: `c837a6_0f9a4576e86442e3b124952322acdd72...` (1302x860)
   - Position: x:-51, y:480
   - This is the background layer

2. Video poster/static image: `c837a6_159e86d4444649fcada7bff77ae670ad...` (500x500)
   - Position: x:349, y:660
   - This shows the red sphere outline

3. Video element: opacity:0, position:absolute
   - Same position as image #2
   - 720p mp4 file
   - The video is INVISIBLE (opacity:0)!

**THE VIDEO ISN'T SHOWING - IT'S AN IMAGE!**
The "video" section is actually:
- Background image (wider landscape)
- Red sphere static image on top
- Actual video is hidden (opacity:0)

**WHAT I DID WRONG:**
- Tried to show the video with transparency
- The video is actually HIDDEN
- It's the POSTER IMAGE that shows the red sphere

**CORRECT FIX:**
- Background image layer
- Red sphere image overlaid (not video)
- Video can be included but set to opacity:0 or just use the static image

## LAYOUT PATTERN

ALL sections follow this pattern:
- LEFT SIDE: Image (705-880px width)
- RIGHT SIDE: Text content (wider)
- NO FRAMES/BORDERS visible in Wix
- Text is OVERLAID on images using absolute positioning
- Single continuous layout, not separate bordered frames

## What User Meant by "Text on Top of Images on Left"

The user was RIGHT - in EVERY section:
- Image is on the LEFT
- Text is positioned OVER the image (z-index layering)
- NOT separate columns with borders

## Action Plan

1. Remove all `.section-frame` bordered containers
2. Use absolute positioning to overlay text on images
3. Main section: Image left, text overlay on image + feature cards right
4. Transform/Stats: ONE tall image on left, text overlaid at different heights
5. Video: Background image + static red sphere image (no visible video)
