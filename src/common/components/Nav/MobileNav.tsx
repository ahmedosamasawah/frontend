import Link from "next/link";
import Image from "next/image";

const MobileNav = ({
  navLinks,
  isAuthenticated,
  isNavExpanded,
  setIsNavExpanded,
}) => {
  const defaultLinksBtn = (
    <>
      <Link
        className="flex items-center justify-center rounded-sm border-2 border-secondary-normal bg-secondary-normal px-10 py-2.5 text-center text-md hover:bg-secondary-normal-hover"
        href={"/login"}
      >
        تسجيل الدخول
      </Link>
      <Link
        className="flex items-center justify-center rounded-sm border-2 border-secondary-normal bg-transparent px-6 py-2.5 text-center text-md text-secondary-normal hover:bg-primary-normal-hover"
        href={"/signup"}
      >
        إنشاء حساب جديد
      </Link>
    </>
  );

  const userLinksBtn = (
    <>
      <Link
        className="flex items-center justify-center rounded-sm border-2 border-secondary-normal bg-secondary-normal px-8 py-2.5 text-center text-md hover:bg-secondary-normal-hover"
        href={"/request-service"}
      >
        اطلب استشارة
      </Link>
      <Link
        className="flex items-center justify-center rounded-sm border-2 border-secondary-normal bg-transparent px-6 py-2.5 text-center text-md text-secondary-normal hover:bg-primary-normal-hover"
        href={"/request-service"}
      >
        ارفع قضية الآن
      </Link>
    </>
  );

  return (
    <nav className="rounded fixed left-0 top-0 flex h-screen w-full flex-col items-center justify-start gap-4 bg-primary-normal px-4 pb-4 pt-6 min-[769px]:hidden">
      {/* Close button */}
      <button
        type="button"
        onClick={() => setIsNavExpanded(!isNavExpanded)}
        className="cursor-pointer self-end text-primary-light"
      >
        <Image
          width={45}
          height={45}
          src="/assets/icons/close.svg"
          alt="close button"
        />
      </button>

      {/* Nav links */}
      <ul className="flex flex-col items-center justify-center gap-3 self-stretch text-primary-light">
        {navLinks}
      </ul>

      {/* Links buttons */}
      <div className="flex flex-col items-center justify-center gap-4">
        {!isAuthenticated ? defaultLinksBtn : userLinksBtn}
      </div>
    </nav>
  );
};
export default MobileNav;
