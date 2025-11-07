# FINAL CORRECT WIX STRUCTURE ANALYSIS

## KEY DISCOVERY: NO FRAMES AT ALL!

After careful re-inspection of the actual Wix site, I now understand the fundamental mistake:

**THE WIX SITE DOES NOT USE BORDERED FRAMES AT ALL!**

All sections are simple layouts with:
- Black background `rgb(20, 20, 22)`
- Images positioned absolutely or in grid layouts
- Text overlaid on images using absolute positioning
- NO borders, NO glassmorphism effects, NO framed containers

## SECTION 1: HERO (y: 0-1240)

**Structure:**
- Large background image: 1975x1579 at x:-35, y:-168 (fills screen with overflow)
- H1 heading "Custom Built Machine Learning Models..." at x:71, y:217, width:846

**Layout:** Full-width background image with heading overlay

---

## SECTION 2: MAIN FEATURE SECTION (y: 1240-2339)

**Left Side - Image with Text Overlay:**
- Image: 846x1191 at x:68, y:1240
- H2 "Empower Your Business..." at x:282, y:1431 (OVER the image, +191px from image top)
- Text description overlaid on image below heading

**Right Side - Feature Cards:**
- Card 1: "Innovative Solutions..." at x:1061, y:1259
- Card 2: "Data Science Expertise..." at x:1316, y:1586
- Card 3: "Tailored Machine Learning..." at x:1061, y:1878
- Card 4: "Comprehensive Customer..." at x:1316, y:2179

**Grid Layout:**
- Left column: ~850px wide (image with overlay)
- Right column: ~520px wide (cards in 2x2 grid)
- Cards arranged in staggered vertical layout

---

## SECTION 3: TRANSFORM & STATS (y: 2339-3777)

**ONE TALL IMAGE:** 880x1438 at x:71, y:2339

**Text Overlays on Same Image:**
1. **Transform heading** at x:282, y:3016 (+677px from image top)
   - H2 "Transform Your Construction Business..."
   - Description text below

2. **Stats heading** at x:626, y:3541 (+1202px from image top)
   - H2 "Experience and Reach"
   - Stats grid with numbers and descriptions

**Critical:** This is ONE continuous section with ONE image, not two separate sections!

---

## SECTION 4: PARTNERSHIP LOGOS (y: 3458-4353)

**Structure:**
- Wide background image: 2286x895 at x:-8, y:3458
- Partnership logo at x:900, y:4323 (64x101)
- H2 "Our Collaborative Partnerships" at x:182, y:4319

**Layout:** Background image with centered logos and text

---

## SECTION 5: VIDEO SECTION (y: 4457-5364)

**Background Layer:**
- Large image: 1374x907 at x:-88, y:4457 (background with overflow)

**Foreground Layer:**
- Red sphere image: 500x500 at x:349, y:4661
- Video element: 300x150 at x:349, y:661 with **opacity:0** (HIDDEN!)

**Right Side Text:**
- H2 "Empower Your Construction Business..." at x:383, y:4869

**Critical Discovery:**
- Only ONE video element exists
- Video has opacity:0 (completely invisible)
- What's visible is the STATIC red sphere IMAGE at 500x500
- Video parent container is 500x500 matching the image size

**Layout:**
- Background image (left side, wider)
- Red sphere static image overlaid at x:349
- Text content on right side
- NO video actually visible (opacity:0)

---

## CORRECT IMPLEMENTATION STRATEGY

### 1. Remove ALL Borders and Frames
- Delete all `.section-frame`, `.frame-divider`, glassmorphism CSS
- Simple layout with black background
- No backdrop-filter, no borders, no rounded corners

### 2. Main Feature Section
```html
<section class="main-feature-section">
    <div class="feature-grid">
        <div class="left-with-overlay">
            <img src="left-section.jpg" alt="">
            <div class="text-overlay">
                <h2>Empower Your Business...</h2>
                <p>Description...</p>
            </div>
        </div>
        <div class="feature-cards-grid">
            <!-- 4 cards in 2x2 layout -->
        </div>
    </div>
</section>
```

### 3. Transform + Stats Section (ONE SECTION!)
```html
<section class="transform-stats-section">
    <div class="single-tall-image">
        <img src="tall-image.jpg" alt="">
        <div class="transform-overlay" style="top: 677px;">
            <h2>Transform Your Construction...</h2>
            <p>Description...</p>
        </div>
        <div class="stats-overlay" style="top: 1202px;">
            <h2>Experience and Reach</h2>
            <div class="stats-grid">
                <!-- stats items -->
            </div>
        </div>
    </div>
</section>
```

### 4. Video Section (NO VISIBLE VIDEO!)
```html
<section class="video-section">
    <div class="video-layout">
        <div class="left-visual">
            <img src="video-bg.jpg" class="background-image" alt="">
            <img src="red-sphere.png" class="red-sphere-overlay" alt="">
            <!-- Video element with opacity:0 can be included but won't be visible -->
        </div>
        <div class="right-text">
            <h2>Empower Your Construction...</h2>
            <p>Description...</p>
        </div>
    </div>
</section>
```

---

## CSS ARCHITECTURE

```css
body {
    background: rgb(20, 20, 22);
    color: white;
}

/* Main Feature Section */
.feature-grid {
    display: grid;
    grid-template-columns: 850px 1fr;
    gap: 80px;
    max-width: 1800px;
    margin: 0 auto;
    padding: 100px 40px;
}

.left-with-overlay {
    position: relative;
    width: 846px;
    height: 1191px;
}

.left-with-overlay img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.text-overlay {
    position: absolute;
    top: 191px;
    left: 214px;
    max-width: 340px;
}

.feature-cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 100px 60px;
    align-content: start;
}

/* Transform + Stats Section */
.single-tall-image {
    position: relative;
    width: 880px;
    height: 1438px;
    margin: 0 auto;
}

.transform-overlay {
    position: absolute;
    top: 677px;
    left: 211px;
    max-width: 457px;
}

.stats-overlay {
    position: absolute;
    top: 1202px;
    left: 0;
    right: 0;
    text-align: center;
    padding: 0 100px;
}

/* Video Section */
.video-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;
    max-width: 1800px;
    margin: 0 auto;
    padding: 100px 40px;
}

.left-visual {
    position: relative;
}

.background-image {
    width: 100%;
    height: auto;
}

.red-sphere-overlay {
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 500px;
}
```

---

## WHAT I DID WRONG BEFORE

1. ❌ Added borders and glassmorphism effects that don't exist
2. ❌ Created separate Transform and Stats sections (it's ONE section!)
3. ❌ Tried to show the video (it's opacity:0 and invisible!)
4. ❌ Over-complicated the layout with frames and dividers
5. ❌ Didn't measure exact positions of overlaid text

## WHAT'S CORRECT NOW

1. ✅ No borders, no frames, simple black background
2. ✅ One tall image for Transform+Stats with two text overlays
3. ✅ Video section uses static red sphere image, not video
4. ✅ Exact positioning measurements from inspection
5. ✅ Simple grid layouts, no complex frame structures
