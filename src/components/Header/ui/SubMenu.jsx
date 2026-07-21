import Icon from "../../Icon";

const styles = {
  gray: {
    rootButton:
      "group-focus-within:bg-gray-200 group-hover:bg-gray-200 focus-within:bg-gray-200 hover:bg-gray-200 dark:group-focus-within:bg-slate-700 dark:group-hover:bg-slate-700 dark:focus-within:bg-slate-700 dark:hover:bg-slate-700",
    nestedButton:
      "group-focus-within/nested:bg-gray-200 group-hover/nested:bg-gray-200 focus-within:bg-gray-200 hover:bg-gray-200 dark:group-focus-within/nested:bg-slate-700 dark:group-hover/nested:bg-slate-700 dark:focus-within:bg-slate-700 dark:hover:bg-slate-700",
  },
};

const SubMenu = ({ label, children, bgColor = "gray", nested = false }) => {
  const buttonColorClass = nested ? styles[bgColor]?.nestedButton : styles[bgColor]?.rootButton;

  const arrowClass = nested ? "group-focus-within/nested:rotate-180" : "group-focus-within:rotate-180";

  const submenuClass = nested ? "left-full top-0 group-focus-within/nested:block" : "left-0 top-full pt-3 group-focus-within:block";

  return (
    <li className={`${nested ? "group/nested" : "group"} relative`}>
      <button
        type="button"
        aria-expanded
        className={`z-10 flex cursor-pointer items-center rounded-md px-3 py-1 transition-colors ${nested ? "w-full justify-between" : ""} ${buttonColorClass}`}>
        <p className="whitespace-nowrap">{label}</p>

        <Icon name="chevronDown" className={`size-5 text-[#316663] transition-transform dark:text-[#70b7b1] ${arrowClass}`} />
      </button>

      <ul className={`absolute hidden w-max max-w-[24rem] rounded-md bg-gray-100 bg-clip-content shadow-md dark:bg-slate-900 ${submenuClass}`}>{children}</ul>
    </li>
  );
};

export default SubMenu;
