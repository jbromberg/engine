var gles3PS = `
layout(location = 0) out highp vec4 pc_fragColor;
#ifndef REMOVE_COLOR_ATTACHMENT_1
#if COLOR_ATTACHMENT_1
layout(location = 1) out highp vec4 pc_fragColor1;
#endif
#endif
#ifndef REMOVE_COLOR_ATTACHMENT_2
#if COLOR_ATTACHMENT_2
layout(location = 2) out highp vec4 pc_fragColor2;
#endif
#endif
#ifndef REMOVE_COLOR_ATTACHMENT_3
#if COLOR_ATTACHMENT_3
layout(location = 3) out highp vec4 pc_fragColor3;
#endif
#endif
#ifndef REMOVE_COLOR_ATTACHMENT_4
#if COLOR_ATTACHMENT_4
layout(location = 4) out highp vec4 pc_fragColor4;
#endif
#endif
#ifndef REMOVE_COLOR_ATTACHMENT_5
#if COLOR_ATTACHMENT_5
layout(location = 5) out highp vec4 pc_fragColor5;
#endif
#endif
#ifndef REMOVE_COLOR_ATTACHMENT_6
#if COLOR_ATTACHMENT_6
layout(location = 6) out highp vec4 pc_fragColor6;
#endif
#endif
#ifndef REMOVE_COLOR_ATTACHMENT_7
#if COLOR_ATTACHMENT_7
layout(location = 7) out highp vec4 pc_fragColor7;
#endif
#endif
#define gl_FragColor pc_fragColor
#define pcFragColor0 pc_fragColor
#define pcFragColor1 pc_fragColor1
#define pcFragColor2 pc_fragColor2
#define pcFragColor3 pc_fragColor3
#define pcFragColor4 pc_fragColor4
#define pcFragColor5 pc_fragColor5
#define pcFragColor6 pc_fragColor6
#define pcFragColor7 pc_fragColor7
#define varying in
#define texture2D texture
#define texture2DBias texture
#define textureCube texture
#define texture2DProj textureProj
#define texture2DLodEXT textureLod
#define texture2DProjLodEXT textureProjLod
#define textureCubeLodEXT textureLod
#define texture2DGradEXT textureGrad
#define texture2DProjGradEXT textureProjGrad
#define textureCubeGradEXT textureGrad
#define textureShadow(res, uv) textureGrad(res, uv, vec2(1, 1), vec2(1, 1))
#define SHADOWMAP_PASS(name) name
#define SHADOWMAP_ACCEPT(name) sampler2DShadow name
#define TEXTURE_PASS(name) name
#define TEXTURE_ACCEPT(name) sampler2D name
#define GL2
#define SUPPORTS_TEXLOD
#define SUPPORTS_MRT
`;

export { gles3PS as default };
