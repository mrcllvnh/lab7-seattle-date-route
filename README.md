# Lab 7 – Seattle Date Route (Afternoon → Evening)

## AI Disclosure
No AI tools were used in this assignment.

## Live Website
https://mrcllvnh.github.io/lab7-seattle-date-route/

---

## Project Overview

This GeoNarrative tells a two-part story of a Seattle date route:

1. **Afternoon – Fremont & Lake Union**
2. **Evening – Capitol Hill**

The story transitions from a calm, scenic lakeside afternoon to a lively urban evening environment. The narrative integrates text, imagery, and interactive mapping to communicate how spatial context shapes mood and experience across time.

---

## GeoNarrative Structure

This project follows the GeoNarrative structure introduced in lecture:

- A fullscreen **cover page**
- A sticky storyboard map container
- Multiple scroll-triggered scenes using `article.scene`
- Scene transitions handled with Scrollama
- A customized Bootstrap footer

Each scene is associated with a map behavior using the `data-scene` attribute and JavaScript event handling.

---

## Data

The stop locations are stored in:

`data/stops.geojson`

This is an author-created geospatial dataset that includes:

- Point geometries (longitude/latitude)
- Scene classification (`scene` attribute)
- Stop name
- Description

The map filters features by scene so that each narrative section only displays the relevant stops.

---

## Map & Technical Implementation

- Map library: **Mapbox GL JS**
- Scroll behavior: **Scrollama**
- Styling: Custom CSS (`css/main.css`)
- Script logic: `js/main.js`
- Layout framework: **Bootstrap (Footer only)**

Scene transitions:
- Scene 0: Map flies to Fremont / Lake Union and filters stops where `scene = 0`
- Scene 1: Map flies to Capitol Hill and filters stops where `scene = 1`

Layers are added on map load and filtered dynamically during scene entry events.

---

## Multimedia

The narrative includes:
- Fullscreen background cover image
- Scene-specific images
- Popup interactions on map points
- Styled footer section

All images are stored in the `img/` folder.

---

## Folder Structure
