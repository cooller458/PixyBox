import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import Paragraph1 from './../components/index/paragraph1'
import Paragraph2 from './../components/index/paragraph2'
import Paragraph3 from "../components/index/paragraph3";
import Paragraph4 from './../components/index/paragraph4'
export default function Home() {
  return (
    <>
      <Head>
        <title>PixyBox | NFT Mint & Box</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header current={0} />
      <div className='bg-[#0D0F23] dark:bg-white'>
        <div className='w-full 2xl:max-w-screen-2xl h-auto pt-[104px] flex flex-col m-auto'>
          <Paragraph1 />
          <Paragraph2 />
          <Paragraph3 />
          <Paragraph4 />
        </div>
      </div>
      <Footer />
    </>
  );
}
