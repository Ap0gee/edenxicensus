const TButton = {
    baseClass: 'text-white border border-accent-darker block rounded inline-flex items-center justify-center focus:border-accent-darker focus:outline-none',
    defaultClass: 'bg-accent-darker border-accent-darker hover:bg-accent hover:border-accent',
    disabledClass: 'cursor-not-allowed opacity-75',
    defaultSizeClass: 'px-6 py-3 text-md',
    largeSizeClass: 'px-8 py-4 text-lg',
    smallSizeClass: 'px-6 py-3 text-md',
};

const TDropdown = {
    baseClass: 'text-white bg-0',
    dropdownClass: 'w-64 t-dropdown-links-container rounded border border-3 shadow-md py-2 z-10',
    disabledClass: '',
};

const Theme = {
    TButton,
    TDropdown,
};

export default Theme