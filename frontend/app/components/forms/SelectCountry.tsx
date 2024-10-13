'use client';

import Select from 'react-select';
import useCountries from '@/app/hooks/useCountries';
import Flag from "react-world-flags";


export type SelectCountryValue = {
    label: string;
    value: string;
    latlng: number[];
}

interface SelectCountryProps {
    value?: SelectCountryValue;
    onChange: (value: SelectCountryValue) => void;
}

const SelectCountry: React.FC<SelectCountryProps> = ({
    value,
    onChange
}) => {
    const { getAll } = useCountries();

    return (
        <>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as SelectCountryValue)}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-3 ">
                        <Flag code={option.value} className="w-5" />
                        <div>
                            {option.label},
                            <span className="text-neutral-500 ml-1">{option.region}</span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => "p-3 border-2",
                    input: () => "text-lg",
                    option: () => "text-lg",
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: "black",
                        primary25: "#ffe4e6",
                    },
                })}
            />
        </>
    )
}

export default SelectCountry;