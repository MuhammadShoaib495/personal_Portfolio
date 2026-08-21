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
  RoundedBoxGeometry,
} from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import "./ScrollMobileVideo.scss";


// =====================================================
// PHONE SCENE
// =====================================================

function PhoneScene({
  scrollProgress,
  phoneProgress,
}) {
  const phoneRef = useRef(null);

  const smoothProgress = useRef(0);

  const rotationX = useRef(-0.85);
  const rotationY = useRef(-0.5);
  const rotationZ = useRef(0.12);

  const { camera, size } = useThree();


  // ===================================================
  // PHONE BODY
  // ===================================================

  const phoneGeometry = useMemo(() => {
    return new RoundedBoxGeometry(
      3.2,
      6.4,
      0.28,
      8,
      0.22
    );
  }, []);


  // ===================================================
  // PHONE SCREEN
  // ===================================================

  const screenGeometry = useMemo(() => {
    return new RoundedBoxGeometry(
      2.88,
      6.02,
      0.035,
      8,
      0.20
    );
  }, []);


  // ===================================================
  // DYNAMIC ISLAND
  // ===================================================

 


  // ===================================================
  // RESPONSIVE CAMERA
  // ===================================================

  useEffect(() => {
    if (size.width <= 400) {
      camera.position.set(0, 0, 10.5);
      camera.fov = 38;
    } else if (size.width <= 575) {
      camera.position.set(0, 0, 10);
      camera.fov = 37;
    } else if (size.width <= 767) {
      camera.position.set(0, 0, 9.5);
      camera.fov = 36;
    } else if (size.width <= 991) {
      camera.position.set(0, 0, 9);
      camera.fov = 35;
    } else {
      camera.position.set(0, 0, 8.5);
      camera.fov = 34;
    }

    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width]);


  // ===================================================
  // ANIMATION
  // ===================================================

  useFrame(() => {
    if (!phoneRef.current) return;


    // -----------------------------------------------
    // SMOOTH SCROLL
    // -----------------------------------------------

    smoothProgress.current +=
      (
        scrollProgress.current -
        smoothProgress.current
      ) * 0.035;

    const progress =
      smoothProgress.current;

    phoneProgress.current =
      progress;


    // -----------------------------------------------
    // ROTATION
    // -----------------------------------------------

    const startX = -0.85;
    const endX = 0;

    const startY = -0.5;
    const endY = 0;

    const startZ = 0.12;
    const endZ = 0;


    const targetX =
      startX +
      (endX - startX) *
      progress;

    const targetY =
      startY +
      (endY - startY) *
      progress;

    const targetZ =
      startZ +
      (endZ - startZ) *
      progress;


    rotationX.current +=
      (targetX - rotationX.current) *
      0.05;

    rotationY.current +=
      (targetY - rotationY.current) *
      0.05;

    rotationZ.current +=
      (targetZ - rotationZ.current) *
      0.05;


    phoneRef.current.rotation.x =
      rotationX.current;

    phoneRef.current.rotation.y =
      rotationY.current;

    phoneRef.current.rotation.z =
      rotationZ.current;


    // -----------------------------------------------
    // PHONE SIZE
    // -----------------------------------------------

    let phoneScale;

    if (size.width <= 400) {
      phoneScale = 0.62;
    } else if (size.width <= 575) {
      phoneScale = 0.38;
    } else if (size.width <= 767) {
      phoneScale = 0.48;
    } else if (size.width <= 991) {
      phoneScale = 0.65;
    } else {
      phoneScale = 0.65;
    }


    phoneRef.current.scale.set(
      phoneScale,
      phoneScale,
      phoneScale
    );


    // -----------------------------------------------
    // POSITION
    // -----------------------------------------------

    if (size.width <= 575) {
      phoneRef.current.position.set(
        0,
        -0.05,
        0
      );
    } else {
      phoneRef.current.position.set(
        0,
        0,
        0
      );
    }
  });


  // ===================================================
  // PHONE
  // ===================================================

  return (
    <group ref={phoneRef}>


      {/* PHONE BODY */}

      <mesh
        geometry={phoneGeometry}
      >
        <meshStandardMaterial
          color="#151515"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>


      {/* SCREEN */}

      <mesh
        geometry={screenGeometry}
        position={[0, 0, 0.17]}
      >
        <meshStandardMaterial
          color="#050505"
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>


      {/* DYNAMIC ISLAND */}

      


      {/* CAMERA */}
      
      <mesh
        position={[0.09, 2.85, 0.24]}
      >
        <sphereGeometry
          args={[0.045, 16, 16]}
        />

        <meshStandardMaterial
          color="#222222"
          metalness={0.8}
          roughness={0.15}
        />
      </mesh>


      {/* RIGHT BUTTON */}

      <mesh
        position={[1.63, 0.9, 0]}
      >
        <boxGeometry
          args={[0.06, 0.65, 0.12]}
        />

        <meshStandardMaterial
          color="#333333"
          metalness={0.7}
        />
      </mesh>


      {/* LEFT BUTTON */}

      <mesh
        position={[-1.63, 0.8, 0]}
      >
        <boxGeometry
          args={[0.06, 0.45, 0.12]}
        />

        <meshStandardMaterial
          color="#333333"
          metalness={0.7}
        />
      </mesh>


      {/* SPEAKER */}

      <mesh
        position={[0, -3.13, 0]}
      >
        <boxGeometry
          args={[0.9, 0.06, 0.12]}
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
  const scrollProgress = useRef(0);

  const phoneProgress = useRef(0);

  const videoContainerRef =
    useRef(null);

  const videoRef =
    useRef(null);


  // ===================================================
  // SCROLL
  // ===================================================

  useEffect(() => {
    const handleScroll = () => {
      const section =
        document.getElementById(
          "scroll-mobile-video"
        );

      if (!section) return;

      const rect =
        section.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      const start =
        viewportHeight * 0.90;

      const end =
        viewportHeight * 0.10;

      let progress =
        (start - rect.top) /
        (start - end);

      progress = Math.max(
        0,
        Math.min(1, progress)
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
  // VIDEO
  // ===================================================

  useEffect(() => {
    let animationFrame;


    const updateVideo = () => {
      const progress =
        phoneProgress.current;


      /*
       * Video starts after
       * phone is completely open.
       */

      const videoStart = 0.96;


      // -----------------------------------------------
      // HIDE
      // -----------------------------------------------

      if (progress < videoStart) {

        if (videoContainerRef.current) {
          videoContainerRef.current.style.opacity =
            "0";

          videoContainerRef.current.style.transform =
            "translate(-50%, -50%) scale(0.96)";
        }


        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }


      // -----------------------------------------------
      // SHOW
      // -----------------------------------------------

      else {

        let fadeProgress =
          (progress - videoStart) /
          (1 - videoStart);


        fadeProgress = Math.max(
          0,
          Math.min(1, fadeProgress)
        );


        if (videoContainerRef.current) {

          videoContainerRef.current.style.opacity =
            fadeProgress;


          const scale =
            0.96 +
            fadeProgress * 0.04;


          videoContainerRef.current.style.transform =
            `translate(-50%, -50%) scale(${scale})`;
        }


        if (
          fadeProgress > 0 &&
          videoRef.current &&
          videoRef.current.paused
        ) {
          videoRef.current
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

        {/* THREE.JS */}

        <Canvas
          className="mobile-canvas"

          camera={{
            position: [
              0,
              0,
              8,
            ],

            fov: 34,

            near: 0.1,

            far: 100,
          }}

          dpr={[1, 2]}
        >

          <ambientLight
            intensity={1.5}
          />

          <directionalLight
            position={[
              5,
              8,
              10,
            ]}
            intensity={2}
          />

          <directionalLight
            position={[
              -5,
              4,
              5,
            ]}
            intensity={1}
          />

          <PhoneScene
            scrollProgress={
              scrollProgress
            }

            phoneProgress={
              phoneProgress
            }
          />

        </Canvas>


        {/* VIDEO */}

        <div
          ref={videoContainerRef}
          className="mobile-video"
        >

          <video
            ref={videoRef}
            src={videoSrc}
            poster={poster}
            playsInline
            preload="metadata"
            controls
          />

        </div>

      </div>

    </section>
  );
}