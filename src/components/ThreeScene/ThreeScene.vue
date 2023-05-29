<template>
  <div class="wrapper">
    <canvas id="scene" ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
}

#scene {
  height: 100%;
  outline: none;
  background: rgb(34, 193, 195);
  background: linear-gradient(0deg,
  rgb(8, 163, 166) 0%,
  rgba(79, 166, 167, 0.849) 20%,
  rgba(61, 79, 94, 0.885) 50%,
  rgb(17, 19, 23));
}
</style>
<script lang="ts" setup>
import {onMounted, ref} from 'vue'

import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {useMachineStore} from "../../store/machine";

let machineStore = useMachineStore()
let canvas = ref<HTMLCanvasElement | null>(null)
let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let cameraControls: OrbitControls
let axesHelper: THREE.AxesHelper
let ambientLight: THREE.AmbientLight
let cube: THREE.Mesh;
let cube2;
let machines: Array<THREE.Group> = []
let intersects: THREE.Intersection<THREE.Object3D>[]
const degreesToRads = deg => (deg * Math.PI) / 180.0;

let stats = new Stats();
stats.domElement.style.position = 'fixed'
document.body.appendChild(stats.domElement)

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// canvas.addEventListener( 'pointermove', onPointerMove );
onMounted(() => {
  (canvas.value as HTMLElement).addEventListener('pointermove', onPointerMove);
  (canvas.value as HTMLElement).addEventListener('click', onMouseClick)
})

enum machineTable {
  machinea = 0,
  machineb = 1,
  machinec = 2

}

function onMouseClick(event) {
  if (intersects.length > 0) {
    let mesh = intersects[0].object
    if (mesh instanceof THREE.Mesh) {
      let machineName = (mesh.parent as THREE.Group).name
      machineStore.currentMachine = machineTable[machineName]
    }

  }
}

function onPointerMove(event) {
  if (canvas.value) {
    pointer.x = (event.offsetX / canvas.value.clientWidth) * 2 - 1;
    pointer.y = -(event.offsetY / canvas.value.clientHeight) * 2 + 1;
  }
  // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
}

function animate() {
  requestAnimationFrame(animate);
  stats.update();
  cameraControls.update()
  raycaster.setFromCamera(pointer, camera);
  intersects = raycaster.intersectObjects(machines, true);
  //重置状态
  machines.forEach((value) => {
    value.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.material.opacity = 1
        obj.scale.set(1, 1, 1)
      }
    })
  })
  //射线检测
  if (intersects.length > 0) {
    let mesh = intersects[0].object
    mesh.parent.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.material.transparent = true
        obj.material.opacity = 0.4
        // obj.geometry.setAttribute("scale", new THREE.BufferAttribute(new Float32Array([1.5,1.5,1.5]), 3))
        obj.scale.set(1.1, 1.1, 1.1)
        // obj.scale = new THREE.Vector3(1.5, 1.5, 1.5)
      }

    })
  }
  renderer.render(scene, camera)
}

function initScene() {
  //==== Size ====

  const sizes = {
    width: 0,
    height: 0,
  }

  const resizeHandler = () => {
    // Update sizes
    sizes.width = window.innerWidth * 0.7
    sizes.height = window.innerHeight

    // Update camera
    if (camera) {
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
    }

    // Update renderer
    if (renderer) {
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(window.devicePixelRatio)
    }
  }

  resizeHandler();

  window.addEventListener('resize', resizeHandler)

  // ===== 🖼️ CANVAS, RENDERER, & SCENE =====

  if (canvas.value) {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas.value,
      antialias: true,
      alpha: true
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.useLegacyLights = false;
    renderer.setSize(sizes.width, sizes.height)
    scene = new THREE.Scene()

    // ===== 🎥 CAMERA =====
    {
      camera = new THREE.PerspectiveCamera(
          30,
          canvas.value.clientWidth / canvas.value.clientHeight,
          1,
          100,
      )

      camera.position.set(4, 4, 10)
      camera.position.set(11.829126259608364, 6.083234760994291, -7.830035717563176)
    }

    // ===== 🕹️ CONTROLS =====
    {
      cameraControls = new OrbitControls(camera, canvas.value)
      cameraControls.enableDamping = true
      cameraControls.autoRotate = true
      cameraControls.update()
    }
  }
  // renderer.setClearColor(0x7780FF)

  // ==== CUBE ====
  {
    const planeGeometry = new THREE.PlaneGeometry(3, 3)
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: 'gray',
      emissive: 'teal',
      emissiveIntensity: 0.2,
      side: 2,
      transparent: true,
      opacity: 0.4,
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotateX(Math.PI / 2)
    plane.receiveShadow = true

    scene.add(plane)
  }


  // ===== 🪄 HELPERS =====
  {
    axesHelper = new THREE.AxesHelper(4)
    axesHelper.visible = false
    scene.add(axesHelper)

    const gridHelper = new THREE.GridHelper(20, 20, 'teal', 'darkgray')
    gridHelper.position.y = -0.01
    scene.add(gridHelper)
  }


  resizeHandler();

  animate()

  // ===== 💡 LIGHTS =====
  {
    ambientLight = new THREE.AmbientLight(0xFFFFFF, 5)

    scene.add(ambientLight)
    const dirLight = new THREE.DirectionalLight(0xFFFFFF, 5);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true
    dirLight.shadow.mapSize.set(512, 512)
    dirLight.shadow.camera.far = 5
    dirLight.shadow.camera.left = -7
    dirLight.shadow.camera.top = 7
    dirLight.shadow.camera.right = 7
    dirLight.shadow.camera.bottom = -7
    scene.add(dirLight);

  }

  // ==== Model Scenes ====
  {
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader()

    dracoLoader.setDecoderPath('/draco/')
    dracoLoader.preload()
    gltfLoader.setDRACOLoader(dracoLoader)
    gltfLoader.load(
        '/model/farm.gltf',
        (gltf) => {

          gltf.scene.scale.set(1.5, 1.5, 1.5)
          scene.add(gltf.scene)
          machines.push(gltf.scene.children[1446], gltf.scene.children[1447], gltf.scene.children[1448])
          console.log(machines)
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        console.log
    )
  }

  // ==== Raycaster ====
  {

    // console.log(intersects)
    // for ( var i = 0; i < intersects.length; i++ ) {
    //   intersects[i].object.material.color.set( 0xff0000 );
    // }
  }
}

onMounted(initScene)
</script>
