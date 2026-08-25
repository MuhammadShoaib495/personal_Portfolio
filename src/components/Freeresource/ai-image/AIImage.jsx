import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { removeBackground } from "@imgly/background-removal";

import "./AIImage.css";
import Spacing from "../../Spacing";
import { pageTitle } from '../../../helper';


/* =====================================================
   BACKGROUND PRESETS
===================================================== */

const BACKGROUNDS = [
  {
    name: "Studio",
    colors: ["#ffffff", "#d9dde3"],
  },
  {
    name: "Dark",
    colors: ["#101010", "#333333"],
  },
  {
    name: "Luxury",
    colors: ["#090909", "#765f42"],
  },
  {
    name: "Blue",
    colors: ["#071a36", "#2563eb"],
  },
  {
    name: "Purple",
    colors: ["#241038", "#9333ea"],
  },
  {
    name: "Ocean",
    colors: ["#062c3b", "#0891b2"],
  },
  {
    name: "Green",
    colors: ["#052e16", "#16a34a"],
  },
  {
    name: "Orange",
    colors: ["#431407", "#ea580c"],
  },
  {
    name: "Pink",
    colors: ["#500724", "#db2777"],
  },
  {
    name: "Gray",
    colors: ["#18181b", "#71717a"],
  },
];

/* =====================================================
   SOCIAL MEDIA SIZES
===================================================== */

const SIZES = [
  {
    name: "Square",
    width: 1080,
    height: 1080,
  },
  {
    name: "Landscape",
    width: 1200,
    height: 628,
  },
  {
    name: "Portrait",
    width: 1080,
    height: 1350,
  },
  {
    name: "Story",
    width: 1080,
    height: 1920,
  },
];

/* =====================================================
   FONTS
===================================================== */

const FONTS = [
  "Arial",
  "Helvetica",
  "Georgia",
  "Times New Roman",
  "Verdana",
  "Trebuchet MS",
  "Courier New",
  "Impact",
];

/* =====================================================
   LOAD IMAGE
===================================================== */

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);

    image.onerror = () =>
      reject(
        new Error("Could not load image.")
      );

    image.src = src;
  });
}

/* =====================================================
   CLONE CANVAS
===================================================== */

function cloneCanvas(source) {
  if (!source) return null;

  const canvas =
    document.createElement("canvas");

  canvas.width = source.width;
  canvas.height = source.height;

  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  ctx.drawImage(source, 0, 0);

  return canvas;
}

/* =====================================================
   CONTAIN
===================================================== */

function contain(
  imageWidth,
  imageHeight,
  boxWidth,
  boxHeight
) {
  const scale = Math.min(
    boxWidth / imageWidth,
    boxHeight / imageHeight
  );

  return {
    width: imageWidth * scale,
    height: imageHeight * scale,
  };
}

/* =====================================================
   COMPONENT
===================================================== */

