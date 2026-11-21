"use client";

import { useEffect, useRef, useState } from "react";


export default function CountUp({ value, duration = 1200 }) {
    const ref = useRef(null);
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let frame;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();

                if (reduceMotion) {
                    setDisplay(value);
                    return;
                }

                const start = performance.now();
                const tick = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);

                    setDisplay(Math.round(value * eased));

                    if (progress < 1) frame = requestAnimationFrame(tick);
                };
                frame = requestAnimationFrame(tick);
            },
            { threshold: 0.4 }
        );

        observer.observe(node);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [value, duration]);

    return <span ref={ref}>{display.toLocaleString("en-US")}</span>;
}