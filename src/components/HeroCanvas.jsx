import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { useCanvasVideo } from '../hooks/useCanvasVideo';

gsap.registerPlugin(ScrollTrigger);

const FRAME_FILENAMES = [
    "img_00003.jpg", "img_00007.jpg", "img_00009.jpg", "img_00013.jpg", "img_00019.jpg",
    "img_00022.jpg", "img_00027.jpg", "img_00029.jpg", "img_00033.jpg", "img_00037.jpg",
    "img_00042.jpg", "img_00045.jpg", "img_00049.jpg", "img_00053.jpg", "img_00057.jpg",
    "img_00061.jpg", "img_00067.jpg", "img_00069.jpg", "img_00073.jpg", "img_00077.jpg",
    "img_00081.jpg", "img_00087.jpg", "img_00089.jpg", "img_00093.jpg", "img_00099.jpg",
    "img_00102.jpg", "img_00107.jpg", "img_00109.jpg", "img_00114.jpg", "img_00119.jpg",
    "img_00121.jpg", "img_00127.jpg", "img_00129.jpg", "img_00134.jpg", "img_00139.jpg",
    "img_00142.jpg", "img_00147.jpg", "img_00149.jpg", "img_00153.jpg", "img_00157.jpg",
    "img_00162.jpg", "img_00167.jpg", "img_00169.jpg", "img_00173.jpg", "img_00177.jpg",
    "img_00181.jpg", "img_00187.jpg", "img_00189.jpg", "img_00193.jpg", "img_00197.jpg",
    "img_00201.jpg", "img_00205.jpg", "img_00209.jpg", "img_00213.jpg", "img_00217.jpg",
    "img_00221.jpg", "img_00227.jpg", "img_00229.jpg", "img_00233.jpg", "img_00237.jpg",
    "img_00241.jpg", "img_00247.jpg", "img_00249.jpg", "img_00253.jpg", "img_00257.jpg",
    "img_00262.jpg", "img_00267.jpg", "img_00269.jpg", "img_00273.jpg", "img_00277.jpg",
    "img_00282.jpg", "img_00287.jpg", "img_00289.jpg", "img_00293.jpg", "img_00297.jpg",
    "img_00301.jpg", "img_00305.jpg", "img_00309.jpg", "img_00313.jpg", "img_00317.jpg",
    "img_00321.jpg", "img_00325.jpg", "img_00329.jpg", "img_00333.jpg", "img_00337.jpg",
    "img_00341.jpg", "img_00347.jpg", "img_00349.jpg", "img_00353.jpg", "img_00359.jpg",
    "img_00361.jpg", "img_00367.jpg", "img_00369.jpg", "img_00373.jpg", "img_00379.jpg",
    "img_00382.jpg", "img_00387.jpg", "img_00389.jpg", "img_00394.jpg", "img_00399.jpg",
    "img_00402.jpg", "img_00407.jpg", "img_00409.jpg", "img_00414.jpg", "img_00417.jpg",
    "img_00421.jpg", "img_00427.jpg", "img_00429.jpg", "img_00433.jpg", "img_00437.jpg",
    "img_00442.jpg", "img_00447.jpg", "img_00449.jpg", "img_00453.jpg", "img_00457.jpg",
    "img_00462.jpg", "img_00467.jpg", "img_00469.jpg", "img_00473.jpg", "img_00477.jpg",
    "img_00481.jpg"
];

const FRAME_PATHS = FRAME_FILENAMES.map(name => `/frames/${name}`);
const LAST_FRAME_INDEX = FRAME_FILENAMES.length - 1;

export default function HeroCanvas({ scrollTrackRef }) {
    const canvasRef = useRef(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);
    const textRef3 = useRef(null);

    // Use the hook to get the image drawing function
    const { drawFrame, isLoading, progress } = useCanvasVideo(canvasRef, FRAME_PATHS);

    useEffect(() => {
        if (isLoading) return;

        // Initial draw
        drawFrame(0);

        // Resize handler using the current progress
        const handleResize = () => {
            const st = ScrollTrigger.getById("hero-scroll");
            if (st) {
                drawFrame(st.progress * LAST_FRAME_INDEX);
            }
        };
        window.addEventListener('resize', handleResize);

        // GSAP ScrollTrigger
        // We do NOT pin here. We just track the parent container's progress.
        const tl = gsap.timeline({
            scrollTrigger: {
                id: "hero-scroll",
                trigger: scrollTrackRef.current, // The 300vh container from parent
                start: "top top",
                end: "bottom bottom",
                scrub: 0, // Instant response (no lag) or slight smoothing like 0.1
                onUpdate: (self) => {
                    const frameIndex = Math.floor(self.progress * LAST_FRAME_INDEX);
                    drawFrame(frameIndex);
                }
            }
        });

        // TEXT ANIMATIONS
        // Sync these to the timeline (0 to 1 progress of the container)

        // Scene 1: EXPLORE PARADISE (0% - 25%)
        tl.fromTo(textRef1.current,
            { opacity: 0, scale: 0.9, y: 50 },
            { opacity: 1, scale: 1, y: 0, ease: 'power2.out', duration: 0.1 }, 0
        );
        tl.to(textRef1.current,
            { opacity: 0, scale: 1.1, y: -50, ease: 'power2.in', duration: 0.05 }, 0.2
        );

        // Scene 2: FINANCING PLANS (30% - 60%)
        tl.fromTo(textRef2.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, ease: 'power2.out', duration: 0.1 }, 0.3
        );
        tl.to(textRef2.current,
            { opacity: 0, x: -50, ease: 'power2.in', duration: 0.05 }, 0.55
        );

        // Scene 3: YOU DESERVE IT (65% - 100%)
        tl.fromTo(textRef3.current,
            { opacity: 0, scale: 0.9, y: 50 },
            { opacity: 1, scale: 1, y: 0, ease: 'power2.out', duration: 0.1 }, 0.65
        );
        // It stays visible until the end, then scrolls away naturally with the sticky container

        return () => {
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getById("hero-scroll")?.kill();
            tl.kill();
        };

    }, [isLoading, drawFrame, scrollTrackRef]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center text-white">
                <h1 className="font-serif text-2xl tracking-widest mb-4">LOADING EXPERIENCE</h1>
                <div className="w-64 h-0.5 bg-white/20 overflow-hidden">
                    <div
                        className="h-full bg-white transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full bg-black">
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover filter contrast-[1.05] saturate-[1.05]"
            />

            {/* Text Layer */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {/* Text 1: Centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 ref={textRef1} className="font-serif text-[clamp(4rem,10vw,8rem)] text-white text-center leading-[0.9] tracking-tighter opacity-0 drop-shadow-2xl">
                        PREMIUM<br />DETAILING
                    </h1>
                </div>

                {/* Text 2: Bottom Left */}
                <div className="absolute inset-0 flex items-end justify-start pb-32 pl-10 md:pl-20">
                    <div>
                        <h1 ref={textRef2} className="font-serif text-[clamp(3rem,6vw,5rem)] text-white leading-none opacity-0 drop-shadow-2xl text-left">
                            Protect your<br />investment.
                        </h1>
                        <Link to="/contact">
                            <button className="mt-6 px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-sans tracking-widest uppercase text-xs hover:bg-white/20 transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-brand-gold/20 pointer-events-auto">
                                Book Now
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Text 3: Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 ref={textRef3} className="font-serif text-[clamp(3rem,8vw,7rem)] text-white text-center leading-none opacity-0 drop-shadow-2xl">
                        SHOWROOM FINISH
                    </h1>
                </div>
            </div>
        </div>
    );
}
