import PropTypes from "prop-types";

const NonAuthLayout = ({ children }) => {
  return <div>{children}</div>;
};

NonAuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NonAuthLayout;
