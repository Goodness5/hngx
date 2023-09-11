import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='w-full items-center justify-center align-middle'>
        <div className="flex m-auto gap-8 justify-center items-center p-4">
            <Link href='https://www.facebook.com/goodnessoluwatemilorun.kolapo' >
                <Image src='/facebookicon.svg' alt='fb' width={30} height={30} />
                </Link>
            <Link href='https://instagram.com/goodnessoluwatemilorun?igshid=ZGUzMzM3NWJiOQ==' >
                <Image src='/instagramicon.svg' alt='fb' width={30} height={30} />
                </Link>
            <Link href='https://www.x.com/goodnesskolapo' >
                <Image src='/twittericon.svg' alt='fb' width={30} height={30} />
                </Link>
            <Link href='https://youtube.com/@kolapogoodness' >
                <Image src='/youtubeicon.svg' alt='fb' width={30} height={30} />
                </Link>
        </div>

        <div className="flex justify-center items-center p-3">
            <Link href='#'>
                Conditions of Use
            </Link>
            <Link href='#'>
                Privacy & Policy
            </Link>
            <Link href='#'>
                Press Room
            </Link>
        </div>

        <div className="flex justify-center items-center text-[#6B7280] p-2 ">&copy;Moviebox by superman</div>
    </div>
  )
}

export default Footer