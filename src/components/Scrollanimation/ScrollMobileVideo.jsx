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
  VideoTexture,
  SRGBColorSpace,
  ClampToEdgeWrapping,
} from "three";

import {
  RoundedBoxGeometry,
} from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import "./ScrollMobileVideo.scss";


// =====================================================
// PHONE SCENE
// =====================================================

function PhoneScene({
  scrollProgress,
  phoneProgress,
  videoSrc,
}) {

  const phoneRef =
    useRef(null);

  const screenMaterialRef =
    useRef(null);

  const smoothProgress =
    useRef(0);

  const rotationX =
    useRef(-0.85);

  const rotationY =
    useRef(-0.5);

  const rotationZ =
    useRef(0.12);

  const {
    camera,
    size,
  } = useThree();


  // ===================================================
  // PHONE BODY GEOMETRY
  // ===================================================

  const phoneGeometry =
    useMemo(() => {

      return new RoundedBoxGeometry(
        3.2,
        6.4,
        0.28,
        32,
        0.22
      );

    }, []);


  // ===================================================
  // SCREEN GEOMETRY
  // ===================================================

  const screenGeometry =
    useMemo(() => {

      return new RoundedBoxGeometry(
        2.88,
        6.02,
        0.035,
        32,
        0.20
      );

    }, []);


  // ===================================================
  // VIDEO ELEMENT
  // ===================================================

  const video =
    useMemo(() => {

      const element =
        document.createElement("video");

      element.src =
        videoSrc;

      element.loop =
        true;

      element.muted =
        false;

      element.playsInline =
        true;

      element.autoplay =
        false;

      element.preload =
        "auto";

      /*
       * Important for mobile browsers.
       */

      element.setAttribute(
        "playsinline",
        ""
      );

      element.setAttribute(
        "webkit-playsinline",
        ""
      );

      /*
       * Important when video
       * is hosted on another domain.
       *
       * The server must also send:
       *
       * Access-Control-Allow-Origin: *
       */

      element.crossOrigin =
        "anonymous";

      return element;

    }, [
      videoSrc,
    ]);


  // ===================================================
  // VIDEO TEXTURE
  // ===================================================

  const videoTexture =
    useMemo(() => {

      const texture =
        new VideoTexture(video);

      texture.colorSpace =
        SRGBColorSpace;

      texture.wrapS =
        ClampToEdgeWrapping;

      texture.wrapT =
        ClampToEdgeWrapping;

      texture.needsUpdate =
        true;

      return texture;

    }, [
      video]);


  // ===================================================
  // VIDEO ASPECT RATIO
  // ===================================================

  useEffect(() => {

    if (!video) {
      return;
    }

    if (!videoTexture) {
      return;
    }


    /*
     * Actual 3D phone screen.
     */

    const screenWidth =
      2.88;

    const screenHeight =
      6.02;


    const screenAspect =
      screenWidth /
      screenHeight;


    const updateAspect =
      () => {

        if (
          !video.videoWidth ||
          !video.videoHeight
        ) {
          return;
        }


        const videoAspect =
          video.videoWidth /
          video.videoHeight;


        /*
         * Reset.
         */

        videoTexture.repeat.set(
          1,
          1
        );

        videoTexture.offset.set(
          0,
          0
        );


        // =========================================
        // VIDEO WIDER THAN PHONE
        // =========================================

        if (
          videoAspect >
          screenAspect
        ) {

          const visibleWidth =
            screenAspect /
            videoAspect;


          videoTexture.repeat.set(
            visibleWidth,
            1
          );


          videoTexture.offset.set(
            (
              1 -
              visibleWidth
            ) / 2,
            0
          );

        }


        // =========================================
        // VIDEO TALLER THAN PHONE
        // =========================================

        else {

          const visibleHeight =
            videoAspect /
            screenAspect;


          videoTexture.repeat.set(
            1,
            visibleHeight
          );


          videoTexture.offset.set(
            0,
            (
              1 -
              visibleHeight
            ) / 2
          );

        }


        videoTexture.needsUpdate =
          true;

      };


    video.addEventListener(
      "loadedmetadata",
      updateAspect
    );


    updateAspect();


    return () => {

      video.removeEventListener(
        "loadedmetadata",
        updateAspect
      );

    };

  }, [
    video,
    videoTexture,
  ]);


  // ===================================================
  // VIDEO CLEANUP
  // ===================================================

  useEffect(() => {

    return () => {

      video.pause();

      try {

        video.currentTime =
          0;

      } catch (error) {}


      video.removeAttribute(
        "src"
      );

      video.load();

      videoTexture.dispose();

    };

  }, [
    video,
    videoTexture,
  ]);


  // ===================================================
  // RESPONSIVE CAMERA
  // ===================================================

  useEffect(() => {

    let z;
    let fov;


    // ===============================================
    // VERY SMALL MOBILE
    // ===============================================

    if (
      size.width <= 360
    ) {

      z =
        11.5;

      fov =
        38;

    }


    // ===============================================
    // MOBILE <= 575
    // ===============================================

    else if (
      size.width <= 575
    ) {

      z =
        8;

      fov =
        27;

    }


    // ===============================================
    // TABLET
    // ===============================================

    else if (
      size.width <= 767
    ) {

      z =
        8.5;

      fov =
        36;

    }


    // ===============================================
    // SMALL DESKTOP
    // ===============================================

    else if (
      size.width <= 991
    ) {

      z =
        9;

      fov =
        35;

    }


    // ===============================================
    // DESKTOP
    // ===============================================

    else {

      z =
        8.5;

      fov =
        34;

    }


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


    camera.fov =
      fov;


    camera.updateProjectionMatrix();

  }, [
    camera,
    size.width,
  ]);


  // ===================================================
  // VIDEO CONTROL
  // ===================================================

  useEffect(() => {

    let animationFrame;


    /*
     * Video only appears
     * when phone is completely open.
     */

    const videoStart =
      0.96;


    const updateVideo =
      () => {

        const progress =
          phoneProgress.current;


        // =========================================
        // VIDEO HIDDEN
        // =========================================

        if (
          progress <
          videoStart
        ) {

          /*
           * Hide screen texture.
           */

          if (
            screenMaterialRef.current
          ) {

            screenMaterialRef.current.opacity =
              0;

          }


          /*
           * Pause video.
           */

          if (
            !video.paused
          ) {

            video.pause();

          }


          /*
           * RESET VIDEO
           *
           * This is the important part.
           *
           * Every time user scrolls
           * back up, video goes back
           * to 0 seconds.
           */

          if (
            video.currentTime !== 0
          ) {

            try {

              video.currentTime =
                0;

            } catch (error) {}

          }

        }


        // =========================================
        // VIDEO VISIBLE
        // =========================================

        else {

          let fadeProgress =
            (
              progress -
              videoStart
            ) /
            (
              1 -
              videoStart
            );


          fadeProgress =
            Math.max(
              0,
              Math.min(
                1,
                fadeProgress
              )
            );


          /*
           * Fade video in.
           */

          if (
            screenMaterialRef.current
          ) {

            screenMaterialRef.current.opacity =
              fadeProgress;

          }


          /*
           * Start video.
           *
           * Because it was reset to 0,
           * it always starts from beginning.
           */

          if (
            fadeProgress > 0 &&
            video.paused
          ) {

            video
              .play()
              .catch(() => {});

          }

        }


        animationFrame =
          requestAnimationFrame(
            updateVideo
          );

      };


    animationFrame =
      requestAnimationFrame(
        updateVideo
      );


    return () => {

      cancelAnimationFrame(
        animationFrame
      );

    };

  }, [
    video,
    phoneProgress,
  ]);


  // ===================================================
  // PHONE ANIMATION
  // ===================================================

  useFrame(() => {

    if (
      !phoneRef.current
    ) {

      return;

    }


    // ===============================================
    // SMOOTH SCROLL
    // ===============================================

    smoothProgress.current +=
      (
        scrollProgress.current -
        smoothProgress.current
      ) * 0.035;


    const progress =
      smoothProgress.current;


    phoneProgress.current =
      progress;


    // ===============================================
    // ROTATION
    // ===============================================

    const startX =
      -0.85;

    const endX =
      0;


    const startY =
      -0.5;

    const endY =
      0;


    const startZ =
      0.12;

    const endZ =
      0;


    const targetX =
      startX +
      (
        endX -
        startX
      ) *
      progress;


    const targetY =
      startY +
      (
        endY -
        startY
      ) *
      progress;


    const targetZ =
      startZ +
      (
        endZ -
        startZ
      ) *
      progress;


    rotationX.current +=
      (
        targetX -
        rotationX.current
      ) * 0.05;


    rotationY.current +=
      (
        targetY -
        rotationY.current
      ) * 0.05;


    rotationZ.current +=
      (
        targetZ -
        rotationZ.current
      ) * 0.05;


    phoneRef.current.rotation.x =
      rotationX.current;


    phoneRef.current.rotation.y =
      rotationY.current;


    phoneRef.current.rotation.z =
      rotationZ.current;


    // ===============================================
    // RESPONSIVE PHONE SCALE
    // ===============================================

    let phoneScale;


    if (
      size.width <= 360
    ) {

      phoneScale =
        0.32;

    }

    else if (
      size.width <= 400
    ) {

      phoneScale =
        0.36;

    }

    else if (
      size.width <= 575
    ) {

      phoneScale =
        0.38;

    }

    else if (
      size.width <= 767
    ) {

      phoneScale =
        0.48;

    }

    else if (
      size.width <= 991
    ) {

      phoneScale =
        0.65;

    }

    else {

      phoneScale =
        0.65;

    }


    phoneRef.current.scale.set(
      phoneScale,
      phoneScale,
      phoneScale
    );


    // ===============================================
    // POSITION
    // ===============================================

    if (
      size.width <= 575
    ) {

      phoneRef.current.position.set(
        0,
        -0.05,
        0
      );

    }

    else {

      phoneRef.current.position.set(
        0,
        0,
        0
      );

    }

  });


  // ===================================================
  // PHONE MODEL
  // ===================================================

  return (

    <group
      ref={phoneRef}
    >

      {/* =============================================
          PHONE BODY
      ============================================= */}

      <mesh
        geometry={
          phoneGeometry
        }
      >

        <meshStandardMaterial
          color="#151515"
          metalness={0.85}
          roughness={0.2}
        />

      </mesh>


      {/* =============================================
          VIDEO INSIDE PHONE
      ============================================= */}

      <mesh
        geometry={
          screenGeometry
        }

        position={[
          0,
          0,
          0.17,
        ]}
      >

        <meshBasicMaterial
          ref={
            screenMaterialRef
          }

          map={
            videoTexture
          }

          transparent

          opacity={
            0
          }

          toneMapped={
            false
          }

        />

      </mesh>


      {/* =============================================
          FRONT CAMERA
      ============================================= */}

      <mesh
        position={[
          0.09,
          2.85,
          0.24,
        ]}
      >

        <sphereGeometry
          args={[
            0.045,
            16,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#222222"
          metalness={0.8}
          roughness={0.15}
        />

      </mesh>


      {/* =============================================
          RIGHT BUTTON
      ============================================= */}

      <mesh
        position={[
          1.63,
          0.9,
          0,
        ]}
      >

        <boxGeometry
          args={[
            0.06,
            0.65,
            0.12,
          ]}
        />

        <meshStandardMaterial
          color="#333333"
          metalness={0.7}
        />

      </mesh>


      {/* =============================================
          LEFT BUTTON
      ============================================= */}

      <mesh
        position={[
          -1.63,
          0.8,
          0,
        ]}
      >

        <boxGeometry
          args={[
            0.06,
            0.45,
            0.12,
          ]}
        />

        <meshStandardMaterial
          color="#333333"
          metalness={0.7}
        />

      </mesh>


      {/* =============================================
          SPEAKER
      ============================================= */}

      <mesh
        position={[
          0,
          -3.13,
          0,
        ]}
      >

        <boxGeometry
          args={[
            0.9,
            0.06,
            0.12,
          ]}
        />

        <meshStandardMaterial
          color="#050505"
          roughness={0.5}
        />

      </mesh>

    </group>
  );
}


// =====================================================
// MAIN COMPONENT
// =====================================================

export default function ScrollMobileVideo({
  videoSrc,
  poster,
}) {

  const scrollProgress =
    useRef(0);

  const phoneProgress =
    useRef(0);


  // ===================================================
  // SCROLL
  // ===================================================

  useEffect(() => {

    const handleScroll =
      () => {

        const section =
          document.getElementById(
            "scroll-mobile-video"
          );


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
      handleScroll,
      {
        passive: true,
      }
    );


    handleScroll();


    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, []);


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section
      id="scroll-mobile-video"
      className="scroll-mobile-section"
    >

      <div
        className="scroll-mobile-sticky"
      >

        <Canvas
          className="mobile-canvas"

          camera={{
            position: [
              0,
              0,
              8,
            ],

            fov:
              34,

            near:
              0.1,

            far:
              100,
          }}

          dpr={[
            1,
            2,
          ]}
        >

          {/* LIGHT */}

          <ambientLight
            intensity={
              1.5
            }
          />


          <directionalLight
            position={[
              5,
              8,
              10,
            ]}

            intensity={
              2
            }
          />


          <directionalLight
            position={[
              -5,
              4,
              5,
            ]}

            intensity={
              1
            }
          />


          {/* PHONE */}

          <PhoneScene
            scrollProgress={
              scrollProgress
            }

            phoneProgress={
              phoneProgress
            }

            videoSrc={
              videoSrc
            }

          />

        </Canvas>

      </div>

    </section>
  );
}
