import * as motion from "motion/react-client"
import Image, { type StaticImageData } from "next/image"
import type * as React from "react"

import { fadeUp } from "@/utils/animation"
import classNames from "@/utils/classNames"

interface IProfile {
  name: string
  title: string
  url: string
  avatar: StaticImageData
}

interface Props {
  profiles?: IProfile[]
  className?: string
}

const Profile: React.FC<Props> = ({ profiles, className }) => {
  return (
    <div className={classNames("grid grid-cols-2 gap-5 md:gap-12", className)}>
      {profiles?.map((profile, index) => (
        <motion.div
          key={profile.name}
          {...fadeUp(0.1 * (index + 1))}
          className="flex flex-col items-center"
        >
          <Image
            src={profile.avatar}
            alt=""
            placeholder="blur"
            sizes="192px"
            className="mb-8 size-32 rounded-full object-cover md:size-48"
          />
          <p className="mb-1.5 text-xl/normal font-bold text-gray-900 md:text-2xl">
            {profile.name}
          </p>
          <p className="mb-4 text-sm/normal font-semibold text-gray-500 md:text-base">
            {profile.title}
          </p>
          <a
            href={`https://${profile.url}`}
            target="_blank"
            className="text-sm/normal font-semibold text-amber-500 md:text-base"
          >
            {profile.url}
          </a>
        </motion.div>
      ))}
    </div>
  )
}

export default Profile
