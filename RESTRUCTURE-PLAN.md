# Wix Replica Restructure Plan

## Critical Issues to Fix

### 1. Background Color ✅ COMPLETED
- Changed from `#0A1628` (blue) to `rgb(20, 20, 22)` (black)
- Updated all rgba variants

### 2. Section Frame Structure - NEEDS COMPLETE REDESIGN

#### Current Problem:
- Sections use `.section-columns` with two separate columns
- Each column has its own border creating "two frames together"
- Cards are displayed horizontally in a grid

#### Required Solution:
- ONE continuous frame per section
- Frame is divided internally by thin white borders
- Left side NARROWER than right side
- Cards stacked VERTICALLY on the right side
- Staggered positioning for cards

#### Implementation Strategy:
```html
<section class="section">
    <div class="section-frame">
        <!-- Single container with one border around entire section -->
        <div class="frame-left">
            <!-- Narrower left column with image -->
        </div>
        <div class="frame-divider"></div>
        <!-- Thin vertical white border separator -->
        <div class="frame-right">
            <!-- Wider right column with vertically stacked cards -->
        </div>
    </div>
</section>
```

### 3. Transform Section - COMPLETELY WRONG

#### Current Problem:
- Images too big and splitting
- Creating 3 separate vertical frames
- Not rendering correctly

#### Required Solution:
- Properly sized images that fit within the frame
- Single frame with left-right division
- Images on left, text on right (or vice versa)
- No separate frames below

### 4. Experience and Reach Stats Section

#### Current Problem:
- Wrapped in bordered frame container
- No parallax effect

#### Required Solution:
- NO frame/border around stats
- Stats sit directly on background image
- Horizontal parallax scrolling effect on background image when scrolling vertically
- Image creates illusion of horizontal movement

### 5. Video Section - ARCHITECTURE COMPLETELY WRONG

#### Current Problem:
- Using embedded `<video>` element in container
- Showing 2 stacked videos (red sphere, black sphere)

#### Required Solution:
- Single continuous frame divided by thin white border
- LEFT column: Background image with semi-transparent video overlay (red spikes/particles)
- RIGHT column: Text content on background image
- Video is nearly transparent, blending with background
- Only red particles/spikes visible in motion
- Creates effect where sphere outline is visible but particles are animated

## CSS Architecture Changes Needed

### Frame System
```css
.section-frame {
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    display: grid;
    grid-template-columns: 705px 1px 1056px; /* left | divider | right */
    background: rgba(20, 20, 22, 0.7);
    backdrop-filter: blur(30px);
}

.frame-left {
    /* Narrower left side */
    padding: 60px 40px;
}

.frame-divider {
    /* Thin white vertical line */
    width: 1px;
    background: rgba(255, 255, 255, 0.15);
}

.frame-right {
    /* Wider right side with vertical card stack */
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}
```

### Vertical Card Layout
```css
.feature-cards {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.feature-card {
    /* Remove grid layout */
    /* Add staggered positioning with nth-child */
}

.feature-card:nth-child(odd) {
    margin-left: 20px;
}

.feature-card:nth-child(even) {
    margin-right: 20px;
}
```

### Stats Section - No Frame
```css
.stats-section {
    /* Remove border, backdrop-filter */
    background: transparent;
    position: relative;
    overflow: hidden;
}

.stats-background {
    position: absolute;
    width: 120%;
    height: 100%;
    background-image: url('../img/stats-bg.jpg');
    /* Parallax effect using transform on scroll */
}
```

### Video Section - Background Video
```css
.video-frame {
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
}

.video-column-left {
    position: relative;
    background-image: url('../img/video-bg.jpg');
    overflow: hidden;
}

.video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6; /* Semi-transparent */
    mix-blend-mode: screen; /* Blend with background */
}

.video-column-right {
    background-image: url('../img/video-text-bg.jpg');
    padding: 60px 40px;
}
```

## Implementation Order

1. ✅ Fix background colors (DONE)
2. Redesign main section frame structure
3. Convert cards to vertical stacked layout
4. Fix Transform section structure and image sizing
5. Remove stats section frame, add parallax effect
6. Rebuild video section with background video architecture
7. Test all sections match original

## Notes

- Wix site doesn't use standard CSS borders - may use SVG or image overlays
- Our replica uses CSS borders which is acceptable approximation
- Focus on achieving the visual effect even if implementation differs
- Maintain responsive design throughout changes
