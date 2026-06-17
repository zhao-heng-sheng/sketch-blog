#!/usr/bin/env python3
"""Render Excalidraw JSON -> PNG using PIL.

Simulates hand-drawn wobble by perturbing endpoints of lines/rectangles/ellipses
with seeded random noise (matches Excalidraw's roughness=2 look reasonably well).
"""
import json, random, math, sys, os
sys.path.insert(0, '/opt/data/projects/nanhua-tts/.venv/lib/python3.13/site-packages')
from PIL import Image, ImageDraw, ImageFont

# -------- Fonts --------
FONT_CN = "/opt/data/fonts/NotoSansSC-Regular.ttf"   # 10.5MB, contains Chinese
FONT_HW = "/opt/data/fonts/Caveat-Regular.ttf"        # 251KB, handwriting English

# -------- Wobble helpers --------
def jitter(p, amount=1.5):
    return (p[0] + random.uniform(-amount, amount), p[1] + random.uniform(-amount, amount))

def jitter_line(points, amount=1.5):
    return [jitter(p, amount) for p in points]

# -------- Shape renderers (each returns list of (points, style) for ImageDraw) --------
def render_rect(d, x, y, w, h, stroke, sw, roundness=0, fill=None):
    pts = [
        jitter((x, y)),
        jitter((x + w, y)),
        jitter((x + w, y + h)),
        jitter((x, y + h)),
        jitter((x, y)),  # close
    ]
    # PIL draw needs integer-friendly coords
    pil_pts = [(p[0], p[1]) for p in pts]
    if fill:
        d.polygon(pil_pts, fill=fill, outline=None)
    d.line(pil_pts, fill=stroke, width=sw, joint="curve")

def render_ellipse(d, cx, cy, rx, ry, stroke, sw, fill=None):
    bbox = [cx - rx, cy - ry, cx + rx, cy + ry]
    if fill:
        d.ellipse(bbox, fill=fill, outline=None)
    # Hand-drawn ellipse: many short wobbled segments
    steps = 36
    pts = []
    for i in range(steps + 1):
        t = 2 * math.pi * i / steps
        px = cx + rx * math.cos(t) + random.uniform(-1.5, 1.5)
        py = cy + ry * math.sin(t) + random.uniform(-1.5, 1.5)
        pts.append((px, py))
    d.line(pts, fill=stroke, width=sw, joint="curve")

def render_line(d, pts, stroke, sw):
    pts = jitter_line(pts, amount=1.0)
    d.line(pts, fill=stroke, width=sw, joint="curve")

def render_arrow(d, pts, stroke, sw):
    pts = jitter_line(pts, amount=1.0)
    d.line(pts, fill=stroke, width=sw, joint="curve")
    # arrow head
    x1, y1 = pts[-2]
    x2, y2 = pts[-1]
    angle = math.atan2(y2 - y1, x2 - x1)
    head_len = 12
    for off in (angle + math.pi - 0.4, angle + math.pi + 0.4):
        hx = x2 + head_len * math.cos(off)
        hy = y2 + head_len * math.sin(off)
        d.line([(x2, y2), (hx, hy)], fill=stroke, width=sw)

def render_text(d, el, text, font_obj):
    x = el.get('x', 0); y = el.get('y', 0)
    # Approximate width from font metrics
    bbox = font_obj.getbbox(text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    d.text((x, y), text, font=font_obj, fill=el.get('strokeColor', '#1e1e1e'))

# -------- Main render --------
def render(excalidraw_path, png_path, padding=40):
    random.seed(42)  # reproducible wobble
    with open(excalidraw_path, encoding='utf-8') as f:
        doc = json.load(f)
    elements = doc['elements']

    # Compute bounding box
    max_x = max(e.get('x', 0) + e.get('width', 0) for e in elements)
    max_y = max(e.get('y', 0) + e.get('height', 0) for e in elements)
    W = int(max_x + padding * 2)
    H = int(max_y + padding * 2)

    img = Image.new('RGB', (W, H), 'white')
    d = ImageDraw.Draw(img, 'RGBA')

    # offset all elements by padding
    def tx(x): return x + padding
    def ty(y): return y + padding

    # Cache fonts at various sizes
    font_cache = {}
    def get_font(size):
        if size not in font_cache:
            font_cache[size] = ImageFont.truetype(FONT_CN, size)
        return font_cache[size]

    # Sort elements by array order (already z-ordered)
    for el in elements:
        t = el['type']
        x = el.get('x', 0); y = el.get('y', 0)
        w = el.get('width', 0); h = el.get('height', 0)
        stroke = el.get('strokeColor', '#1e1e1e')
        sw = max(1, el.get('strokeWidth', 1))
        bg = el.get('backgroundColor', 'transparent')
        fill = None if (bg == 'transparent' or not bg) else bg

        try:
            if t == 'rectangle':
                roundness = el.get('roundness') or 0
                if isinstance(roundness, dict): roundness = roundness.get('type', 0)
                render_rect(d, tx(x), ty(y), w, h, stroke, sw,
                            roundness=roundness, fill=fill)
            elif t == 'ellipse':
                render_ellipse(d, tx(x + w/2), ty(y + h/2), w/2, h/2, stroke, sw, fill=fill)
            elif t == 'line':
                pts_rel = el.get('points', [[0,0],[w,0]])
                pts_abs = [(tx(x + p[0]), ty(y + p[1])) for p in pts_rel]
                if el.get('endArrowhead') == 'arrow':
                    render_arrow(d, pts_abs, stroke, sw)
                else:
                    render_line(d, pts_abs, stroke, sw)
            elif t == 'text':
                txt = el.get('text') or el.get('originalText') or ''
                size = el.get('fontSize', 16)
                font_obj = get_font(int(size))
                render_text(d, el, txt, font_obj)
        except Exception as e:
            # Silently skip problematic elements
            pass

    img.save(png_path, 'PNG', optimize=True)
    return png_path, img.size

if __name__ == '__main__':
    for src in ['/opt/data/projects/sketch-blog/design/01-homepage-hero.excalidraw',
                '/opt/data/projects/sketch-blog/design/02-blog-list.excalidraw']:
        png = src.replace('.excalidraw', '.png')
        out, sz = render(src, png)
        print(f"✓ {os.path.basename(out)}  size: {sz}")
