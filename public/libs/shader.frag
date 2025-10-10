

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void mainImage(out vec4 fragColor, vec2 fragCoord) {
    vec2 uv = (fragCoord * 2.000 - 1.0) / min(u_resolution.x, u_resolution.y) * 1.5;
    float t = u_time * 0.1;

    float a = 0.0;
    float b = 0.0;
    float c = 1.3;
    for(float i = 0.0; i < 4.0; ++i) {
        a = sin(-b*b - uv.x);
        b = cos(-a*a + c*c - uv.y - cos(t-a*b*c+uv.x));
        c = cos(a - b*b + c - t);
    }
    vec3 col = vec3(a, b, 0);
    col = sin(col * 1.3 + vec3(0.125,0.012,0.015));
    col *= sqrt(abs(col));
    col = cos(sqrt(cos(col * 1.144)) * 0.0 - vec3(abs(col.r)*0.0, 0.0, 0.0));
    col = col * 2.0 / (1.000 + col);
    col.rg -= c*c * 0.1;

    fragColor = vec4(col, 1);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
