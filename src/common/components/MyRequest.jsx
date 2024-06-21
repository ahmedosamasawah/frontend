import Link from "next/link";
import Image from "next/image";

const MyRequest = () => {
  return (
    <div className="mb-4 flex max-w-full flex-col gap-8 rounded-sm bg-background p-8 text-sm md:text-md">
      <div className="flex w-full flex-col gap-4 sm:gap-8">
        <div className="flex w-full flex-col gap-[11.5px]">
          <div className="flex w-full items-center justify-between gap-2">
            <p className="text-balance text-white lg:text-lg">
              تحليل عقد تأسيس الشركات
            </p>
            <p className="text-nowrap rounded-xs bg-[#436789] p-2 font-light text-white">
              قانون الأعمال
            </p>
          </div>
          <div className="flex w-full items-center gap-[18px]">
            <Image
              width={50}
              height={50}
              src="/muslim.png"
              alt=""
              className="aspect-square w-8 rounded-full object-cover"
            />
            <p className="font-light text-white">محمد العتيبي</p>
          </div>
        </div>
        <div className="flex w-full flex-col justify-start gap-2">
          <p className="text-white">
            <span className="text-secondary-normal">رقم الطلب</span>: 202345
          </p>
          <p className="text-white">
            <span className="text-secondary-normal">مدة الاستشارة</span>: ربع
            ساعة
          </p>
          <p className="text-white">
            <span className="text-secondary-normal">سعر الاستشارة</span>: 500
            ريال سعودي
          </p>
        </div>
        <div className="mx-auto flex w-max flex-col justify-start gap-2 text-nowrap xs:flex-row xs:gap-10 sm:justify-between [&_img]:select-none [&_span]:select-none">
          <div className="flex w-full items-center gap-2">
            <Image
              src="/assets/icons/calender.svg"
              alt="Calender icon"
              width={24}
              height={24}
            />
            <span className="font-light text-white">15 يناير 2023</span>
          </div>
          <div className="flex w-full items-center gap-2">
            <Image
              width={24}
              height={24}
              src="/assets/icons/clock.svg"
              alt="Clock icon"
            />
            <span className="font-light text-white">2:00 مساء</span>
          </div>
          <div className="flex w-full items-center gap-2">
            <Image
              src="/assets/icons/active.svg"
              alt="Active service icon"
              width={24}
              height={24}
            />
            <span className="font-light text-white">نشطة</span>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-6">
        <Link
          href="/"
          className="btn--filled flex w-full items-center justify-center text-nowrap rounded-sm px-3 py-4 text-center text-sm text-primary-normal sm:text-md"
        >
          تواصل عبر الدردشة
        </Link>
        <Link
          href="/"
          className="btn--outlined flex w-full items-center justify-center text-nowrap rounded-sm border-2 px-3 py-4 text-center text-sm sm:text-md"
        >
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
};
export default MyRequest;
