export default function BgCanvas() {
    return (
        <canvas className="glslCanvas h-dvh w-dvw -z-10 fixed top-0 left-0 " data-fragment-url="./libs/shader.frag"></canvas>
    );
};