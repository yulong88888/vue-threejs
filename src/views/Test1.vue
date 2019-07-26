<template>
    <div id="container"></div>
</template>

<script>
    import * as Three from 'three'

    export default {
        name: 'Test1',
        data() {
            return {
                camera: null,
                scene: null,
                renderer: null,
                mesh: null
            }
        },
        methods: {
            init() {
                let container = document.getElementById('container');

                this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 100);
                this.camera.position.z = 1;

                this.scene = new Three.Scene();

                let geometry = new Three.BoxGeometry(0.5, 0.5, 0.5);

                // let loader = new Three.FontLoader();
                // loader.load('/examples/fonts/helvetiker_regular.typeface.json', function (font) {
                //     // console.log(font);
                // });
                // let geometry = new Three.TextGeometry('Hello three.js!', {
                //     font: "helvetiker",
                //     size: 80,
                //     height: 5,
                //     curveSegments: 12,
                //     bevelEnabled: true,
                //     bevelThickness: 10,
                //     bevelSize: 8,
                //     bevelSegments: 5
                // });

                let material = new Three.MeshNormalMaterial();

                this.mesh = new Three.Mesh(geometry, material);
                this.scene.add(this.mesh);

                this.renderer = new Three.WebGLRenderer({antialias: true});
                this.renderer.setSize(container.clientWidth, container.clientHeight);
                container.appendChild(this.renderer.domElement);

            },
            animate() {
                requestAnimationFrame(this.animate);
                this.mesh.rotation.x += 0.01;
                this.mesh.rotation.y += 0.02;
                this.renderer.render(this.scene, this.camera);
            }
        },
        mounted() {
            this.init();
            this.animate()
        }
    }
</script>
<style scoped>
    #container {
        height: 98vh;
    }
</style>