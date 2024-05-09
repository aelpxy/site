'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

interface TrackCardProps {
  track: {
    data: {
      name: string
      artists: {
        items: {
          profile: {
            name: string
          }
        }[]
      }
      albumOfTrack: {
        name: string
        coverArt: {
          sources: {
            url: string
          }[]
        }
      }
      uri: string
    }
  }
}

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-row items-center space-x-4 border py-5 px-6 border-neutral-800'
    >
      <Image
        src={track.data.albumOfTrack.coverArt.sources[0].url}
        alt={track.data.name}
        className='h-16 w-18 rounded-md'
        height={64}
        width={64}
      />
      <div className='flex flex-col'>
        <Link
          href={`https://open.spotify.com/track/${track.data.uri.split(':')[2]}`}
          target='_blank'
          className='focus:outline-offset-6 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500 focus:decoration-neutral-500'
        >
          <h3 className='font-semibold text-neutral-100'>{track.data.name}</h3>
        </Link>
        <p>
          {track.data.artists.items
            .map((artist) => artist.profile.name)
            .join(', ')}
        </p>
        <p>{track.data.albumOfTrack.name}</p>
      </div>
    </motion.div>
  )
}

export default TrackCard