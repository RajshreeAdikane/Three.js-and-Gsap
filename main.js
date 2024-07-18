// import { any, texture } from "three/examples/jsm/nodes/Nodes.js";
import "./style.css"
import * as THREE from "three";
// import vertex from "./shaders/vertex.glsl";
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl"
import gsap from "gsap"


class Site {
    constructor({dom}) {
        this.time = 0;
        this.container = dom;
        this.width = window.innerHeight;
        this.heigth = window.innerHeight
        this.images = [...document.querySelectorAll('.image img')];
        this.material;
        this.geometry;
        this.imageStore =[]
        this.uStartIndex =0
        this.uEndIndex =2;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, this.width / this.heigth, 100, 2000 );

        
        this.camera.position.z = 200;
        this.camera.fov = 2*Math.atan(this.heigth/2/200) * (180/Math.PI)

        this.renderer = new THREE.WebGLRenderer({
            antialias:true,
            alpha:true
        });

        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.setSize( this.width, this.heigth );
        this.container.appendChild( this.renderer.domElement );
        this.renderer.render(this.scene, this.camera);
        
        this.setPosition()
        this.resize()
        this.addImages();
        this.render()
        this.setupResize();
        this.hoverOverLinks();
    }

    resize(){
        this.width = this.container.offsetWidth;
        this.heigth =  this.container.offsetHeight
        this.renderer.setSize(this.width, this.heigth)
        this.camera.aspect = this.width/this.heigth
        this.camera.updateProjectionMatrix();
        this.setPosition()
    }

    setupResize(){
        window.addEventListener("resize", this.resize.bind(this))
    }

    setPosition(){
        this.imageStore.forEach((img)=>{
            const bounds = img.img.getBoundingClientRect();
            console.log("hhhhh",bounds)
            img.mesh.position.y = -bounds.top + this.heigth/2 - bounds.height/2;
            img.mesh.position.x = bounds.left - this.width/2 + bounds/2; 
        })
    }

    addImages(){

        const textureLoader = new THREE.TextureLoader();
        const textures = this.images.map(img => textureLoader.load(img.src));

        console.log(textures,"TEXXXXXXX");
        
        const uniforms = {
            uTime: { value:0 },
            uTimeline: { value: 0.2},
            uStartIndex: {value: 0},
            uEndIndex: {value: 1},
            uImage1: { value: textures[0] },
            uImage2: { value: textures[1] },
            uImage3: { value: textures[2] },
            uImage4: { value: textures[3] },
        }

        this.material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
        })

        // this.material = new THREE.ShaderMaterial({
        //     vertexShader: `
        //         attribute vec3 position;
        //         attribute vec2 uv;
        
        //         varying vec2 vUv;
        
        //         void main() {
        //             vUv = uv;
        //             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        //         }
        //     `,
        //     fragmentShader: `
        //         precision mediump float;
        
        //         uniform sampler2D uImage;
        //         varying vec2 vUv;
        
        //         void main() {
        //             vec4 color = texture2D(uImage, vUv);
        //             gl_FragColor = color;
        //         }
        //     `,
        //     uniforms: uniforms,
        // });


        this.images.forEach((img) =>{
            const bounds = img.getBoundingClientRect();
            
            const geometry = new THREE.PlaneGeometry(bounds.width, bounds.height);
            const mesh = new THREE.Mesh(geometry, this.material);

            console.log(bounds,"Boundsssssss");


            this.scene.add(mesh)

            this.imageStore.push({
                img: img,
                mesh: mesh,
                top: bounds.top,
                left: bounds.left,
                width: bounds.width,
                height: bounds.height
            })

            console.log("hhhhhhhhhhh",this.imageStore)
        })

    }

    hoverOverLinks() {
        const links = document.querySelectorAll(".links a");
        links.forEach((link, i) => {
            link.addEventListener("mouseover", (e) => {
                this.material.uniforms.uTimeline.value = 0.0;
    
                gsap.to(this.material.uniforms.uTimeline, {
                    value: 4.0,
                    duration: 2, // Adjust the duration as needed
                    onStart: () => {
                        this.uEndIndex = i; // Update the end index based on your logic
                        this.material.uniforms.uStartIndex.value = this.uStartIndex;
                        this.material.uniforms.uEndIndex.value = this.uEndIndex;
                        this.uStartIndex = this.uEndIndex; // Update the start index for the next transition
                    }
                });
            });
        });
    }
    
    
    

    render() {
        this.time++
        this.material.uniforms.uTime.value =this.time
        this.renderer.render( this.scene, this.camera );
        window.requestAnimationFrame(this.render.bind(this))
    }
}
new Site({
    dom: document.querySelector(".canvas")
})