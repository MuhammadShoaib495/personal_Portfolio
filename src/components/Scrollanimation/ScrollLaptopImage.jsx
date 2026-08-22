import React, {
  useEffect,
  useMemo,
  useRef,
} from "react";

import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  TextureLoader,
  SRGBColorSpace,
  RepeatWrapping,
} from "three";

import {
  RoundedBoxGeometry,
} from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import "./ScrollLaptopImage.scss";


// =====================================================
// LAPTOP MODEL
// =====================================================

function LaptopModel({
  scrollProgress,
  laptopProgress,
  imageSrc,
}) {

  const laptopRef = useRef(null);
  const screenGroupRef = useRef(null);

  const smoothProgress = useRef(0);

  const { camera, size } = useThree();


  // ===================================================
  // LOAD SCREEN IMAGE
  // ===================================================
const screenTexture = useMemo(() => {
  const loader = new TextureLoader();

  const texture = loader.load(
    imageSrc,
    (texture) => {

      // Correct vertical orientation
      texture.flipY = false;

      // Allow negative repeat
      texture.wrapS = RepeatWrapping;

      // Flip X only
      texture.repeat.x = -1;
      texture.repeat.y = 1;

      // Required when using negative repeat
      texture.offset.x = 1;
      texture.offset.y = 0;

      // No rotation
      texture.rotation = 0;

      texture.center.set(0.5, 0.5);

      // Correct image colors
      texture.colorSpace = SRGBColorSpace;

      texture.needsUpdate = true;
    },

    undefined,

    (error) => {
      console.error(
        "Laptop screen image failed:",
        imageSrc,
        error
      );
    }
  );

  // Important defaults
  texture.flipY = false;

  texture.wrapS = RepeatWrapping;

  texture.repeat.set(
    -1,
    1
  );

  texture.offset.set(
    1,
    0
  );

  texture.rotation = 0;

  return texture;

}, [imageSrc]);


  // ===================================================
  // GEOMETRIES
  // ===================================================

  const baseGeometry = useMemo(
    () =>
      new RoundedBoxGeometry(
        6.4,
        3.6,
        0.32,
        12,
        0.18
      ),
    []
  );


  const keyboardGeometry = useMemo(
    () =>
      new RoundedBoxGeometry(
        5.8,
        3.0,
        0.12,
        12,
        0.10
      ),
    []
  );


  const screenBodyGeometry = useMemo(
    () =>
      new RoundedBoxGeometry(
        6.4,
        4.0,
        0.28,
        12,
        0.18
      ),
    []
  );


  const screenGeometry = useMemo(
    () =>
      new RoundedBoxGeometry(
        5.85,
        3.45,
        0.06,
        12,
        0.12
      ),
    []
  );


  const trackpadGeometry = useMemo(
    () =>
      new RoundedBoxGeometry(
        1.4,
        0.65,
        0.06,
        10,
        0.08
      ),
    []
  );


  // ===================================================
  // CAMERA
  // ===================================================

useEffect(() => {
  if (!camera) return;

  const width = size.width;

  /*
   * Reference:
   * 320px  -> z = 5
   * 1024px -> z = 9
   *
   * Between 320 and 1024 the value changes smoothly.
   */

  const minWidth = 320;
  const maxWidth = 1024;

  const minZ = 6.8;
  const maxZ = 11.5;

  // Clamp width between 320 and 1024
  const clampedWidth = Math.max(
    minWidth,
    Math.min(maxWidth, width)
  );

  // Convert width to 0 → 1
  const progress =
    (clampedWidth - minWidth) /
    (maxWidth - minWidth);

  // Calculate Z
  const z =
    minZ +
    (maxZ - minZ) * progress;

  /*
   * FOV can also remain mostly stable.
   * Smaller FOV = laptop appears larger.
   */
  const fov = 38;

  camera.position.set(
    0,
    0,
    z
  );

  camera.lookAt(
    0,
    0,
    0
  );

  camera.fov = fov;

  camera.updateProjectionMatrix();

}, [
  camera,
  size.width,
]);


  // ===================================================
  // ANIMATION
  // ===================================================

  useFrame(() => {

    // -----------------------------------------------
    // OUTSIDE IMAGES
    // -----------------------------------------------

    const outsideImages =
      document.querySelectorAll(
        ".outside-laptop-image"
      );


    outsideImages.forEach(
      (image, index) => {

        const progress =
          smoothProgress.current;


        const start = 0.55;


        let imageProgress =
          (
            progress -
            start
          ) /
          (
            1 -
            start
          );


        imageProgress =
          Math.max(
            0,
            Math.min(
              1,
              imageProgress
            )
          );


        const direction =
          index === 0
            ? -1
            : 1;


        const translateX =
          direction *
          (
            120 -
            imageProgress * 120
          );


        const translateY =
          30 -
          imageProgress * 30;


        const scale =
          0.7 +
          imageProgress * 0.3;


        image.style.opacity =
          String(imageProgress);


        image.style.transform =
          `translate(
            ${translateX}px,
            ${translateY}px
          ) scale(${scale})`;

      }
    );


    if (!laptopRef.current) {
      return;
    }


    // -----------------------------------------------
    // SMOOTH SCROLL
    // -----------------------------------------------

    smoothProgress.current +=
      (
        scrollProgress.current -
        smoothProgress.current
      ) * 0.07;


    const progress =
      smoothProgress.current;


    laptopProgress.current =
      progress;


    // -----------------------------------------------
    // SCREEN OPENING
    // -----------------------------------------------

    const closedAngle =
      Math.PI / 2;


    const openAngle =
      0;


    const targetAngle =
      closedAngle +
      (
        openAngle -
        closedAngle
      ) *
      progress;


    if (screenGroupRef.current) {

      screenGroupRef.current.rotation.x =
        targetAngle;

    }


    // -----------------------------------------------
    // RESPONSIVE SCALE
    // -----------------------------------------------

    let scale = 0.95;


    if (size.width <= 400) {

      scale = 0.38;

    } else if (size.width <= 575) {

      scale = 0.44;

    } else if (size.width <= 767) {

      scale = 0.54;

    } else if (size.width <= 991) {

      scale = 0.68;

    }


    laptopRef.current.scale.set(
      scale,
      scale,
      scale
    );


    // -----------------------------------------------
    // NO LAPTOP FLIP
    // -----------------------------------------------

    laptopRef.current.rotation.set(
      0,
      0,
      0
    );


    // -----------------------------------------------
    // POSITION
    // -----------------------------------------------

    if (size.width <= 575) {

      laptopRef.current.position.set(
        0,
        -0.25,
        0
      );

    } else {

      laptopRef.current.position.set(
        0,
        0,
        0
      );

    }

  });


  // ===================================================
  // LAPTOP
  // ===================================================

  return (

    <group ref={laptopRef}>


      {/* =============================================
          BASE
      ============================================= */}

      <mesh
        geometry={baseGeometry}
        position={[
          0,
          -1.8,
          0,
        ]}
      >

        <meshStandardMaterial
          color="#171717"
          metalness={0.8}
          roughness={0.22}
        />

      </mesh>


      {/* =============================================
          KEYBOARD
      ============================================= */}

      <mesh
        geometry={keyboardGeometry}
        position={[
          0,
          -1.57,
          0.20,
        ]}
      >

        <meshStandardMaterial
          color="#252525"
          metalness={0.55}
          roughness={0.3}
        />

      </mesh>


      {/* =============================================
          KEYS
      ============================================= */}

      <group
        position={[
          0,
          -1.18,
          0.30,
        ]}
      >

        {Array.from({
          length: 48,
        }).map((_, index) => {

          const columns = 12;


          const row =
            Math.floor(
              index / columns
            );


          const column =
            index % columns;


          return (

            <mesh
              key={index}
              position={[
                -2.4 +
                  column * 0.44,

                -row * 0.27,

                0,
              ]}
            >

              <boxGeometry
                args={[
                  0.32,
                  0.17,
                  0.05,
                ]}
              />

              <meshStandardMaterial
                color="#080808"
                roughness={0.35}
              />

            </mesh>

          );

        })}

      </group>


      {/* =============================================
          TRACKPAD
      ============================================= */}

      <mesh
        geometry={trackpadGeometry}
        position={[
          0,
          -2.50,
          0.30,
        ]}
      >

        <meshStandardMaterial
          color="#141414"
          metalness={0.5}
          roughness={0.25}
        />

      </mesh>


      {/* =============================================
          SCREEN GROUP
      ============================================= */}

      <group
        ref={screenGroupRef}
        position={[
          0,
          0,
          0,
        ]}
      >


        {/* ===========================================
            SCREEN OUTER BODY
        =========================================== */}

        <mesh
          geometry={screenBodyGeometry}
          position={[
            0,
            1.95,
            -0.05,
          ]}
        >

          <meshStandardMaterial
            color="#151515"
            metalness={0.85}
            roughness={0.18}
          />

        </mesh>


        {/* ===========================================
            IMAGE DIRECTLY ON SCREEN
        =========================================== */}

        <mesh
          geometry={screenGeometry}
          position={[
            0,
            1.95,
            0.15,
          ]}
        >

          <meshBasicMaterial
            map={screenTexture}
            toneMapped={false}
          />

        </mesh>


        {/* ===========================================
            CAMERA
        =========================================== */}

        <mesh
          position={[
            0,
            3.57,
            0.20,
          ]}
        >

          <sphereGeometry
            args={[
              0.055,
              20,
              20,
            ]}
          />

          <meshStandardMaterial
            color="#020202"
            metalness={0.9}
            roughness={0.12}
          />

        </mesh>


      </group>

    </group>
  );
}


