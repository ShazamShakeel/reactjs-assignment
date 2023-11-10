import PropTypes from "prop-types";

function AsideTopContainer({ component }) {
  return (
    <div className="border rounded h-100" style={{ maxHeight: "42vh" }}>
      {component}
    </div>
  );
}

AsideTopContainer.propTypes = {
  component: PropTypes.any,
};

export default AsideTopContainer;
