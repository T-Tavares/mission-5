import {FaChevronRight} from 'react-icons/fa6';

export default function BreadCrumbs() {
    return (
        <div className="flex  w-[12rem] pt-4">
            <p className="flex text-primary">
                Home{' '}
                <span className="pt-1 px-1">
                    <FaChevronRight />
                </span>{' '}
                Find station{' '}
                <span className="pt-1 px-1">
                    <FaChevronRight />
                </span>
            </p>
        </div>
    );
}
