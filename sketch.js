let imgPaths = [];
let imgs = [];
let selectedCount = 2;
let canvas;
let allImagesLoaded = false;

function preload() {
  // Thay đổi dựa theo số lượng hình ảnh Ben đang có
  for (let i = 1; i <= 56; i++) {
    imgPaths.push(`images/img${i}.jpg`);
  }
}

function setup() {
  canvas = createCanvas(0, 0);
  canvas.parent('canvasContainer');
  noLoop();

  console.log("Loading images...");
  loadImages();

  let selector = select('#imgCount');
  selector.changed(() => {
    selectedCount = int(selector.value());
    if (allImagesLoaded) {
      shuffleAndDisplay();
    }
  });

  select('#shuffleBtn').mousePressed(() => {
    if (allImagesLoaded) {
      shuffleAndDisplay();
    } else {
      console.warn("Images are still loading...");
    }
  });
}

function loadImages() {
  imgs = [];
  let attempted = 0;
  let loaded = 0;
  const total = imgPaths.length;

  for (let i = 0; i < total; i++) {
    loadImage(imgPaths[i],
      img => {
        imgs.push(img);
        loaded++;
        attempted++;
        console.log(`✅ Loaded: ${imgPaths[i]}`);
        checkDone();
      },
      err => {
        console.warn(`❌ Failed: ${imgPaths[i]}`);
        attempted++;
        checkDone();
      }
    );
  }

  function checkDone() {
    if (attempted === total) {
      allImagesLoaded = true;
      console.log(`Finished loading ${loaded} / ${total} images.`);
      if (loaded > 0) {
        shuffleAndDisplay();
      } else {
        background(255, 0, 0);
        fill(0);
        textSize(24);
        text("No images loaded.", 10, 40);
      }
    }
  }
}

function shuffleAndDisplay() {
  if (!allImagesLoaded) {
    console.warn("Images not ready yet.");
    return;
  }

  const containerHeight = window.innerHeight - 60;
  const imgHeight = containerHeight;

  const shuffled = shuffle([...imgs]).slice(0, selectedCount);

  // Tính toán chiều rộng dựa trên tỷ lệ khung hình
  let totalWidth = 0;
  const scaledWidths = [];

  for (let i = 0; i < shuffled.length; i++) {
    const img = shuffled[i];
    const aspectRatio = img.width / img.height;
    const scaledWidth = imgHeight * aspectRatio;
    scaledWidths.push(scaledWidth);
    totalWidth += scaledWidth;
  }

  // Resize canvas
  resizeCanvas(totalWidth, imgHeight);
  clear();
  background(255);

  // Draw images
  let x = 0;
  for (let i = 0; i < shuffled.length; i++) {
    const img = shuffled[i];
    const w = scaledWidths[i];
    image(img, x, 0, w, imgHeight);
    x += w;
  }

  document.getElementById('canvasContainer').scrollLeft = 0;
}
