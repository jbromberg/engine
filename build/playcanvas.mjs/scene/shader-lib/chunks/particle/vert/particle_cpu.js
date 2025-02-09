var particle_cpuVS = `
attribute vec4 particle_vertexData;
attribute vec4 particle_vertexData2;
attribute vec4 particle_vertexData3;
attribute float particle_vertexData4;
#ifndef USE_MESH
attribute vec2 particle_vertexData5;
#else
attribute vec4 particle_vertexData5;
#endif
uniform mat4 matrix_viewProjection;
uniform mat4 matrix_model;
#ifndef VIEWMATRIX
#define VIEWMATRIX
uniform mat4 matrix_view;
#endif
uniform mat3 matrix_normal;
uniform mat4 matrix_viewInverse;
uniform float numParticles;
uniform float lifetime;
uniform float stretch;
uniform float seed;
uniform vec3 wrapBounds;
uniform vec3 emitterScale;
uniform vec3 faceTangent;
uniform vec3 faceBinorm;
uniform highp sampler2D internalTex0;
uniform highp sampler2D internalTex1;
uniform highp sampler2D internalTex2;
uniform vec3 emitterPos;
varying vec4 texCoordsAlphaLife;
vec2 rotate(vec2 quadXY, float pRotation, out mat2 rotMatrix)
{
	float c = cos(pRotation);
	float s = sin(pRotation);
	mat2 m = mat2(c, -s, s, c);
	rotMatrix = m;
	return m * quadXY;
}
vec3 billboard(vec3 InstanceCoords, vec2 quadXY)
{
	vec3 pos = -matrix_viewInverse[0].xyz * quadXY.x + -matrix_viewInverse[1].xyz * quadXY.y;
	return pos;
}
vec3 customFace(vec3 InstanceCoords, vec2 quadXY)
{
	vec3 pos = faceTangent * quadXY.x + faceBinorm * quadXY.y;
	return pos;
}
void main(void)
{
	vec3 particlePos = particle_vertexData.xyz;
	vec3 inPos = particlePos;
	vec3 vertPos = particle_vertexData3.xyz;
	vec3 inVel = vec3(particle_vertexData2.w, particle_vertexData3.w, particle_vertexData5.x);
	float id = floor(particle_vertexData4);
	float rndFactor = fract(sin(id + 1.0 + seed));
	vec3 rndFactor3 = vec3(rndFactor, fract(rndFactor*10.0), fract(rndFactor*100.0));
#ifdef LOCAL_SPACE
	inVel = mat3(matrix_model) * inVel;
#endif
	vec2 velocityV = normalize((mat3(matrix_view) * inVel).xy);
	vec2 quadXY = vertPos.xy;
#ifdef USE_MESH
	texCoordsAlphaLife = vec4(particle_vertexData5.zw, particle_vertexData2.z, particle_vertexData.w);
#else
	texCoordsAlphaLife = vec4(quadXY * -0.5 + 0.5, particle_vertexData2.z, particle_vertexData.w);
#endif
	mat2 rotMatrix;
	float inAngle = particle_vertexData2.x;
	vec3 particlePosMoved = vec3(0.0);
	vec3 meshLocalPos = particle_vertexData3.xyz;
`;

export { particle_cpuVS as default };
