import * as pc from '../../../../';

class TextureBasisExample {
    static CATEGORY = 'Graphics';
    static NAME = 'Texture Basis';

    // Color textures have been converted with the following arguments:
    //   basisu seaside-rocks01-gloss.jpg -q 255 -mipmap
    // The normalmap has been converted with the following arguments:
    //   basisu seaside-rocks01-normal.jpg -normal_map -swizzle gggr -renorm -q 255 -mipmap

    example(canvas: HTMLCanvasElement, deviceType: string): void {

        // initialize basis
        pc.basisInitialize({
            glueUrl: '/static/lib/basis/basis.wasm.js',
            wasmUrl: '/static/lib/basis/basis.wasm.wasm',
            fallbackUrl: '/static/lib/basis/basis.js'
        });

        const assets = {
            'color': new pc.Asset('color', 'texture', { url: '/static/assets/textures/seaside-rocks01-color.basis' }),
            'gloss': new pc.Asset('gloss', 'texture', { url: '/static/assets/textures/seaside-rocks01-gloss.basis' }),
            'normal': new pc.Asset('normal', 'texture', { url: '/static/assets/textures/seaside-rocks01-normal.basis' }, { type: pc.TEXTURETYPE_SWIZZLEGGGR }),
            'helipad': new pc.Asset('helipad-env-atlas', 'texture', { url: '/static/assets/cubemaps/helipad-env-atlas.png' }, { type: pc.TEXTURETYPE_RGBP, mipmaps: false })
        };

        const gfxOptions = {
            deviceTypes: [deviceType],
            glslangUrl: '/static/lib/glslang/glslang.js',
            twgslUrl: '/static/lib/twgsl/twgsl.js'
        };

        pc.createGraphicsDevice(canvas, gfxOptions).then((device: pc.GraphicsDevice) => {

            const createOptions = new pc.AppOptions();
            createOptions.graphicsDevice = device;

            createOptions.componentSystems = [
                // @ts-ignore
                pc.RenderComponentSystem,
                // @ts-ignore
                pc.CameraComponentSystem,
                // @ts-ignore
                pc.LightComponentSystem
            ];
            createOptions.resourceHandlers = [
                // @ts-ignore
                pc.TextureHandler,
                // @ts-ignore
                pc.ContainerHandler
            ];

            const app = new pc.AppBase(canvas);
            app.init(createOptions);

            // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
            app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
            app.setCanvasResolution(pc.RESOLUTION_AUTO);

            const assetListLoader = new pc.AssetListLoader(Object.values(assets), app.assets);
            assetListLoader.load(() => {

                app.start();

                // Set skybox
                app.scene.toneMapping = pc.TONEMAP_ACES;
                app.scene.skyboxMip = 1;
                app.scene.skyboxIntensity = 1.4;
                app.scene.envAtlas = assets.helipad.resource;

                // Create directional light
                const light = new pc.Entity();
                light.addComponent('light', {
                    type: 'directional'
                });
                light.setLocalEulerAngles(45, 0, 45);

                // Construct material
                const material = new pc.StandardMaterial();
                material.useMetalness = true;
                material.diffuse = new pc.Color(0.3, 0.3, 0.3);
                material.gloss = 0.8;
                material.metalness = 0.7;
                material.diffuseMap = assets.color.resource;
                material.normalMap = assets.normal.resource;
                material.glossMap = assets.gloss.resource;
                material.diffuseMapTiling.set(7, 7);
                material.normalMapTiling.set(7, 7);
                material.glossMapTiling.set(7, 7);
                material.update();

                // Create a torus shape
                const torus = pc.createTorus(app.graphicsDevice, {
                    tubeRadius: 0.2,
                    ringRadius: 0.3,
                    segments: 50,
                    sides: 40
                });
                const shape = new pc.Entity();
                shape.addComponent('render', {
                    material: material,
                    meshInstances: [new pc.MeshInstance(torus, material)]
                });
                shape.setPosition(0, 0, 0);
                shape.setLocalScale(2, 2, 2);

                // Create an Entity with a camera component
                const camera = new pc.Entity();
                camera.addComponent("camera", {
                    clearColor: new pc.Color(0.4, 0.45, 0.5)
                });

                // Adjust the camera position
                camera.translate(0, 0, 4);

                // Add the new Entities to the hierarchy
                app.root.addChild(light);
                app.root.addChild(shape);
                app.root.addChild(camera);

                // Set an update function on the app's update event
                let angle = 0;
                app.on("update", function (dt) {
                    angle = (angle + dt * 10) % 360;

                    // Rotate the boxes
                    shape.setEulerAngles(angle, angle * 2, angle * 4);
                });
            });
        });
    }
}

export default TextureBasisExample;
