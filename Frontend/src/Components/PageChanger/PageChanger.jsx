import PropTypes from "prop-types";
import { useEffect } from "react";
// we have covered every page by this component as this components gives a simple page change animation and also it scrolls to top of every new page

export const PageChanger = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="animate-wiggle">{children}</div>;
};

PageChanger.propTypes = {
  children: PropTypes.any,
};
