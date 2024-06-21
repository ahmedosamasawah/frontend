"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Cta from "../common/components/Cta";
import TextArea from "../common/components/Form/TextArea";
import TextInput from "../common/components/Form/TextInput";
import Lawyer from "../common/components/Lawyer";
import MyRequest from "../common/components/MyRequest";
import CustomSlider from "../common/components/customSlider";
import EndUserLayout from "./(end-user)/layout";

const Landing = () => {
  // Get user's requests.
  // Get the user from state.
  // Get lawyers from the state.
  // Dummy Lawyers Info for testing:
  const lawyers = [
    {
      id: 1,
      name: "بندر عبد العزيز محمد",
      // imageUrl: '/',
      rating: 4,
      cat: "القانون المدني",
    },
    {
      id: 2,
      name: "سارة القحطاني",
      // imageUrl: '/',
      rating: 5,
      cat: "القانون الجنائي",
    },
    {
      id: 3,
      name: "أحمد بن خالد",
      // imageUrl: '/',
      rating: 3,
      cat: "قانون الأسرة",
    },
    {
      id: 4,
      name: "فاطمة النعيمي",
      // imageUrl: '/',
      rating: 5,
      cat: "قانون العمل",
    },
    {
      id: 5,
      name: "خالد الوليد",
      // imageUrl: '/',
      rating: 2,
      cat: "قانون التجارة",
    },
    {
      id: 6,
      name: "ليلى الغفيلي",
      // imageUrl: '/',
      rating: 4,
      cat: "قانون العقارات",
    },
    {
      id: 7,
      name: "مروان الصالح",
      // imageUrl: '/',
      rating: 5,
      cat: "القانون الدولي",
    },
    {
      id: 8,
      name: "نورة الشمري",
      // imageUrl: '/',
      rating: 3,
      cat: "قانون الملكية الفكرية",
    },
    {
      id: 9,
      name: "عمر فاروق البلوشي",
      // imageUrl: '/',
      rating: 4,
      cat: "قانون الضرائب",
    },
    {
      id: 10,
      name: "هند المطيري",
      // imageUrl: '/',
      rating: 5,
      cat: "قانون البيئة",
    },
  ];

  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    message: "",
  });
  const contactInfoChangeHandler = e => {
    setContactInfo(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const contactSubmitHandler = e => {
    e.preventDefault();
  };
  return (
    <EndUserLayout>
      {/* Hero Section */}
      <section
        className={
          "hero-section flex h-screen flex-col items-center justify-center bg-[url(/assets/images/hero-img.png)] bg-cover px-4 lg:px-8"
        }
      >
        <div className="self-start font-['Montserrat-Arabic'] text-white max-md:hidden lg:ps-8">
          <p className="text-base font-normal">ريان 👋 ، أهلا وسهلا بك.</p>
          <p className="w-[355px] text-sm font-light leading-[21px]">
            نتمنى لك تجربة مميزة على موقعنا. إذا كنت بحاجة لأي مساعدة، فلا تتردد
            في التواصل. نحن هنا لخدمتك.
          </p>
        </div>

        <div className={"text-center text-white"}>
          <p className={"mb-4 text-1xl md:text-2xl lg:text-3xl xl:text-5xl"}>
            شركة ريان رده الثبيتي
          </p>
          <p className={"text-1xl md:text-base lg:text-lg xl:text-2xl"}>
            للمحاماة والاستشارات القانونية
          </p>
          <div
            className={
              "mt-12 flex justify-center gap-6 text-base text-primary-normal lg:text-md"
            }
          >
            <Link
              href=""
              className="btn--filled w-32 rounded-sm border-2 py-4 lg:w-40"
            >
              اطلب استشارة
            </Link>
            <Link
              href=""
              className={"btn--outlined w-32 rounded-sm border-2 py-4 lg:w-40"}
            >
              ارفع قضية
            </Link>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section
        id="services"
        className={"bg-text-normal px-4 py-12 text-center lg:px-8 lg:py-24"}
      >
        <div className={"container mx-auto grid gap-6 md:grid-cols-2"}>
          <div className={"flex justify-center rounded-md bg-background"}>
            <div className={"max-w-[24rem] p-4 lg:p-8 lg:py-16"}>
              <Image
                width={50}
                height={50}
                className={"mx-auto mb-4 md:mb-10"}
                src="/assets/icons/advice-request.svg"
                alt="Adivice request icon"
              />
              <h3 className={"mb-2 text-1xl text-[#FAEEE0] md:mb-6"}>
                اطلب استشارة
              </h3>
              <p className={"text-md font-light text-text-light"}>
                استخدم خدمة طلب الاستشارة للحصول على نصيحة فورية ومستنيرة من
                خبرائنا القانونيين. دعنا نقدم لك الإرشاد الذي قد تحتاجه لفهم
                حقوقك بوضوح.
              </p>
            </div>
          </div>
          <div className={"flex justify-center rounded-md bg-background"}>
            <div className={"max-w-[24rem] p-8 lg:p-8 lg:py-16"}>
              <Image
                width={50}
                height={50}
                className={"mx-auto mb-4 md:mb-10"}
                src="/assets/icons/issue-request.svg"
                alt="Adivice request icon"
              />
              <h3 className={"mb-2 text-1xl text-[#FAEEE0] md:mb-6"}>
                ارفع قضية
              </h3>
              <p className={"text-md font-light text-text-light"}>
                في خدمة رفع القضية، نهتم بمعالجة قضيتك بكل اهتمام واحتراف. اسند
                إلينا همومك القانونية واطمئن إلى أننا سنتخذ كل الخطوات اللازمة
                بكفاءة فائقة.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* My Request Section */}
      {/* For Later: Will be displayed if the user exists */}
      <section className={"container mx-auto px-4 py-12 lg:px-8 lg:py-24"}>
        <div
          className={
            "mx-auto mb-12 flex items-center justify-between text-white"
          }
        >
          <h4 className={"text-xl lg:text-2xl"}>آخر طلباتي</h4>
          <Link
            href="/my-requests"
            className={"flex items-center text-sm text-secondary-normal"}
          >
            عرض جميع طلباتك
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.3996 16.8L9.59961 12L14.3996 7.19999"
                stroke="#E4AC66"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div className={"gap-6 lg:grid lg:grid-cols-2"}>
          <MyRequest />
          <MyRequest />
        </div>
      </section>
      {/* Our rated lawyers */}
      {/* For later get lawyers from the state */}
      <section
        className={
          "container mx-auto overflow-clip px-4 py-12 lg:px-8 lg:py-24"
        }
      >
        <div className={"mb-8 flex items-center justify-between text-white"}>
          <h4 className={"text-xl lg:text-2xl"}>محامونا</h4>
          {/* For Later: Put the arrows work */}
          <Link
            href="/lawyers"
            className={
              "hidden items-center text-base text-secondary-normal md:flex"
            }
          >
            عرض جميع المحامين
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.3996 16.8L9.59961 12L14.3996 7.19999"
                stroke="#E4AC66"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </div>
        <CustomSlider>
          {lawyers.map((lawyer, index) => (
            <Lawyer key={index} {...lawyer} />
          ))}
        </CustomSlider>
      </section>
      {/* About-us Section */}
      <section className={"bg-text-normal"} id={"about-us"}>
        <div className="container mx-auto items-center px-4 py-12 lg:grid lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
          <div className={"hidden items-center lg:relative lg:grid"}>
            <div
              className={
                "h-[30rem] w-96 rounded-md border-[10px] border-secondary-normal lg:block"
              }
            >
              {" "}
            </div>
            <div className={"lg:absolute lg:z-10 lg:justify-self-center"}>
              <Image
                width={432}
                height={432}
                src="/assets/images/about-us.png"
                alt="About Us image"
                className="w-full"
              />
            </div>
          </div>
          <div>
            <div className={"flex items-center gap-8"}>
              <h4 className={"text-nowrap text-2xl font-medium text-white"}>
                من نحن
              </h4>
              <span
                className={"block h-1 w-[200px] rounded-sm bg-secondary-normal"}
              />
            </div>
            <p className={"mt-6 text-lg font-light text-white"}>
              شركة ريان رده الثبيتي للمحاماة والاستشارات القانونية من الشركات
              الرائدة في مهنة المحاماة بالمملكة العربية السعودية، وأحد الشركات
              المعتمدة لدى الهيئة السعودية للمحامين، يتكون فريق العمل من نخبة
              متميزة من الكوادر المهنية من المحامون والمستشارون في معظم مجالات
              القانون، يقدم المكتب الخدمات القانونية بجودة عالية وأداء احترافي
              والتي تخدم الشركات الخاصة والقطاعات الحكومية حافظت الشركة على سجل
              ممتـاز في إنجاز الأعمال القانونية ضمن فريق عمل قانوني احترافي.
            </p>
          </div>
        </div>
      </section>
      {/* Services Section */}
      {/* Contact Us */}
      <section
        id="contact-us"
        className={"container mx-auto px-4 py-12 lg:px-8 lg:py-24"}
      >
        <div className={"h-[39rem] lg:grid lg:grid-cols-2"}>
          <div
            className={
              "flex justify-center rounded-r-md py-12 max-lg:mx-auto lg:border-y-[5px] lg:border-r-[5px] lg:border-secondary-normal"
            }
          >
            <form
              onSubmit={contactSubmitHandler}
              className={"flex flex-col gap-4 text-sm md:text-md lg:w-[392px]"}
            >
              <h3 className={"mb-8 text-center text-xl font-medium text-white"}>
                تواصل معنا
              </h3>
              <TextInput
                labelText={"الاسم"}
                name={"name"}
                value={contactInfo.name}
                type={"text"}
                changeHandler={contactInfoChangeHandler}
                placeholder={"عمرو خالد"}
              />
              <TextInput
                labelText={"البريد الالكتروني"}
                name={"email"}
                value={contactInfo.email}
                type={"email"}
                changeHandler={contactInfoChangeHandler}
                placeholder={"example@gamil.com"}
              />
              <TextArea
                labelText={"الموضوع"}
                name={"message"}
                value={contactInfo.message}
                changeHandler={contactInfoChangeHandler}
                placeholder={"اكتب رسالتك هنا"}
              />
              <Cta text={"أرسل"} type={"submit"} />
            </form>
          </div>
          <div
            className={
              "hidden h-full rounded-l-md bg-[url(/assets/images/contact.png)] bg-cover lg:block"
            }
          />
        </div>
      </section>
    </EndUserLayout>
  );
};

export default Landing;
