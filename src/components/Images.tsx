import Image from 'next/image'
 
export default function LogoNavbar() {
  return (
    <Image
      src="/assets/logo/logo-by-lt.png"
      width={500}
      height={500}
      alt="Picture of the navbar"
      className='w-60 object-contain'
    />
  )
}