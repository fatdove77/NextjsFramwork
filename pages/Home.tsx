import React from 'react'
import Link from "next/link";
import CameraComponent from "@/component/Camera"
const Home: React.FC = () => {
  return (
    <div>
      home
      <CameraComponent></CameraComponent>
      <div className="h-[20rem]">1</div>
    </div>
  )
}

export default Home