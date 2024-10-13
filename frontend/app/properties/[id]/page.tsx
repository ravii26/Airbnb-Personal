import Image from "next/image";
import Link from "next/link";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";

import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";
import { motion } from "framer-motion";

import { AiOutlineCar, AiOutlineWifi } from "react-icons/ai";
import { BiCctv } from "react-icons/bi";
import { BsFire } from "react-icons/bs";
import { FaFireExtinguisher, FaUser, FaBath } from "react-icons/fa";
import { GiButterflyFlower } from "react-icons/gi";
import { GrWorkshop } from "react-icons/gr";
import { MdOutlineBathtub, MdOutlineCoffeeMaker } from "react-icons/md";
import { RiSafeLine } from "react-icons/ri";
import { BiBed } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";


const offersRowOne = [
    {
        label: "Garden view",
        icon: GiButterflyFlower,
    },
    {
        label: "Hot water",
        icon: BsFire,
    },

    {
        label: "Wifi",
        icon: AiOutlineWifi,
    },
    {
        label: "Coffee",
        icon: MdOutlineCoffeeMaker,
    },
    {
        label: "Security cameras on property",
        icon: BiCctv,
    },
];

const offersRowTwo = [
    {
        label: "Bathtub",
        icon: MdOutlineBathtub,
    },
    {
        label: "Dedicated workspace",
        icon: GrWorkshop,
    },
    {
        label: "Safe",
        icon: RiSafeLine,
    },
    {
        label: "Free parking on premises",
        icon: AiOutlineCar,
    },
    {
        label: "Fire extinguisher",
        icon: FaFireExtinguisher,
    },
];


const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {
    console.log("page")
    const property = await apiService.get(`http://localhost:8000/api/properties/${params.id}`);
    const userId = await getUserId();

    console.log('userId', userId);

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src={property.image_url}
                    className="object-cover w-full h-full"
                    alt="Property image"
                />
            </div>

            {/* Grid layout for 70:30 ratio */}
            <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
                {/* Main content (70%) */}
                <div className="col-span-7 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <div className="text-xl font-bold flex flex-row items-center gap-2">
                        <Link 
                        href={`/landlords/${property.landlord.id}`}
                        className="py-6 flex items-center space-x-4"
                    >
                            <div>Hosted by {property.landlord.name}</div>
                            <div>
                                {property.landlord.avatar_url ? (
                                    <Image
                                        className="rounded-full"
                                        height="30"
                                        width="30"
                                        alt="hostImage"
                                        src={property.landlord.avatar_url}
                                    />
                                ) : property.landlord.name ? (
                                    <img
                                        className="rounded-full h-[30px] w-[30px]"
                                        alt="nameImage"
                                        src={`https://ui-avatars.com/api/?name=${property.landlord.name}`}
                                    />
                                ) : (
                                    <Image
                                        className="rounded-full"
                                        height="30"
                                        width="30"
                                        alt="noUser"
                                        src="/assets/avatar.png"
                                    />
                                )}
                            </div>
                        </Link>
                        </div>
                        <div className="flex flex-row items-center gap-4 font text-neutral-500">
                            <p>{property.guests} guests</p>
                            <p>{property.bedrooms} rooms</p>
                            <p>{property.bathrooms} bathrooms</p>
                        </div>
                    </div>
                    <hr />
                    <div className="flex flex-col">
                        <p className="text-4xl font-bold text-[#FF5A5F]">
                            air<span className="text-black">cover</span>
                        </p>
                        <p className="text-neutral-500 pt-3">
                            Every booking includes free protection from Host cancellations,
                            listing inaccuracies, and other issues like trouble checking in.
                        </p>
                        <p className="text-black font-bold underline pt-3 cursor-pointer">
                            Learn more
                        </p>
                    </div>
                    <hr />
                    <p className="text-lg font-light text-neutral-500">{property.description}</p>
                    <hr />
                    <div>
                        <p className="text-xl font-semibold">{`Details about living..`}</p>
                        <div className="flex pt-6">
                            <div className="border p-4 border-black rounded-md cursor-pointer">
                                <div className="flex flex-col justify-start items-start px-6 py-6 gap-1 text-center">
                                    <FaUser size={25} />
                                    <p className="text-lg text-black font-medium">Guestes</p>
                                    <p className="text-sm text-neutral-500">{ property.guests}</p>
                                </div>
                            </div>
                            <div className="border p-4 mx-4 border-black rounded-md cursor-pointer">
                                <div className="flex flex-col justify-start items-start px-6 py-6 gap-1 text-center">
                                    <IoBedOutline size={25} />
                                    <p className="text-lg text-black font-medium">Bedrooms</p>
                                    <p className="text-sm text-neutral-500">{property.bedrooms}</p>
                                </div>
                            </div>
                            <div className="border p-4 border-black rounded-md cursor-pointer">
                                <div className="flex flex-col justify-start items-start px-6 py-6 gap-1 text-center">
                                    <div className="flex justify-between gap-2">
                                        <FaBath size={25} />
                                    </div>
                                    <p className="text-lg text-black font-medium">Bathrooms</p>
                                    <p className="text-sm text-neutral-500">
                                        {property.bathrooms}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <p className="text-xl font-semibold">What this place offers</p>
                        <div className="flex justify-start space-x-12 pt-6">
                            <div className="flex flex-col gap-2">
                                {offersRowOne.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-start items-center text-center gap-4 my-1 cursor-pointer"
                                    >
                                        <item.icon size={25} className="text-gray-700" />
                                        <p className="text-neutral-500">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                            {/* another row */}
                            <div className="flex flex-col gap-2">
                                {offersRowTwo.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-start items-center text-center gap-4 my-1 cursor-pointer"
                                    >
                                        <item.icon size={25} className="text-gray-700" />
                                        <p className="text-neutral-500">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar content (30%) */}
                <div className="col-span-3">
                    <ReservationSidebar property={property} userId={userId} />
                </div>
            </div>
        </main>

    )
}

export default PropertyDetailPage;