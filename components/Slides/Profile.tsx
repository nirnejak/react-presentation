"use client"
import * as React from "react"
import { useInView } from "react-intersection-observer"

import { motion, useAnimation } from "framer-motion"

import classNames from "utils/classNames"

interface Profile {
  name: string
  title: string
  url: string
  avatar: string
}

interface Props {
  profiles?: Profile[]
  className?: string
}

const About: React.FC<Props> = ({ profiles = [], className }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  React.useEffect(() => {
    if (inView) {
      controls.start("visible").catch((err) => {
        console.log(err)
      })
    }
  }, [controls, inView])

  const variants = {
    hidden: { translateY: 10, opacity: 0 },
    visible: { translateY: 0, opacity: 1 },
  }

  return (
    <div ref={ref} className={classNames("grid grid-cols-2 gap-5", className)}>
      {profiles.map((profile, index) => (
        <motion.div
          key={index}
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{
            delay: 0.1 * (index + 1),
            duration: 0.4,
            type: "spring",
          }}
          className="flex flex-col items-center"
        >
          <div
            className="mb-8 size-40 rounded-full bg-cover bg-no-repeat"
            style={{ backgroundImage: `url("${profile.avatar}")` }}
          />
          <p className="mb-2 text-2xl font-bold leading-normal text-gray-900">
            {profile.name}
          </p>
          <p className="mb-2 font-semibold leading-normal text-gray-500">
            {profile.title}
          </p>
          <a
            href={`https://${profile.url}`}
            target="_blank"
            className="font-semibold leading-normal text-amber-500"
          >
            {profile.url}
          </a>
        </motion.div>
      ))}
    </div>
  )
}

export default About
