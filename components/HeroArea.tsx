import Image from "next/image"

const HeroArea = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mt-1 px-4 md:px-16">
        <div className="bg-black col-span-1 rounded-md p-1">
          <figure>
            <Image src="/images/img.png" alt="test for banner image" className="w-full h-[350px] rounded-md object-cover" width={500} height={400} />
          </figure>
        </div>
      <div className="bg-black col-span-3 rounded-md p-1">
        <figure>
          <Image src="/images/slide-1.png" alt="test for banner image" className="w-full h-[350px] object-cover rounded-md" width={500} height={400} />
        </figure>
      </div>
    </div>
  )
}

export default HeroArea
