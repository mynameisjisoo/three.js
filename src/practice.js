import { GLTFLoader } from "GLTFLoader";
import * as THREE from "three";

const canvas = document.querySelector("#canvas");
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true, // 테두리 계단 현상  제거
});

renderer.outputColorSpace = THREE.SRGBColorSpace;

/**
 * - PerspectiveCamera : 원근법 O (인간 눈 흉내, 가장 많이 사용)
 * - OrthographicCamera : 원근법 X
 */
const width = canvas.width;
const height = canvas.height;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 1000);
camera.position.set(0, 0, 200);

scene.background = new THREE.Color("#0101DF");

// const light = new THREE.DirectionalLight("0xffff00", 10);
// const light = new THREE.AmbientLight(0x404040);

// 씬의 위쪽에서 직접적인 조명, skycolor부터 groundColor까지 컬러 페이딩
const light = new THREE.HemisphereLight(0xffffbb, 0x404040, 1.5);

// const light = new THREE.PointLight(0xffffbb, 20, 100);
// light.position.set(50, 50, 50);
scene.add(light);

const loader = new GLTFLoader(); // GLTF파일 불러오기 위함
loader.load("/clown_fish/scene.gltf", (gltf) => {
  console.log(gltf);
  scene.add(gltf.scene);
  gltf.scene.rotation.y = Math.PI * 0.5; // y축 반만큼 회전

  // 옆으로 이동
  let step = 0;
  const animate = () => {
    requestAnimationFrame(animate);
    step += 0.1;
    gltf.scene.position.x = step;
    renderer.render(scene, camera);
    // console.log(gltf.scene.position.x);
  };

  animate();

  // const animate = () => {
  //   requestAnimationFrame(animate);

  /**
   * requestAnimationFrame 함수
   * - 리페인트 바로 전에 애니메이션 업데이트 하는 함수 호출
   * - 보통 1초에 60회지만 대부분 웹 브라우저에서 디스플레이 주사율과 일치 (높은 주사율에서 애니메이션이 빠르게 실행)
   *
   */
  //   gltf.scene.rotation.y += 0.01;
  // renderer.render(scene, camera);
  // };
  // animate();
});
