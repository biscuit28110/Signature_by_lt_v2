import Image from 'next/image'
 
export default function LogoNavbar() {
  return (
    <Image
      src="/assets/logo/logo-by-lt.png"
      width={500}
      height={500}
      alt="Logo Signature by LT – Coiffure & beauté"
      className='w-40 md:w-52 lg:w-60 object-contain transition-transform duration-700 ease-out hover:scale-105'
      priority // 👈 charge le logo dès le début pour un affichage instantané
    />
  )
}