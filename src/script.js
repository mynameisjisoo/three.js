import * as THREE from "three";

// renderer 인스턴스 생성하고 사이즈 지정하여 추가
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Three.js 기본 컨셉
// 3개의 축으로 구성된 좌표계를 참조한다.
// x, y축은 수평, 수직을 나타냄
// z축의 음수 값은 0에서 앞으로 가는 깊이, 양수 값은 0에서 뒤로 가는 깊이를 나타냄
// three.js 에서는 scene class의 인스턴스를 생성하여 테마를 가져야 하며 올바른 카메라를 선택하고 그 인스턴스를 생성해야 한다.

/**
 * Perspective camera - 원근 카메라 (실제 카메라와 동일)
 * - Field of view : 수직 시야 (카메라의 길이를 통해 볼 수 있는 최대 각도)
 * - aspect ratio: 캡쳐된 이미지의 너비와 높이 비율, 일반적으로 canvas_width / canvas_height
 * - near and far : 볼 수 있는 것의 경계, near 보다 가깝거나 far 보다 먼 것은 렌더링 되지 않음
 *
 * Orthographic camera - 직교 카메라 (원근감 무시되기때문에 2D 렌더링에 사용)
 * - Left, right, top, bottom, near, far
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const axesHelper = new THREE.AxesHelper(3); // 3D 좌표계 추가
scene.add(axesHelper);

// camera.position.z = 5; // 기본적으로 포지션이 0,0,0 이기 떄문에 이런식으로 좌표를 움직이거나 set메소드 호출하여 세 축 모두 변경
// camera.position.y = 2;
camera.position.set(0, 2, 5);

// 박스 추가
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// rotation 값이 초당 frame rate씩 변경된다.(대부분의 모던 브라우저는 초당 60 프레임을 렌더링 -> time은 16.67ms씩 증가 -> 1000으로 나누어 초단위로 변환)
// frame rate가 높을 수록 애니메이션 속도 빨라짐
const animate = (time) => {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