// =====================================================
// MAIN COMPONENT
// =====================================================

export default function ScrollLaptopImage({

  imageSrc =
    "/images/caseStudy/vaconnect/onpoint_Dawnisha.jpg",

  imageSrc2 =
    "/images/caseStudy/vaconnect/onpoint_vaconnect_home.jpg",

  imageSrc3 =
    "/images/caseStudy/vaconnect/onpoint_2.jpg",

}) {

  const sectionRef =
    useRef(null);


  const scrollProgress =
    useRef(0);


  const laptopProgress =
    useRef(0);


  // ===================================================
  // SCROLL
  // ===================================================

  useEffect(() => {

    const updateScroll = () => {

      const section =
        sectionRef.current;


      if (!section) {
        return;
      }


      const rect =
        section.getBoundingClientRect();


      const height =
        window.innerHeight;


      const start =
        height * 0.90;


      const end =
        height * 0.10;


      let progress =
        (
          start -
          rect.top
        ) /
        (
          start -
          end
        );


      progress =
        Math.max(
          0,
          Math.min(
            1,
            progress
          )
        );


      scrollProgress.current =
        progress;

    };


    window.addEventListener(
      "scroll",
      updateScroll,
      {
        passive: true,
      }
    );


    updateScroll();


    return () => {

      window.removeEventListener(
        "scroll",
        updateScroll
      );

    };

  }, []);


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section
      ref={sectionRef}
      className="scroll-laptop-image-section"
    >

      <div
        className="scroll-laptop-image-sticky"
      >

        <Canvas
          className="laptop-canvas"
          camera={{
            position: [
              0,
              0,
              9,
            ],
            fov: 34,
            near: 0.1,
            far: 100,
          }}
          dpr={[
            1,
            2,
          ]}
        >

          {/* LIGHTING */}

          <ambientLight
            intensity={1.6}
          />


          <directionalLight
            position={[
              0,
              5,
              10,
            ]}
            intensity={2.2}
          />


          <directionalLight
            position={[
              -5,
              2,
              5,
            ]}
            intensity={0.8}
          />


          <directionalLight
            position={[
              5,
              2,
              5,
            ]}
            intensity={0.8}
          />


          {/* LAPTOP */}

          <LaptopModel
            scrollProgress={
              scrollProgress
            }
            laptopProgress={
              laptopProgress
            }
            imageSrc={
              imageSrc
            }
          />

        </Canvas>

      </div>


      {/* =============================================
          OUTSIDE IMAGES
      ============================================= */}

      <div className="outside-laptop-images">

        <div
          className="
            outside-laptop-image
            outside-image-left
          "
        >

          <img
            src={imageSrc2}
            alt="Project preview 1"
          />

        </div>


        <div
          className="
            outside-laptop-image
            outside-image-right
          "
        >

          <img
            src={imageSrc3}
            alt="Project preview 2"
          />

        </div>

      </div>

    </section>
  );
}
