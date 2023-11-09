import PropTypes from "prop-types";
import { Stack } from "react-bootstrap";
import AsideTopContainer from "./AsideTopContainer";
import AsideBottomContainer from "./AsideBottomContainer";

function AsideContent({ topComponent, bottomComponent }) {
  return (
    <Stack className="h-100 gap-3">
      <AsideTopContainer component={topComponent} />
      <AsideBottomContainer component={bottomComponent} />
    </Stack>
  );
}

AsideContent.propTypes = {
  bottomComponent: PropTypes.any,
  topComponent: PropTypes.any,
};

export default AsideContent;
