import Icon from "../../Icon";

const styles = {
  brand: {
    rootButton:
      "group-focus-within:bg-dm-interactive-soft/20 group-hover:bg-dm-interactive-soft/20 focus-within:bg-dm-interactive-soft/20 hover:bg-dm-interactive-soft/20 dark:group-focus-within:bg-dm-interactive/30 dark:group-hover:bg-dm-interactive/30 dark:focus-within:bg-dm-interactive/30 dark:hover:bg-dm-interactive/30",
    nestedButton:
      "group-focus-within/nested:bg-dm-interactive-soft/20 group-hover/nested:bg-dm-interactive-soft/20 focus-within:bg-dm-interactive-soft/20 hover:bg-dm-interactive-soft/20 dark:group-focus-within/nested:bg-dm-interactive/30 dark:group-hover/nested:bg-dm-interactive/30 dark:focus-within:bg-dm-interactive/30 dark:hover:bg-dm-interactive/30",
  },
};

const SubMenu = ({ label, children, bgColor = "brand", nested = false }) => {
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

        <Icon name="chevronDown" className={`size-5 text-dm-interactive transition-transform dark:text-dm-interactive-soft ${arrowClass}`} />
      </button>

      <ul className={`absolute hidden w-max max-w-[24rem] rounded-md bg-dm-surface-light bg-clip-content shadow-md dark:bg-dm-surface-dark ${submenuClass}`}>{children}</ul>
    </li>
  );
};

export default SubMenu;
