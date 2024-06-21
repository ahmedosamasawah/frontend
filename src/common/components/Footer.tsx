import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-auto bg-[#000] py-10 text-sm text-white sm:text-md">
      <div className={"container mx-auto flex items-center lg:px-8"}>
        <Image
          className="max-sm:hidden"
          src="/assets/images/logo.png"
          alt="Logo Image"
          width={56}
          height={54}
        />
        <div className={"grow"}>
          <div
            className={
              "flex justify-center gap-6 text-nowrap font-light max-lg:mb-4"
            }
          >
            {/* Contact up */}
            <Link href="">{"اتصل بنا"}</Link>
            {/*    */}
            <Link href="">{"الشروط و الأحكام"}</Link>
            {/*    */}
            <Link href="">{"سياسة الخصوصية"}</Link>
          </div>
          {/* Social Links */}
          <div
            className={
              "flex justify-center gap-6 py-2 max-lg:mb-4 lg:justify-end [&>*:hover]:scale-125 [&>*]:duration-200"
            }
          >
            <Image
              src="/assets/icons/YouTube-logo.svg"
              alt="YouTube Logo Image"
              className="cursor-pointer"
              width={24}
              height={24}
            />
            <Image
              src="/assets/icons/x-logo.svg"
              alt="X Logo Image"
              className={"cursor-pointer"}
              width={24}
              height={24}
            />
            <Image
              src="/assets/icons/Facebook-logo.svg"
              alt="Facebook Logo Image"
              className={"cursor-pointer"}
              width={24}
              height={24}
            />
            <Image
              src="/assets/icons/Instagram-logo.svg"
              alt="Instagram Logo Image"
              className={"cursor-pointer"}
              width={24}
              height={24}
            />
          </div>
          {/* Copyright */}
          <p className={"text-center text-base text-text-light-active"}>
            جميع الحقوق محفوظة &copy; شركة تقاضي 2023
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
