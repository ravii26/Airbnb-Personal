'use client';

interface MenuLinkProps {
    label: string;
    onClick: () => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({
    label,
    onClick
}) => {
    return (
        <div 
            onClick={onClick}
            className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition font-bold"
        >
            {label}
        </div>
    )
}

export default MenuLink;