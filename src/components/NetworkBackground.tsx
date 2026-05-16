/* eslint-disable */
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 150 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate random positions once
  const { current: { positions, velocities } } = useRef(
    (() => {
      const pos = new Float32Array(count * 3);
      const vel = [];
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 10;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        vel.push({
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        });
      }
      return { positions: pos, velocities: vel };
    })()
  );

  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const maxLines = (count * (count - 1)) / 2;
    const positions = new Float32Array(maxLines * 6); // 2 vertices per line, 3 coords per vertex
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setDrawRange(0, 0);
    return geometry;
  }, [count]);

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#4E85BF"),
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      }),
    []
  );

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;

      // Bounce off invisible boundaries
      if (Math.abs(positions[i * 3]) > 5) velocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 5) velocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 5) velocities[i].z *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Calculate connections
    const maxDistance = 1.8;
    let lineCount = 0;
    const linePositions = linesRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          linePositions.setXYZ(lineCount * 2, positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          linePositions.setXYZ(lineCount * 2 + 1, positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
          lineCount++;
        }
      }
    }

    linesRef.current.geometry.setDrawRange(0, lineCount * 2);
    linePositions.needsUpdate = true;

    // Subtle parallax mouse rotation
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    
    // Smooth interpolation
    pointsRef.current.rotation.y += 0.05 * (targetX - pointsRef.current.rotation.y);
    pointsRef.current.rotation.x += 0.05 * (-targetY - pointsRef.current.rotation.x);
    
    linesRef.current.rotation.y = pointsRef.current.rotation.y;
    linesRef.current.rotation.x = pointsRef.current.rotation.x;
  });

  return (
    <>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4E85BF"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <lineSegments ref={linesRef} geometry={linesGeometry} material={lineMaterial} frustumCulled={false} />
    </>
  );
}

export default function NetworkBackground() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#050505]">
      {/* Ambient center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,95,0.15)_0%,rgba(5,5,5,1)_100%)] pointer-events-none" />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(78, 133, 191, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(78, 133, 191, 0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(circle at center, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)"
        }}
      />
      
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
        <fog attach="fog" args={["#050505", 5, 12]} />
        <Particles count={150} />
      </Canvas>
    </div>
  );
}
