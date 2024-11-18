"use client"
import * as React from "react"

import { motion } from "framer-motion"

import useFadeUp from "hooks/useFadeUp"
import classNames from "utils/classNames"

interface IProfile {
  name: string
  title: string
  url: string
  avatar: string
}

interface Props {
  profiles?: IProfile[]
  className?: string
}

const Profile: React.FC<Props> = ({ profiles = [], className }) => {
  const { ref, controls, variants } = useFadeUp()

  return (
    <div
      ref={ref}
      className={classNames("grid grid-cols-2 gap-5 md:gap-12", className)}
    >
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
            className="mb-8 size-32 rounded-full bg-cover bg-no-repeat md:size-48"
            style={{ backgroundImage: `url("${profile.avatar}")` }}
          />
          <p className="mb-1.5 text-xl font-bold leading-normal text-gray-900 md:text-2xl">
            {profile.name}
          </p>
          <p className="mb-4 text-sm font-semibold leading-normal text-gray-500 md:text-base">
            {profile.title}
          </p>
          <a
            href={`https://${profile.url}`}
            target="_blank"
            className="text-sm font-semibold leading-normal text-amber-500 md:text-base"
          >
            {profile.url}
          </a>
        </motion.div>
      ))}
    </div>
  )
}

export default Profile
