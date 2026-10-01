import React, { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';

const FallingText = ({ 
  text = '', 
  highlightWords = [], 
  trigger = 'auto', 
  backgroundColor = 'transparent', 
  wireframes = false, 
  gravity = 1, 
  mouseConstraintStiffness = 0.2, 
  fontSize = '1rem' 
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(' ');
    
    // Added whitespace-nowrap to prevent text breaking inside the physics bodies
    const newHTML = words
      .map(word => {
        const isHighlighted = highlightWords.some(hw => word.startsWith(hw));
        return `<span 
          class="inline-block mx-3 my-2 select-none font-normal text-transparent cursor-pointer hover:text-white transition-colors duration-300" 
          style="-webkit-text-stroke: 1px rgba(255, 255, 255, 0.6); white-space: nowrap;"
        >
          ${word}
        </span>`;
      })
      .join(' ');

    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords]);

  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
      return;
    }
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;
    
    if (!containerRef.current || !canvasContainerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    // Check if mobile to disable mouse interaction
    const isMobile = window.innerWidth < 768;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
        pixelRatio: window.devicePixelRatio
      }
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' }
    };

    // Add floors and walls
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    
    // Ceiling to keep items inside
    const ceiling = Bodies.rectangle(width / 2, -100, width, 50, boundaryOptions);

    if (!textRef.current) return;

    const wordSpans = textRef.current.querySelectorAll('span');
    const wordBodies = [...wordSpans].map(elem => {
      const rect = elem.getBoundingClientRect();
      
      // Calculate relative position inside the container
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;
      
      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.6, // Bounciness
        frictionAir: 0.02, // Higher friction air slows them down a bit more
        friction: 0.1
      });

      // Random initial velocity/spin
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: (Math.random() - 0.5) * 3 });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      return { elem, body };
    });

    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = 'absolute';
      elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
      elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
      elem.style.transform = 'none';
      elem.style.width = `${body.bounds.max.x - body.bounds.min.x}px`;
    });

    const worldBodies = [floor, leftWall, rightWall, ceiling, ...wordBodies.map(wb => wb.body)];

    // Only add mouse constraint if NOT mobile
    // This prevents the "jumping" effect on swipe and allows normal scrolling
    if (!isMobile) {
      const mouse = Mouse.create(containerRef.current);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: mouseConstraintStiffness,
          render: { visible: false }
        }
      });
      render.mouse = mouse;
      worldBodies.push(mouseConstraint);
    }

    World.add(engine.world, worldBodies);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        const angle = body.angle;
        
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
      });

      Matter.Engine.update(engine);
      requestAnimationFrame(updateLoop);
    };

    updateLoop();

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        if (canvasContainerRef.current.contains(render.canvas)) {
          canvasContainerRef.current.removeChild(render.canvas);
        }
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
    // Added fontSize to dependencies so physics engine resets when font size changes
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness, fontSize]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative z-[1] w-full h-full cursor-pointer overflow-hidden touch-none"
      style={{ touchAction: 'pan-y' }} // Allow vertical scroll on mobile
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
    >
      <div 
        ref={textRef} 
        className="w-full h-full p-10 flex flex-wrap justify-center content-start gap-4"
        style={{ fontSize, lineHeight: 1.4 }}
      />
      <div className="absolute top-0 left-0 z-0 w-full h-full pointer-events-none" ref={canvasContainerRef} />
    </div>
  );
};

export default FallingText;