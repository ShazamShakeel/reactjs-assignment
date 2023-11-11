import PropTypes from "prop-types";
import AsideTopContainer from "./AsideTopContainer";
import AsideBottomContainer from "./AsideBottomContainer";

function AsideContent({ topComponent, bottomComponent }) {
  return (
    <div className="h-100 d-flex flex-column justify-content-between">
      <AsideTopContainer component={topComponent} />
      <AsideBottomContainer component={bottomComponent} />
    </div>
  );
}

AsideContent.propTypes = {
  bottomComponent: PropTypes.any,
  topComponent: PropTypes.any,
};

export default AsideContent;
