import HeroImage from '.././assets/banner.jpg';

const Hero = () => {
  return (
    <div>
       <div className="flex-col text-center w-110 items-center mx-auto">
        <img src={HeroImage} alt="Example" className="rounded-lg shadow-lg mx-auto" />
        <h1 className="text-3xl mt-8">Merhaba, Ben Sinan ...</h1>
        <p className="text-md my-6">
          Yeni teknolojiler öğrenmeyi ve burada öğrendiklerimi paylaşmayı amaçlıyorum. Ayrıca webte tutmuş olduğum notları da burada paylaşacağım. Belki işinize yarar.
        </p>
      </div>
    </div>
  )
}

export default Hero