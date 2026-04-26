import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const BlurText = ({
  text = "",
  className = "",
  delay = 200,
  direction = "bottom",
  animateBy = "words",
  once = true,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  const tokens = animateBy === "words" ? text.split(" ") : text.split("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasTriggered)) {
          controls.start("visible");
          setHasTriggered(true);
        } else if (!once) {
          controls.start("hidden");
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls, hasTriggered, once]);

  const yVal = direction === "bottom" ? 50 : -50;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: delay / 1000 } },
  };

  const wordVariants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: yVal },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="inline-block"
          style={{ marginRight: animateBy === "words" ? "0.25em" : "0" }}
        >
          {token}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default BlurText;
