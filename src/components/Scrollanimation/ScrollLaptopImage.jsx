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
  useTexture,
} from "@react-three/drei";

import * as THREE from "three";

import {
  RoundedBoxGeometry,
} from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import "./ScrollLaptopImage.scss";


// =====================================================
// LAPTOP MODEL
// =====================================================

function LaptopModel({
  imageSrc,
  scrollProgress,
  laptopProgress,
}) {

  const laptopRef =
    useRef(null);

  const screenGroupRef =
    useRef(null);

  const smoothProgress =
    useRef(0);

  const { camera, size } =
    useThree();


  // ===================================================
  // SCREEN IMAGE TEXTURE
  // ===================================================

  const screenTexture =
    useTexture(imageSrc);


  // ===================================================
  // TEXTURE SETTINGS
  // ===================================================

  useEffect(() => {

    if (!screenTexture) {
      return;
    }


    /*
     * IMPORTANT
     *
     * Do NOT use negative repeat here.
     *
     * This keeps the original image
     * orientation.
     */

    screenTexture.wrapS =
      THREE.ClampToEdgeWrapping;

    screenTexture.wrapT =
      THREE.ClampToEdgeWrapping;


    screenTexture.repeat.set(
      -1,
      1
    );


    screenTexture.offset.set(
      0,
      0,
    );


    /*
     * Correct color for website screenshot.
     */

    screenTexture.colorSpace =
      THREE.SRGBColorSpace;


    screenTexture.needsUpdate =
      true;

  }, [
    screenTexture,
  ]);


  // ===================================================
  // GEOMETRIES
  // ===================================================

  const baseGeometry =
    useMemo(
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


  const keyboardGeometry =
    useMemo(
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


  const screenBodyGeometry =
    useMemo(
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


  const screenGeometry =
    useMemo(
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


  const trackpadGeometry =
    useMemo(
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

    if (!camera) {
      return;
    }


    let z = 9;

    let fov = 49;


    // -----------------------------------------------
    // VERY SMALL MOBILE
    // -----------------------------------------------

    if (size.width <= 400) {

      z = 8;

      fov = 40;

    }


    // -----------------------------------------------
    // SMALL MOBILE
    // -----------------------------------------------

    else if (size.width <= 575) {

      z = 10;

      fov = 38;

    }


    // -----------------------------------------------
    // MOBILE
    // -----------------------------------------------

    else if (size.width <= 767) {

      z = 9.5;

      fov = 36;

    }
     else if (size.width <= 1024) {

      z = 16.5;

      fov = 36;

    }
    

    // -----------------------------------------------
    // TABLET
    // -----------------------------------------------

    else if (size.width <= 991) {

      z = 11;

      fov = 34;

    }


    // -----------------------------------------------
    // CAMERA POSITION
    // -----------------------------------------------

    camera.position.set(
      0,
      0,
      z
    );


    /*
     * Straight front camera.
     *
     * No Y rotation.
     * No X rotation.
     * No Z rotation.
     */

    camera.rotation.set(
      0,
      0,
      0
    );


    camera.lookAt(
      0,
      0,
      0
    );


    camera.fov =
      fov;


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
    // OUTSIDE IMAGES
    // -----------------------------------------------

    const outsideImages =
      document.querySelectorAll(
        ".outside-laptop-image"
      );


    outsideImages.forEach(
      (image, index) => {

        const start =
          0.55;


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
          String(
            imageProgress
          );


        image.style.transform =
          `translate(
            ${translateX}px,
            ${translateY}px
          )
          scale(${scale})`;

      }
    );


    // -----------------------------------------------
    // LAPTOP CHECK
    // -----------------------------------------------

    if (!laptopRef.current) {
      return;
    }


    // -----------------------------------------------
    // SCREEN OPENING
    // -----------------------------------------------

    /*
     * 0 = closed
     *
     * 1 = completely open
     */

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


    if (
      screenGroupRef.current
    ) {

      screenGroupRef.current.rotation.x =
        targetAngle;

    }


    // -----------------------------------------------
    // RESPONSIVE LAPTOP SCALE
    // -----------------------------------------------

    let scale =
      0.95;


    if (size.width <= 400) {

      scale =
        0.38;

    }

    else if (size.width <= 575) {

      scale =
        0.44;

    }

    else if (size.width <= 767) {

      scale =
        0.54;

    }

    else if (size.width <= 991) {

      scale =
        0.68;

    }


    laptopRef.current.scale.set(
      scale,
      scale,
      scale
    );


    // -----------------------------------------------
    // IMPORTANT
    // -----------------------------------------------

    /*
     * DO NOT rotate the laptop.
     *
     * This prevents X/Y flipping.
     */

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

    }

    else {

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

    <group
      ref={laptopRef}
    >


      {/* =================================================
          BASE
      ================================================= */}

      <mesh
        geometry={
          baseGeometry
        }
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


      {/* =================================================
          KEYBOARD
      ================================================= */}

      <mesh
        geometry={
          keyboardGeometry
        }
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


      {/* =================================================
          KEYS
      ================================================= */}

      <group
        position={[
          0,
          -1.18,
          0.30,
        ]}
      >

        {Array.from({
          length: 48,
        }).map(
          (_, index) => {

            const columns =
              12;


            const row =
              Math.floor(
                index /
                columns
              );


            const column =
              index %
              columns;


            return (

              <mesh
                key={index}
                position={[
                  -2.4 +
                    column *
                    0.44,

                  -row *
                    0.27,

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

          }
        )}

      </group>


      {/* =================================================
          TRACKPAD
      ================================================= */}

      <mesh
        geometry={
          trackpadGeometry
        }
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


      {/* =================================================
          SCREEN GROUP
      ================================================= */}

      <group
        ref={
          screenGroupRef
        }
        position={[
          0,
          0,
          0,
        ]}
      >


        {/* ===============================================
            SCREEN BODY
        =============================================== */}

        <mesh
          geometry={
            screenBodyGeometry
          }
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


        {/* ===============================================
            IMAGE INSIDE LAPTOP SCREEN
        =============================================== */}

        <mesh
          geometry={
            screenGeometry
          }
          position={[
            0,
            1.95,
            0.15,
          ]}
        >

          <meshBasicMaterial
            map={
              screenTexture
            }
            side={
              THREE.DoubleSide
            }
            toneMapped={
              false
            }
          />

        </mesh>


        {/* ===============================================
            CAMERA / WEBCAM
        =============================================== */}

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
    "/images/case-study/onpoint/desktop.jpg",

  imageSrc2 =
    "/images/case-study/onPoint_vaconnect_home.jpg",

  imageSrc3 =
    "/images/case-study/onpoint_2.jpg",

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

    const updateScroll =
      () => {

        const section =
          sectionRef.current;


        if (!section) {
          return;
        }


        const rect =
          section.getBoundingClientRect();


        const viewportHeight =
          window.innerHeight;


        const start =
          viewportHeight *
          0.90;


        const end =
          viewportHeight *
          0.10;


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
      ref={
        sectionRef
      }
      className="
        scroll-laptop-image-section
      "
    >

      <div
        className="
          scroll-laptop-image-sticky
        "
      >


        {/* =============================================
            THREE.JS CANVAS
        ============================================= */}

        <Canvas
          className="
            laptop-canvas
          "
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


          {/* ===========================================
              LIGHTING
          =========================================== */}

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


          {/* ===========================================
              LAPTOP
          =========================================== */}

          <LaptopModel
            imageSrc={
              imageSrc
            }
            scrollProgress={
              scrollProgress
            }
            laptopProgress={
              laptopProgress
            }
          />


        </Canvas>

      </div>


      {/* =================================================
          OUTSIDE IMAGES
      ================================================= */}

      <div
        className="
          outside-laptop-images
        "
      >


        {/* LEFT IMAGE */}

        <div
          className="
            outside-laptop-image
            outside-image-left
          "
        >

          <img
            src={
              imageSrc2
            }
            alt="
              Project preview 1
            "
          />

        </div>


        {/* RIGHT IMAGE */}

        <div
          className="
            outside-laptop-image
            outside-image-right
          "
        >

          <img
            src={
              imageSrc3
            }
            alt="
              Project preview 2
            "
          />

        </div>


      </div>


    </section>

  );
}
