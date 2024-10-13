import Image from 'next/image';

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory
}) => {
    const categories = [
        { label: 'Beach', value: 'beach', icon: '/sunset.png' },
        { label: 'Villas', value: 'villas', icon: '/sunset.png' }, // Change the icon for Villas
        { label: 'Cabins', value: 'cabins', icon: '/sunset.png' }, // Change the icon for Cabins
        { label: 'Tiny homes', value: 'tiny_homes', icon: '/sunset.png' } // Change the icon for Tiny Homes
    ];

    return (
        <div className="pt-3 cursor-pointer pb-6 flex item-center space-x-12">
            {categories.map(({ label, value, icon }) => (
                <div 
                    key={value}
                    onClick={() => setCategory(value)}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
                        dataCategory === value ? 'border-gray-800 opacity-100' : 'border-white opacity-60'
                    } hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src={icon}
                        alt={`Category - ${label}`}
                        width={20}
                        height={20}
                    />
                    <span className='text-xs'>{label}</span>
                </div>
            ))}
        </div>
    );
}

export default Categories;
