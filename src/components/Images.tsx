import Image from "next/image";

type LogoNavbarProps = {
  className?: string;
};

export default function LogoNavbar({ className }: LogoNavbarProps = {}) {
  const baseClasses =
    "object-contain transition-transform duration-700 ease-out hover:scale-105";
  const widthClasses = className ?? "w-48 md:w-60 lg:w-72";

  return (
    <Image
      src="/assets/logo/logo-by-lt.png"
      width={500}
      height={500}
      alt="Logo Signature by LT – Coiffure & beauté"
      className={`${baseClasses} ${widthClasses}`}
      priority
    />
  );
}