export default function AIImage() {
    pageTitle('AI Image');
  
  /* ===================================================
     REFS
  =================================================== */

  const canvasRef = useRef(null);

  const fileInputRef = useRef(null);

  const backgroundInputRef =
    useRef(null);

  const illustrationInputRef =
    useRef(null);

  /*
   * IMPORTANT:
   * Keep the original File object here.
   *
   * Do not depend on:
   * fileInputRef.current.files[0]
   *
   * because the input is cleared after upload.
   */
  const originalFileRef =
    useRef(null);

  const originalImageRef =
    useRef(null);

  const aiMaskRef =
    useRef(null);

  const maskRef =
    useRef(null);

  const cutoutRef =
    useRef(null);

  const backgroundImageRef =
    useRef(null);

  const drawingRef =
    useRef(false);

  const undoRef =
    useRef([]);

  const redoRef =
    useRef([]);

  /* ===================================================
     IMAGE STATE
  =================================================== */

  const [imageLoaded, setImageLoaded] =
    useState(false);

  const [backgroundRemoved, setBackgroundRemoved] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  /* ===================================================
     CANVAS
  =================================================== */

  const [canvasSize, setCanvasSize] =
    useState({
      width: 1080,
      height: 1080,
    });

  const [zoom, setZoom] =
    useState(1);

  /* ===================================================
     BACKGROUND
  =================================================== */

  const [backgroundSelected, setBackgroundSelected] =
    useState(false);

  const [backgroundType, setBackgroundType] =
    useState("preset");

  const [backgroundName, setBackgroundName] =
    useState("Studio");

  const [backgroundImage, setBackgroundImage] =
    useState(null);

  /* ===================================================
     REFINE
  =================================================== */

  const [tool, setTool] =
    useState("refine");

  const [brushSize, setBrushSize] =
    useState(35);

  const [brushOpacity, setBrushOpacity] =
    useState(65);

  const [brushSoftness, setBrushSoftness] =
    useState(85);

  const [edgeStrength, setEdgeStrength] =
    useState(70);

  /* ===================================================
     BACKGROUND EFFECTS
  =================================================== */

  const [backgroundBlur, setBackgroundBlur] =
    useState(0);

  const [brightness, setBrightness] =
    useState(100);

  const [overlayColor, setOverlayColor] =
    useState("#000000");

  const [overlayOpacity, setOverlayOpacity] =
    useState(0);

  /* ===================================================
     SUBJECT
  =================================================== */

  const [subjectScale, setSubjectScale] =
    useState(1);

  const [subjectX, setSubjectX] =
    useState(50);

  const [subjectY, setSubjectY] =
    useState(50);

  /* ===================================================
     TEXT
  =================================================== */

  const [textElements, setTextElements] =
    useState([]);

  const [selectedTextId, setSelectedTextId] =
    useState(null);

  /* ===================================================
     ILLUSTRATIONS
  =================================================== */

  const [illustrations, setIllustrations] =
    useState([]);

  const [selectedIllustrationId, setSelectedIllustrationId] =
    useState(null);

  /* ===================================================
     CREATE MASK
  =================================================== */

  function createMask(
    width,
    height,
    alpha = 255
  ) {
    const canvas =
      document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return null;

    const data =
      ctx.createImageData(
        width,
        height
      );

    for (
      let i = 0;
      i < data.data.length;
      i += 4
    ) {
      data.data[i] = 255;
      data.data[i + 1] = 255;
      data.data[i + 2] = 255;
      data.data[i + 3] = alpha;
    }

    ctx.putImageData(data, 0, 0);

    return canvas;
  }

  /* ===================================================
     TRANSPARENT BACKGROUND
  =================================================== */

  function drawTransparentBackground(
    ctx,
    width,
    height
  ) {
    const size = 24;

    for (
      let y = 0;
      y < height;
      y += size
    ) {
      for (
        let x = 0;
        x < width;
        x += size
      ) {
        const even =
          (x / size + y / size) % 2 ===
          0;

        ctx.fillStyle = even
          ? "#eeeeee"
          : "#d5d5d5";

        ctx.fillRect(
          x,
          y,
          size,
          size
        );
      }
    }
  }

  /* ===================================================
     BUILD CUTOUT
  =================================================== */

  function buildCutout() {
    const original =
      originalImageRef.current;

    const mask =
      maskRef.current;

    if (!original || !mask) {
      cutoutRef.current = null;
      return;
    }

    const cutout =
      document.createElement("canvas");

    cutout.width = original.width;
    cutout.height = original.height;

    const ctx =
      cutout.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(
      0,
      0,
      cutout.width,
      cutout.height
    );

    ctx.drawImage(
      original,
      0,
      0
    );

    ctx.globalCompositeOperation =
      "destination-in";

    ctx.drawImage(
      mask,
      0,
      0
    );

    ctx.globalCompositeOperation =
      "source-over";

    cutoutRef.current = cutout;
  }

  /* ===================================================
     UPLOAD MAIN IMAGE
  =================================================== */

  async function handleUpload(event) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(
        "Please select an image."
      );

      event.target.value = "";

      return;
    }

    setLoading(true);
    setMessage("Loading image...");

    try {
      /*
       * IMPORTANT:
       * Store the File before clearing
       * the input.
       */
      originalFileRef.current = file;

      const url =
        URL.createObjectURL(file);

      try {
        const image =
          await loadImage(url);

        originalImageRef.current =
          image;

        maskRef.current =
          createMask(
            image.width,
            image.height,
            255
          );

        aiMaskRef.current = null;

        cutoutRef.current = null;

        undoRef.current = [];
        redoRef.current = [];

        setBackgroundRemoved(false);

        setBackgroundSelected(false);

        setBackgroundType("preset");

        setBackgroundName("Studio");

        setBackgroundImage(null);

        backgroundImageRef.current =
          null;

        setTextElements([]);

        setSelectedTextId(null);

        setIllustrations([]);

        setSelectedIllustrationId(
          null
        );

        setSubjectScale(1);

        setSubjectX(50);

        setSubjectY(50);

        setImageLoaded(true);
      } finally {
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(
        "Upload error:",
        error
      );

      alert(
        "Could not load image."
      );
    } finally {
      setLoading(false);
      setMessage("");

      /*
       * Allow selecting the same
       * image again.
       */
      event.target.value = "";
    }
  }

  /* ===================================================
     REMOVE BACKGROUND
  =================================================== */

  async function handleRemoveBackground() {
    /*
     * IMPORTANT:
     * Never get the file from
     * fileInputRef.current.files here.
     *
     * The input was cleared after upload.
     */
    const file =
      originalFileRef.current;

    if (!file) {
      alert(
        "Upload an image first."
      );

      return;
    }

    setLoading(true);

    setMessage(
      "AI is removing the background..."
    );

    try {
      console.log(
        "Starting background removal..."
      );

      const result =
        await removeBackground(file);

      if (!result) {
        throw new Error(
          "Background removal returned no image."
        );
      }

      const resultUrl =
        URL.createObjectURL(result);

      try {
        const aiResult =
          await loadImage(resultUrl);

        const original =
          originalImageRef.current;

        if (!original) {
          throw new Error(
            "Original image is missing."
          );
        }

        /*
         * Create alpha mask from
         * IMG.LY transparent result.
         */
        const mask =
          document.createElement("canvas");

        mask.width =
          original.width;

        mask.height =
          original.height;

        const ctx =
          mask.getContext("2d");

        if (!ctx) {
          throw new Error(
            "Could not create mask context."
          );
        }

        ctx.clearRect(
          0,
          0,
          mask.width,
          mask.height
        );

        ctx.drawImage(
          aiResult,
          0,
          0,
          mask.width,
          mask.height
        );

        const imageData =
          ctx.getImageData(
            0,
            0,
            mask.width,
            mask.height
          );

        /*
         * Keep only alpha.
         */
        for (
          let i = 0;
          i < imageData.data.length;
          i += 4
        ) {
          const alpha =
            imageData.data[i + 3];

          imageData.data[i] = 255;
          imageData.data[i + 1] = 255;
          imageData.data[i + 2] = 255;
          imageData.data[i + 3] =
            alpha;
        }

        ctx.putImageData(
          imageData,
          0,
          0
        );

        /*
         * Store AI mask.
         */
        aiMaskRef.current =
          cloneCanvas(mask);

        /*
         * Working mask.
         */
        maskRef.current =
          cloneCanvas(mask);

        /*
         * Reset refinement history.
         */
        undoRef.current = [];
        redoRef.current = [];

        /*
         * Build transparent subject.
         */
        buildCutout();

        /*
         * IMPORTANT:
         * Do NOT disable the selected
         * background here.
         */
        setBackgroundRemoved(true);

        /*
         * Keep current background.
         */
        setBackgroundSelected(
          current =>
            current
        );

        setMessage(
          "Background removed."
        );

        console.log(
          "Background removal completed."
        );

        setTimeout(() => {
          setMessage("");
        }, 1800);
      } finally {
        URL.revokeObjectURL(
          resultUrl
        );
      }
    } catch (error) {
      console.error(
        "Background removal error:",
        error
      );

      alert(
        error?.message ||
          "Could not remove background. Check the browser console for details."
      );

      setMessage("");
    } finally {
      setLoading(false);
    }
  }

  /* ===================================================
     RESET REFINEMENT
  =================================================== */

  function resetRefinement() {
    if (!aiMaskRef.current) {
      return;
    }

    maskRef.current =
      cloneCanvas(
        aiMaskRef.current
      );

    undoRef.current = [];
    redoRef.current = [];

    buildCutout();
  }

  /* ===================================================
     HISTORY
  =================================================== */

  function saveHistory() {
    if (!maskRef.current) return;

    const copy =
      cloneCanvas(
        maskRef.current
      );

    if (!copy) return;

    undoRef.current.push(copy);

    if (
      undoRef.current.length >
      20
    ) {
      undoRef.current.shift();
    }

    redoRef.current = [];
  }

  function undo() {
    if (
      !undoRef.current.length
    ) {
      return;
    }

    if (maskRef.current) {
      const current =
        cloneCanvas(
          maskRef.current
        );

      if (current) {
        redoRef.current.push(
          current
        );
      }
    }

    maskRef.current =
      undoRef.current.pop();

    buildCutout();
  }

  function redo() {
    if (
      !redoRef.current.length
    ) {
      return;
    }

    if (maskRef.current) {
      const current =
        cloneCanvas(
          maskRef.current
        );

      if (current) {
        undoRef.current.push(
          current
        );
      }
    }

    maskRef.current =
      redoRef.current.pop();

    buildCutout();
  }

  /* ===================================================
     SUBJECT RECT
  =================================================== */

  function getSubjectRect() {
    const image =
      originalImageRef.current;

    if (!image) return null;

    const size =
      contain(
        image.width,
        image.height,
        canvasSize.width,
        canvasSize.height
      );

    const width =
      size.width *
      subjectScale;

    const height =
      size.height *
      subjectScale;

    const centerX =
      canvasSize.width *
      (subjectX / 100);

    const centerY =
      canvasSize.height *
      (subjectY / 100);

    return {
      left:
        centerX - width / 2,

      top:
        centerY - height / 2,

      width,

      height,
    };
  }

  /* ===================================================
     POINTER TO IMAGE
  =================================================== */

  function getImagePoint(event) {
    const canvas =
      canvasRef.current;

    const image =
      originalImageRef.current;

    if (!canvas || !image) {
      return null;
    }

    const rect =
      canvas.getBoundingClientRect();

    let clientX =
      event.clientX;

    let clientY =
      event.clientY;

    if (
      event.touches &&
      event.touches.length
    ) {
      clientX =
        event.touches[0].clientX;

      clientY =
        event.touches[0].clientY;
    }

    const canvasX =
      ((clientX - rect.left) /
        rect.width) *
      canvas.width;

    const canvasY =
      ((clientY - rect.top) /
        rect.height) *
      canvas.height;

    const subject =
      getSubjectRect();

    if (!subject) {
      return null;
    }

    const localX =
      (canvasX - subject.left) /
      subject.width;

    const localY =
      (canvasY - subject.top) /
      subject.height;

    if (
      localX < 0 ||
      localY < 0 ||
      localX > 1 ||
      localY > 1
    ) {
      return null;
    }

    return {
      x:
        localX *
        image.width,

      y:
        localY *
        image.height,
    };
  }

  /* ===================================================
     REFINE BRUSH
  =================================================== */

  function refineBrush(event) {
    if (!backgroundRemoved) {
      return;
    }

    const mask =
      maskRef.current;

    if (!mask) return;

    const point =
      getImagePoint(event);

    if (!point) return;

    const ctx =
      mask.getContext("2d");

    if (!ctx) return;

    const image =
      originalImageRef.current;

    const subject =
      getSubjectRect();

    if (!image || !subject) {
      return;
    }

    const scale =
      image.width /
      subject.width;

    const radius =
      (brushSize * scale) / 2;

    const softness =
      brushSoftness / 100;

    const innerRadius =
      radius *
      (1 - softness);

    /* =================================================
       REFINE
    ================================================= */

    if (tool === "refine") {
      const strength =
        (brushOpacity / 100) *
        (edgeStrength / 100);

      const gradient =
        ctx.createRadialGradient(
          point.x,
          point.y,
          innerRadius,
          point.x,
          point.y,
          radius
        );

      gradient.addColorStop(
        0,
        `rgba(0,0,0,${strength})`
      );

      gradient.addColorStop(
        0.5,
        `rgba(0,0,0,${
          strength * 0.65
        })`
      );

      gradient.addColorStop(
        0.8,
        `rgba(0,0,0,${
          strength * 0.25
        })`
      );

      gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
      );

      ctx.save();

      ctx.globalCompositeOperation =
        "destination-out";

      ctx.fillStyle =
        gradient;

      ctx.beginPath();

      ctx.arc(
        point.x,
        point.y,
        radius,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.restore();
    }

    /* =================================================
       RESTORE
    ================================================= */

    if (tool === "restore") {
      const aiMask =
        aiMaskRef.current;

      if (!aiMask) return;

      const brush =
        document.createElement(
          "canvas"
        );

      brush.width =
        mask.width;

      brush.height =
        mask.height;

      const brushCtx =
        brush.getContext("2d");

      if (!brushCtx) return;

      const strength =
        brushOpacity / 100;

      const gradient =
        brushCtx.createRadialGradient(
          point.x,
          point.y,
          innerRadius,
          point.x,
          point.y,
          radius
        );

      gradient.addColorStop(
        0,
        `rgba(255,255,255,${strength})`
      );

      gradient.addColorStop(
        0.5,
        `rgba(255,255,255,${
          strength * 0.6
        })`
      );

      gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
      );

      brushCtx.fillStyle =
        gradient;

      brushCtx.beginPath();

      brushCtx.arc(
        point.x,
        point.y,
        radius,
        0,
        Math.PI * 2
      );

      brushCtx.fill();

      const currentData =
        ctx.getImageData(
          0,
          0,
          mask.width,
          mask.height
        );

      const aiData =
        aiMask
          .getContext("2d")
          .getImageData(
            0,
            0,
            mask.width,
            mask.height
          );

      const brushData =
        brushCtx.getImageData(
          0,
          0,
          mask.width,
          mask.height
        );

      for (
        let i = 0;
        i < currentData.data.length;
        i += 4
      ) {
        const currentAlpha =
          currentData.data[
            i + 3
          ];

        const aiAlpha =
          aiData.data[
            i + 3
          ];

        const brushAlpha =
          brushData.data[
            i + 3
          ] / 255;

        const restored =
          currentAlpha +
          (aiAlpha -
            currentAlpha) *
            brushAlpha;

        currentData.data[
          i + 3
        ] =
          Math.min(
            restored,
            aiAlpha
          );
      }

      ctx.putImageData(
        currentData,
        0,
        0
      );
    }

    buildCutout();
  }

  /* ===================================================
     BRUSH EVENTS
  =================================================== */

  function startBrush(event) {
    if (!backgroundRemoved) {
      return;
    }

    event.preventDefault();

    drawingRef.current = true;

    saveHistory();

    refineBrush(event);
  }

  function drawBrush(event) {
    if (!drawingRef.current) {
      return;
    }

    event.preventDefault();

    refineBrush(event);
  }

  function stopBrush() {
    drawingRef.current = false;
  }

  /* ===================================================
     DRAW BACKGROUND
  =================================================== */

  function drawBackground(
    ctx,
    width,
    height
  ) {
    /* =================================================
       CUSTOM IMAGE
    ================================================= */

    if (
      backgroundType === "image" &&
      backgroundImage
    ) {
      const image =
        backgroundImage;

      const scale =
        Math.max(
          width / image.width,
          height / image.height
        );

      const imageWidth =
        image.width * scale;

      const imageHeight =
        image.height * scale;

      const x =
        (width - imageWidth) / 2;

      const y =
        (height - imageHeight) / 2;

      ctx.save();

      ctx.filter =
        `blur(${backgroundBlur}px) brightness(${brightness}%)`;

      ctx.drawImage(
        image,
        x,
        y,
        imageWidth,
        imageHeight
      );

      ctx.restore();
    }

    /* =================================================
       PRESET
    ================================================= */

    else {
      const preset =
        BACKGROUNDS.find(
          item =>
            item.name ===
            backgroundName
        );

      const colors =
        preset?.colors || [
          "#181818",
          "#333333",
        ];

      const gradient =
        ctx.createLinearGradient(
          0,
          0,
          width,
          height
        );

      gradient.addColorStop(
        0,
        colors[0]
      );

      gradient.addColorStop(
        1,
        colors[1]
      );

      ctx.save();

      ctx.filter =
        `blur(${backgroundBlur}px) brightness(${brightness}%)`;

      ctx.fillStyle =
        gradient;

      const extra =
        backgroundBlur * 4;

      ctx.fillRect(
        -extra,
        -extra,
        width + extra * 2,
        height + extra * 2
      );

      ctx.restore();
    }

    /* =================================================
       OVERLAY
    ================================================= */

    if (overlayOpacity > 0) {
      ctx.save();

      ctx.globalAlpha =
        overlayOpacity / 100;

      ctx.fillStyle =
        overlayColor;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      ctx.restore();
    }
  }

  /* ===================================================
     DRAW SUBJECT
  =================================================== */

  function drawSubject(
    ctx,
    width,
    height
  ) {
    const original =
      originalImageRef.current;

    if (!original) return;

    /*
     * Background has NOT been removed.
     * Draw original image normally.
     */
    if (
      !backgroundRemoved ||
      !cutoutRef.current
    ) {
      const size =
        contain(
          original.width,
          original.height,
          width,
          height
        );

      const x =
        (width - size.width) /
        2;

      const y =
        (height - size.height) /
        2;

      ctx.drawImage(
        original,
        x,
        y,
        size.width,
        size.height
      );

      return;
    }

    /*
     * Background removed.
     * Draw transparent cutout.
     */
    const cutout =
      cutoutRef.current;

    const size =
      contain(
        cutout.width,
        cutout.height,
        width,
        height
      );

    const subjectWidth =
      size.width *
      subjectScale;

    const subjectHeight =
      size.height *
      subjectScale;

    const centerX =
      width *
      (subjectX / 100);

    const centerY =
      height *
      (subjectY / 100);

    const x =
      centerX -
      subjectWidth / 2;

    const y =
      centerY -
      subjectHeight / 2;

    ctx.drawImage(
      cutout,
      x,
      y,
      subjectWidth,
      subjectHeight
    );
  }

  /* ===================================================
     DRAW ILLUSTRATIONS
  =================================================== */

  function drawIllustrations(
    ctx,
    width,
    height
  ) {
    if (!illustrations.length) {
      return;
    }

    illustrations.forEach(
      illustration => {
        const image =
          illustration.image;

        if (!image) return;

        const baseSize =
          Math.min(
            width,
            height
          ) *
          (illustration.scale /
            100);

        const aspect =
          image.width /
          image.height;

        const imageWidth =
          aspect >= 1
            ? baseSize
            : baseSize * aspect;

        const imageHeight =
          aspect >= 1
            ? baseSize / aspect
            : baseSize;

        const x =
          width *
          (illustration.x / 100);

        const y =
          height *
          (illustration.y / 100);

        ctx.save();

        ctx.globalAlpha =
          illustration.opacity /
          100;

        ctx.translate(
          x,
          y
        );

        ctx.rotate(
          (illustration.rotation *
            Math.PI) /
            180
        );

        ctx.drawImage(
          image,
          -imageWidth / 2,
          -imageHeight / 2,
          imageWidth,
          imageHeight
        );

        ctx.restore();
      }
    );
  }

  /* ===================================================
     DRAW TEXT
  =================================================== */

  function drawTextElements(
    ctx,
    width,
    height
  ) {
    textElements.forEach(
      text => {
        ctx.save();

        const x =
          width *
          (text.x / 100);

        const y =
          height *
          (text.y / 100);

        ctx.translate(
          x,
          y
        );

        ctx.rotate(
          (text.rotation *
            Math.PI) /
            180
        );

        ctx.globalAlpha =
          text.opacity / 100;

        ctx.fillStyle =
          text.color;

        ctx.font =
          `${text.weight} ${text.size}px ${text.font}`;

        ctx.textAlign =
          text.align;

        ctx.textBaseline =
          "middle";

        if (text.shadow) {
          ctx.shadowColor =
            "rgba(0,0,0,0.45)";

          ctx.shadowBlur = 12;

          ctx.shadowOffsetX = 2;

          ctx.shadowOffsetY = 3;
        }

        ctx.fillText(
          text.text,
          0,
          0
        );

        ctx.restore();
      }
    );
  }

  /* ===================================================
     RENDER
     
     IMPORTANT FIX:
     Background selection is independent
     from backgroundRemoved.
  =================================================== */

  const render =
    useCallback(() => {
      const canvas =
        canvasRef.current;

      if (!canvas) return;

      canvas.width =
        canvasSize.width;

      canvas.height =
        canvasSize.height;

      const ctx =
        canvas.getContext("2d");

      if (!ctx) return;

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      /*
       * BACKGROUND FIRST
       */
      if (backgroundSelected) {
        drawBackground(
          ctx,
          canvas.width,
          canvas.height
        );
      } else {
        drawTransparentBackground(
          ctx,
          canvas.width,
          canvas.height
        );
      }

      /*
       * SUBJECT SECOND
       */
      drawSubject(
        ctx,
        canvas.width,
        canvas.height
      );

      /*
       * ILLUSTRATIONS THIRD
       */
      drawIllustrations(
        ctx,
        canvas.width,
        canvas.height
      );

      /*
       * TEXT LAST
       */
      drawTextElements(
        ctx,
        canvas.width,
        canvas.height
      );
    }, [
      canvasSize,

      backgroundSelected,

      backgroundType,

      backgroundImage,

      backgroundName,

      backgroundBlur,

      brightness,

      overlayColor,

      overlayOpacity,

      backgroundRemoved,

      subjectScale,

      subjectX,

      subjectY,

      illustrations,

      textElements,
    ]);

  /* ===================================================
     BACKGROUND IMAGE
  =================================================== */

  async function handleBackgroundImage(
    event
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(
        "Please select an image."
      );

      event.target.value = "";

      return;
    }

    const url =
      URL.createObjectURL(file);

    try {
      const image =
        await loadImage(url);

      backgroundImageRef.current =
        image;

      setBackgroundImage(image);

      setBackgroundType("image");

      setBackgroundSelected(true);
    } catch (error) {
      console.error(
        "Background image error:",
        error
      );

      alert(
        "Could not load background."
      );
    } finally {
      URL.revokeObjectURL(url);

      event.target.value = "";
    }
  }

  /* ===================================================
     ILLUSTRATION UPLOAD
  =================================================== */

  async function handleIllustrationUpload(
    event
  ) {
    const files =
      Array.from(
        event.target.files || []
      );

    if (!files.length) return;

    const imageFiles =
      files.filter(file =>
        file.type.startsWith(
          "image/"
        )
      );

    if (!imageFiles.length) {
      alert(
        "Please select image files."
      );

      event.target.value = "";

      return;
    }

    try {
      const newIllustrations = [];

      for (const file of imageFiles) {
        const url =
          URL.createObjectURL(file);

        try {
          const image =
            await loadImage(url);

          newIllustrations.push({
            id:
              Date.now() +
              Math.random(),

            name: file.name,

            image,

            scale: 30,

            x: 75,

            y: 25,

            rotation: 0,

            opacity: 100,
          });
        } finally {
          URL.revokeObjectURL(url);
        }
      }

      if (!newIllustrations.length) {
        return;
      }

      setIllustrations(
        previous => [
          ...previous,
          ...newIllustrations,
        ]
      );

      setSelectedIllustrationId(
        newIllustrations[
          newIllustrations.length - 1
        ].id
      );
    } catch (error) {
      console.error(
        "Illustration error:",
        error
      );

      alert(
        "Could not load illustration."
      );
    } finally {
      event.target.value = "";
    }
  }

  /* ===================================================
     UPDATE ILLUSTRATION
  =================================================== */

  function updateSelectedIllustration(
    property,
    value
  ) {
    if (
      !selectedIllustrationId
    ) {
      return;
    }

    setIllustrations(
      previous =>
        previous.map(
          illustration =>
            illustration.id ===
            selectedIllustrationId
              ? {
                  ...illustration,
                  [property]:
                    value,
                }
              : illustration
        )
    );
  }

  /* ===================================================
     DELETE ILLUSTRATION
  =================================================== */

  function deleteSelectedIllustration() {
    if (
      !selectedIllustrationId
    ) {
      return;
    }

    const index =
      illustrations.findIndex(
        illustration =>
          illustration.id ===
          selectedIllustrationId
      );

    const remaining =
      illustrations.filter(
        illustration =>
          illustration.id !==
          selectedIllustrationId
      );

    setIllustrations(
      remaining
    );

    if (remaining.length) {
      const nextIndex =
        Math.min(
          index,
          remaining.length - 1
        );

      setSelectedIllustrationId(
        remaining[nextIndex].id
      );
    } else {
      setSelectedIllustrationId(
        null
      );
    }
  }

  const selectedIllustration =
    illustrations.find(
      illustration =>
        illustration.id ===
        selectedIllustrationId
    );

  /* ===================================================
     TEXT
  =================================================== */

  function addText() {
    const newText = {
      id:
        Date.now() +
        Math.random(),

      text: "Your text",

      x: 50,

      y: 80,

      size: 64,

      color: "#ffffff",

      font: "Arial",

      weight: "700",

      align: "center",

      rotation: 0,

      opacity: 100,

      shadow: true,
    };

    setTextElements(
      previous => [
        ...previous,
        newText,
      ]
    );

    setSelectedTextId(
      newText.id
    );
  }

  function updateSelectedText(
    property,
    value
  ) {
    if (!selectedTextId) {
      return;
    }

    setTextElements(
      previous =>
        previous.map(
          text =>
            text.id ===
            selectedTextId
              ? {
                  ...text,
                  [property]:
                    value,
                }
              : text
        )
    );
  }

  function deleteSelectedText() {
    if (!selectedTextId) {
      return;
    }

    setTextElements(
      previous =>
        previous.filter(
          text =>
            text.id !==
            selectedTextId
        )
    );

    setSelectedTextId(null);
  }

  const selectedText =
    textElements.find(
      text =>
        text.id ===
        selectedTextId
    );

  /* ===================================================
     SIZE
  =================================================== */

  function changeSize(
    width,
    height
  ) {
    setCanvasSize({
      width,
      height,
    });
  }

  /* ===================================================
     EXPORT
  =================================================== */

  function exportImage(format) {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    /*
     * render() is also called by
     * React whenever state changes.
     */
    render();

    setTimeout(() => {
      const type =
        format === "jpg"
          ? "image/jpeg"
          : "image/png";

      /*
       * JPG cannot contain transparency.
       */
      if (
        format === "jpg" &&
        backgroundRemoved &&
        !backgroundSelected
      ) {
        const exportCanvas =
          document.createElement(
            "canvas"
          );

        exportCanvas.width =
          canvas.width;

        exportCanvas.height =
          canvas.height;

        const exportCtx =
          exportCanvas.getContext(
            "2d"
          );

        if (!exportCtx) return;

        exportCtx.fillStyle =
          "#ffffff";

        exportCtx.fillRect(
          0,
          0,
          exportCanvas.width,
          exportCanvas.height
        );

        drawSubject(
          exportCtx,
          exportCanvas.width,
          exportCanvas.height
        );

        drawIllustrations(
          exportCtx,
          exportCanvas.width,
          exportCanvas.height
        );

        drawTextElements(
          exportCtx,
          exportCanvas.width,
          exportCanvas.height
        );

        downloadCanvas(
          exportCanvas,
          type,
          format
        );

        return;
      }

      downloadCanvas(
        canvas,
        type,
        format
      );
    }, 50);
  }

  /* ===================================================
     DOWNLOAD
  =================================================== */

  function downloadCanvas(
    canvas,
    type,
    format
  ) {
    canvas.toBlob(
      blob => {
        if (!blob) return;

        const url =
          URL.createObjectURL(blob);

        const link =
          document.createElement("a");

        link.href = url;

        link.download =
          format === "jpg"
            ? "social-post.jpg"
            : "social-post.png";

        document.body.appendChild(
          link
        );

        link.click();

        document.body.removeChild(
          link
        );

        URL.revokeObjectURL(url);
      },
      type,
      0.95
    );
  }

  /* ===================================================
     RENDER EFFECT
  =================================================== */

  useEffect(() => {
    if (!imageLoaded) {
      return;
    }

    render();
  }, [
    imageLoaded,
    render,
  ]);

  /* ===================================================
     UI
  =================================================== */

  return (
    <div className="ai-studio">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="ai-header">

        <div className="ai-brand">
          <span>✦</span>
          Social AI
        </div>

        <div className="header-actions">

          <button
          className="export-button"
            type="button"
            onClick={() =>
              fileInputRef.current?.click()
            }
          >
            New Image
          </button>

          <button
            type="button"
            className="header-export"
            onClick={() =>
              exportImage("png")
            }
          >
            Export
          </button>

        </div>

      </header>

      {/* =================================================
          HIDDEN INPUTS
      ================================================= */}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleUpload}
      />

      <input
        ref={backgroundInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleBackgroundImage}
      />

      <input
        ref={illustrationInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={
          handleIllustrationUpload
        }
      />

      {/* =================================================
          UPLOAD SCREEN
      ================================================= */}

      {!imageLoaded ? (
        <div className="upload-screen">

          <div className="upload-card">

            <div className="upload-icon">
              ✦
            </div>

            <span className="upload-label">
              FREE IMAGE STUDIO
            </span>

            <h1>
              Create your
              <br />
              <span>
                social media image.
              </span>
            </h1>

            <p>
              Upload an image and create
              a professional social media
              post.
            </p>

            <button
              className="primary upload-button"
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              Upload Image
            </button>

          </div>

        </div>
      ) : (
        <div className="editor">

          {/* =================================================
              TOOLBAR
          ================================================= */}

          <aside className="toolbar">

            <button
              className="tool active"
              type="button"
            >
              <strong>⌁</strong>
              <span>Select</span>
            </button>

            <button
              className="tool"
              type="button"
              disabled={loading}
              onClick={
                handleRemoveBackground
              }
            >
              <strong>✦</strong>
              <span>Remove BG</span>
            </button>

            <button
              className="tool"
              type="button"
              onClick={addText}
            >
              <strong>T</strong>
              <span>Text</span>
            </button>

            <button
              className="tool"
              type="button"
              onClick={() =>
                illustrationInputRef.current?.click()
              }
            >
              <strong>▧</strong>
              <span>Image</span>
            </button>

            {backgroundRemoved && (
              <>
                <button
                  className={
                    tool === "refine"
                      ? "tool active"
                      : "tool"
                  }
                  type="button"
                  onClick={() =>
                    setTool("refine")
                  }
                >
                  <strong>◌</strong>
                  <span>Refine</span>
                </button>

                <button
                  className={
                    tool === "restore"
                      ? "tool active"
                      : "tool"
                  }
                  type="button"
                  onClick={() =>
                    setTool("restore")
                  }
                >
                  <strong>↗</strong>
                  <span>Restore</span>
                </button>

                <button
                  className="tool"
                  type="button"
                  onClick={undo}
                >
                  <strong>↶</strong>
                  <span>Undo</span>
                </button>

                <button
                  className="tool"
                  type="button"
                  onClick={redo}
                >
                  <strong>↷</strong>
                  <span>Redo</span>
                </button>
              </>
            )}

          </aside>

          {/* =================================================
              WORKSPACE
          ================================================= */}

          <main className="workspace">

            <div
              className="canvas-container"
              style={{
                transform:
                  `scale(${zoom})`,
              }}
            >
              <canvas
                ref={canvasRef}
                onMouseDown={
                  startBrush
                }
                onMouseMove={
                  drawBrush
                }
                onMouseUp={
                  stopBrush
                }
                onMouseLeave={
                  stopBrush
                }
                onTouchStart={
                  startBrush
                }
                onTouchMove={
                  drawBrush
                }
                onTouchEnd={
                  stopBrush
                }
                style={{
                  cursor:
                    backgroundRemoved
                      ? "crosshair"
                      : "default",

                  touchAction:
                    "none",
                }}
              />
            </div>

            {loading && (
              <div className="processing">
                <span className="spinner" />
                {message}
              </div>
            )}

            {!loading &&
              message && (
                <div className="processing">
                  {message}
                </div>
              )}

            <div className="zoom-bar">

              <button
                type="button"
                onClick={() =>
                  setZoom(
                    Math.max(
                      0.5,
                      zoom - 0.1
                    )
                  )
                }
              >
                −
              </button>

              <span>
                {Math.round(
                  zoom * 100
                )}
                %
              </span>

              <button
                type="button"
                onClick={() =>
                  setZoom(
                    Math.min(
                      2,
                      zoom + 0.1
                    )
                  )
                }
              >
                +
              </button>

            </div>

          </main>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="sidebar">

            {/* =================================================
                AI BACKGROUND
            ================================================= */}

            <section className="panel">

              <h3>
                AI Background
              </h3>

              <button
                className="ai-action"
                type="button"
                disabled={loading}
                onClick={
                  handleRemoveBackground
                }
              >
                ✦ Remove Background
              </button>

              {backgroundRemoved && (
                <button
                  className="secondary-action"
                  type="button"
                  onClick={
                    resetRefinement
                  }
                >
                  Reset Refinement
                </button>
              )}

              <p className="hint">
                Upload an image first.
                Remove Background uses
                the AI model to create a
                transparent subject.
              </p>

            </section>

            {/* =================================================
                TEXT
            ================================================= */}

            <section className="panel">

              <div className="panel-heading">

                <h3>
                  Text
                </h3>

                <button
                  className="small-add"
                  type="button"
                  onClick={addText}
                >
                  + Add
                </button>

              </div>

              {textElements.length ===
              0 ? (
                <p className="empty-panel">
                  Add text to your design.
                </p>
              ) : (
                <div className="element-list">

                  {textElements.map(
                    text => (
                      <button
                        key={text.id}
                        type="button"
                        className={
                          selectedTextId ===
                          text.id
                            ? "element-item active"
                            : "element-item"
                        }
                        onClick={() =>
                          setSelectedTextId(
                            text.id
                          )
                        }
                      >
                        <span>
                          T
                        </span>

                        {text.text ||
                          "Text"}
                      </button>
                    )
                  )}

                </div>
              )}

              {selectedText && (
                <div className="element-controls">

                  <label>
                    Text
                  </label>

                  <textarea
                    value={
                      selectedText.text
                    }
                    onChange={e =>
                      updateSelectedText(
                        "text",
                        e.target.value
                      )
                    }
                  />

                  <label>
                    Font
                  </label>

                  <select
                    value={
                      selectedText.font
                    }
                    onChange={e =>
                      updateSelectedText(
                        "font",
                        e.target.value
                      )
                    }
                  >
                    {FONTS.map(
                      font => (
                        <option
                          key={font}
                          value={font}
                        >
                          {font}
                        </option>
                      )
                    )}
                  </select>

                  <label>
                    Size
                  </label>

                  <input
                    type="range"
                    min="12"
                    max="180"
                    value={
                      selectedText.size
                    }
                    onChange={e =>
                      updateSelectedText(
                        "size",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                  <div className="range-value">
                    {
                      selectedText.size
                    }
                    px
                  </div>

                  <label>
                    Weight
                  </label>

                  <select
                    value={
                      selectedText.weight
                    }
                    onChange={e =>
                      updateSelectedText(
                        "weight",
                        e.target.value
                      )
                    }
                  >
                    <option value="400">
                      Regular
                    </option>

                    <option value="500">
                      Medium
                    </option>

                    <option value="600">
                      Semibold
                    </option>

                    <option value="700">
                      Bold
                    </option>

                    <option value="800">
                      Extra Bold
                    </option>

                    <option value="900">
                      Black
                    </option>
                  </select>

                  <label>
                    Color
                  </label>

                  <div className="color-row">

                    <input
                      type="color"
                      value={
                        selectedText.color
                      }
                      onChange={e =>
                        updateSelectedText(
                          "color",
                          e.target.value
                        )
                      }
                    />

                    <span>
                      {
                        selectedText.color
                      }
                    </span>

                  </div>

                  <label>
                    Alignment
                  </label>

                  <div className="align-buttons">

                    {[
                      "left",
                      "center",
                      "right",
                    ].map(
                      value => (
                        <button
                          key={value}
                          type="button"
                          className={
                            selectedText.align ===
                            value
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            updateSelectedText(
                              "align",
                              value
                            )
                          }
                        >
                          {value ===
                          "left"
                            ? "←"
                            : value ===
                              "center"
                            ? "↔"
                            : "→"}
                        </button>
                      )
                    )}

                  </div>

                  <label>
                    Horizontal
                  </label>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={
                      selectedText.x
                    }
                    onChange={e =>
                      updateSelectedText(
                        "x",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                  <div className="range-value">
                    {
                      selectedText.x
                    }
                    %
                  </div>

                  <label>
                    Vertical
                  </label>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={
                      selectedText.y
                    }
                    onChange={e =>
                      updateSelectedText(
                        "y",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                  <div className="range-value">
                    {
                      selectedText.y
                    }
                    %
                  </div>

                  <label>
                    Rotation
                  </label>

                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={
                      selectedText.rotation
                    }
                    onChange={e =>
                      updateSelectedText(
                        "rotation",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                  <div className="range-value">
                    {
                      selectedText.rotation
                    }
                    °
                  </div>

                  <label>
                    Opacity
                  </label>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={
                      selectedText.opacity
                    }
                    onChange={e =>
                      updateSelectedText(
                        "opacity",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                  <div className="range-value">
                    {
                      selectedText.opacity
                    }
                    %
                  </div>

                  <label className="check-label">

                    <input
                      type="checkbox"
                      checked={
                        selectedText.shadow
                      }
                      onChange={e =>
                        updateSelectedText(
                          "shadow",
                          e.target.checked
                        )
                      }
                    />

                    Text shadow

                  </label>

                  <button
                    className="danger-action"
                    type="button"
                    onClick={
                      deleteSelectedText
                    }
                  >
                    Delete Text
                  </button>

                </div>
              )}

            </section>

            {/* =================================================
                ILLUSTRATIONS
            ================================================= */}

            <section className="panel">

              <div className="panel-heading">

                <h3>
                  Illustration / Image
                </h3>

                <button
                  className="small-add"
                  type="button"
                  onClick={() =>
                    illustrationInputRef.current?.click()
                  }
                >
                  + Add
                </button>

              </div>

              {illustrations.length ===
              0 ? (
                <div className="illustration-upload">

                  <div className="illustration-icon">
                    ▧
                  </div>

                  <p>
                    Add a logo, product,
                    sticker or illustration.
                  </p>

                  <button
                    className="custom-background"
                    type="button"
                    onClick={() =>
                      illustrationInputRef.current?.click()
                    }
                  >
                    Upload Image
                  </button>

                </div>
              ) : (
                <>
                  <div className="element-list">

                    {illustrations.map(
                      (
                        illustration,
                        index
                      ) => (
                        <button
                          key={
                            illustration.id
                          }
                          type="button"
                          className={
                            selectedIllustrationId ===
                            illustration.id
                              ? "element-item active"
                              : "element-item"
                          }
                          onClick={() =>
                            setSelectedIllustrationId(
                              illustration.id
                            )
                          }
                        >
                          <span>
                            ▧
                          </span>

                          <span
                            style={{
                              overflow:
                                "hidden",

                              textOverflow:
                                "ellipsis",

                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            {illustration.name ||
                              `Image ${
                                index + 1
                              }`}
                          </span>
                        </button>
                      )
                    )}

                  </div>

                  {selectedIllustration && (
                    <div className="element-controls">

                      <div className="image-element-preview">
                        {
                          selectedIllustration.name
                        }
                      </div>

                      <label>
                        Size
                      </label>

                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={
                          selectedIllustration.scale
                        }
                        onChange={e =>
                          updateSelectedIllustration(
                            "scale",
                            Number(
                              e.target.value
                            )
                          )
                        }
                      />

                      <div className="range-value">
                        {
                          selectedIllustration.scale
                        }
                        %
                      </div>

                      <label>
                        Horizontal
                      </label>

                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={
                          selectedIllustration.x
                        }
                        onChange={e =>
                          updateSelectedIllustration(
                            "x",
                            Number(
                              e.target.value
                            )
                          )
                        }
                      />

                      <div className="range-value">
                        {
                          selectedIllustration.x
                        }
                        %
                      </div>

                      <label>
                        Vertical
                      </label>

                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={
                          selectedIllustration.y
                        }
                        onChange={e =>
                          updateSelectedIllustration(
                            "y",
                            Number(
                              e.target.value
                            )
                          )
                        }
                      />

                      <div className="range-value">
                        {
                          selectedIllustration.y
                        }
                        %
                      </div>

                      <label>
                        Rotation
                      </label>

                      <input
                        type="range"
                        min="-180"
                        max="180"
                        value={
                          selectedIllustration.rotation
                        }
                        onChange={e =>
                          updateSelectedIllustration(
                            "rotation",
                            Number(
                              e.target.value
                            )
                          )
                        }
                      />

                      <div className="range-value">
                        {
                          selectedIllustration.rotation
                        }
                        °
                      </div>

                      <label>
                        Opacity
                      </label>

                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={
                          selectedIllustration.opacity
                        }
                        onChange={e =>
                          updateSelectedIllustration(
                            "opacity",
                            Number(
                              e.target.value
                            )
                          )
                        }
                      />

                      <div className="range-value">
                        {
                          selectedIllustration.opacity
                        }
                        %
                      </div>

                      <button
                        className="danger-action"
                        type="button"
                        onClick={
                          deleteSelectedIllustration
                        }
                      >
                        Delete Image
                      </button>

                    </div>
                  )}

                  <button
                    className="custom-background"
                    type="button"
                    onClick={() =>
                      illustrationInputRef.current?.click()
                    }
                  >
                    + Add Another Image
                  </button>
                </>
              )}

            </section>

            {/* =================================================
                REFINE
            ================================================= */}

            {backgroundRemoved && (
              <section className="panel">

                <h3>
                  Refine Edge
                </h3>

                <div className="refine-buttons">

                  <button
                    className={
                      tool === "refine"
                        ? "refine-tool active"
                        : "refine-tool"
                    }
                    type="button"
                    onClick={() =>
                      setTool("refine")
                    }
                  >
                    ◌ Refine
                  </button>

                  <button
                    className={
                      tool === "restore"
                        ? "refine-tool active"
                        : "refine-tool"
                    }
                    type="button"
                    onClick={() =>
                      setTool("restore")
                    }
                  >
                    ↗ Restore
                  </button>

                </div>

                <label>
                  Brush Size
                </label>

                <input
                  type="range"
                  min="5"
                  max="150"
                  value={brushSize}
                  onChange={e =>
                    setBrushSize(
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

                <div className="range-value">
                  {brushSize}px
                </div>

                <label>
                  Brush Opacity
                </label>

                <input
                  type="range"
                  min="5"
                  max="100"
                  value={brushOpacity}
                  onChange={e =>
                    setBrushOpacity(
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

                <div className="range-value">
                  {brushOpacity}%
                </div>

                <label>
                  Edge Softness
                </label>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={brushSoftness}
                  onChange={e =>
                    setBrushSoftness(
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

                <div className="range-value">
                  {brushSoftness}%
                </div>

                <label>
                  Edge Strength
                </label>

                <input
                  type="range"
                  min="10"
                  max="100"
                  value={edgeStrength}
                  onChange={e =>
                    setEdgeStrength(
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

                <div className="range-value">
                  {edgeStrength}%
                </div>

              </section>
            )}

            {/* =================================================
                SIZE
            ================================================= */}

            <section className="panel">

              <h3>
                Social Media Size
              </h3>

              <div className="size-grid">

                {SIZES.map(size => (
                  <button
                    key={size.name}
                    type="button"
                    className={
                      canvasSize.width ===
                        size.width &&
                      canvasSize.height ===
                        size.height
                        ? "selected-size"
                        : ""
                    }
                    onClick={() =>
                      changeSize(
                        size.width,
                        size.height
                      )
                    }
                  >
                    {size.name}
                  </button>
                ))}

              </div>

            </section>

            {/* =================================================
                BACKGROUND
            ================================================= */}

            <section className="panel">

              <h3>
                Background
              </h3>

              <div className="background-grid">

                {BACKGROUNDS.map(
                  background => (
                    <button
                      key={
                        background.name
                      }
                      type="button"
                      className={
                        backgroundSelected &&
                        backgroundType ===
                          "preset" &&
                        backgroundName ===
                          background.name
                          ? "background-option selected"
                          : "background-option"
                      }
                      style={{
                        background:
                          `linear-gradient(135deg, ${background.colors[0]}, ${background.colors[1]})`,
                      }}
                      onClick={() => {
                        /*
                         * IMPORTANT:
                         * Preset selection immediately
                         * enables the background layer.
                         */
                        setBackgroundType(
                          "preset"
                        );

                        setBackgroundName(
                          background.name
                        );

                        setBackgroundSelected(
                          true
                        );
                      }}
                    >
                      {background.name}
                    </button>
                  )
                )}

              </div>

              <button
                className="custom-background"
                type="button"
                onClick={() =>
                  backgroundInputRef.current?.click()
                }
              >
                + Custom Background
              </button>

              {backgroundSelected && (
                <button
                  className="secondary-action"
                  type="button"
                  onClick={() =>
                    setBackgroundSelected(
                      false
                    )
                  }
                >
                  Remove Background Layer
                </button>
              )}

            </section>

            {/* =================================================
                EFFECTS
            ================================================= */}

            <section className="panel">

              <h3>
                Background Effects
              </h3>

              <label>
                Blur
              </label>

              <input
                type="range"
                min="0"
                max="25"
                value={backgroundBlur}
                onChange={e =>
                  setBackgroundBlur(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <div className="range-value">
                {backgroundBlur}px
              </div>

              <label>
                Brightness
              </label>

              <input
                type="range"
                min="40"
                max="160"
                value={brightness}
                onChange={e =>
                  setBrightness(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <div className="range-value">
                {brightness}%
              </div>

              <label>
                Overlay
              </label>

              <div className="color-row">

                <input
                  type="color"
                  value={overlayColor}
                  onChange={e =>
                    setOverlayColor(
                      e.target.value
                    )
                  }
                />

                <span>
                  {overlayColor}
                </span>

              </div>

              <label>
                Overlay Opacity
              </label>

              <input
                type="range"
                min="0"
                max="80"
                value={overlayOpacity}
                onChange={e =>
                  setOverlayOpacity(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <div className="range-value">
                {overlayOpacity}%
              </div>

            </section>

            {/* =================================================
                SUBJECT
            ================================================= */}

            <section className="panel">

              <h3>
                Subject Position
              </h3>

              <label>
                Size
              </label>

              <input
                type="range"
                min="0.3"
                max="1.7"
                step="0.01"
                value={subjectScale}
                onChange={e =>
                  setSubjectScale(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <div className="range-value">
                {Math.round(
                  subjectScale * 100
                )}
                %
              </div>

              <label>
                Horizontal
              </label>

              <input
                type="range"
                min="0"
                max="100"
                value={subjectX}
                onChange={e =>
                  setSubjectX(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <div className="range-value">
                {subjectX}%
              </div>

              <label>
                Vertical
              </label>

              <input
                type="range"
                min="0"
                max="100"
                value={subjectY}
                onChange={e =>
                  setSubjectY(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <div className="range-value">
                {subjectY}%
              </div>

            </section>

            {/* =================================================
                EXPORT
            ================================================= */}

            <section className="panel">

              <h3>
                Export
              </h3>

              <button
                className="export-button"
                type="button"
                onClick={() =>
                  exportImage("png")
                }
              >
                Download PNG
              </button>
<Spacing lg="20" md="20"/>
              <button
              className="export-button"
                type="button"
                onClick={() =>
                  exportImage("jpg")
                }
              >
                Download JPG
              </button>

            </section>

          </aside>

        </div>
      )}

    </div>
  );
}
