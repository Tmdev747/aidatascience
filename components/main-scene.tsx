"use client"

import { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import type { Group } from "three"
import IntroModule from "./modules/intro-module"
import MachineLearningModule from "./modules/machine-learning-module"
import NeuralNetworksModule from "./modules/neural-networks-module"
import NLPModule from "./modules/nlp-module"
import ComputerVisionModule from "./modules/computer-vision-module"
import ApplicationsModule from "./modules/applications-module"
import QuizModule from "./modules/quiz-module"

interface MainSceneProps {
  currentModule: string
}

export default function MainScene({ currentModule }: MainSceneProps) {
  const group = useRef<Group>(null)
  const { camera } = useThree()

  // Reset camera position when changing modules
  useEffect(() => {
    camera.position.set(0, 2, 10)
    camera.lookAt(0, 0, 0)
  }, [currentModule, camera])

  useFrame((state) => {
    if (group.current) {
      // Subtle floating animation
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <group ref={group}>
      {/* Central platform */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[8, 8, 0.2, 64]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Floating BSU logo */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          font="/fonts/Geist_Bold.json"
          position={[0, 3, -6]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          BATANGAS STATE UNIVERSITY
        </Text>
      </Float>

      {/* Render the current module */}
      {currentModule === "intro" && <IntroModule />}
      {currentModule === "machine-learning" && <MachineLearningModule />}
      {currentModule === "neural-networks" && <NeuralNetworksModule />}
      {currentModule === "nlp" && <NLPModule />}
      {currentModule === "computer-vision" && <ComputerVisionModule />}
      {currentModule === "applications" && <ApplicationsModule />}
      {currentModule === "quiz" && <QuizModule />}
    </group>
  )
}
