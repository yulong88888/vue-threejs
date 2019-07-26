<template>
    <div id="container"></div>
</template>

<script>
    import * as THREE from 'three'
    import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

    export default {
        name: 'Test2',
        data() {
            return {
                camera: null,
                scene: null,
                renderer: null,
                mesh: null,
                manager: null
            }
        },
        methods: {
            init() {
                let container = document.getElementById('container');

                this.renderer = new THREE.WebGLRenderer({antialias: true});
                this.renderer.setSize(container.clientWidth, container.clientHeight);
                container.appendChild(this.renderer.domElement);

                this.scene = new THREE.Scene();
                this.scene.add(new THREE.AmbientLight(0x999999));

                this.camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 1, 500);

                this.camera.up.set(0, 0, 1);
                this.camera.position.set(0, -9, 6);

                this.camera.add(new THREE.PointLight(0xffffff, 0.8));

                this.scene.add(this.camera);

                let grid = new THREE.GridHelper(25, 50, 0xffffff, 0x555555);
                grid.rotateOnAxis(new THREE.Vector3(1, 0, 0), 90 * (Math.PI / 180));
                this.scene.add(grid);

                let loader = new STLLoader();
                let context = this;

                let material = new THREE.MeshPhongMaterial({color: 0x0e2045, specular: 0x111111, shininess: 200});
                loader.load('./BigDipper.stl', function (geometry) {
                    let mesh = new THREE.Mesh(geometry, material);

                    mesh.position.set(0, 0, 0);
                    mesh.rotation.set(0, 0, 0);
                    mesh.scale.set(.2, .2, .2);

                    mesh.castShadow = true;
                    mesh.receiveShadow = true;

                    context.scene.add(mesh);
                    this.render();
                });
                let controls = new OrbitControls(this.camera, this.renderer.domElement);
                controls.addEventListener('change', this.render);
                controls.target.set(0, 1.2, 2);
                controls.update();
                window.addEventListener('resize', this.onWindowResize, false);
            },
            onWindowResize() {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();

                this.renderer.setSize(window.innerWidth, window.innerHeight);

                this.render();
            },
            render() {
                this.renderer.render(this.scene, this.camera);
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
<style scoped>
    #container {
        height: 98vh;
    }
</style>