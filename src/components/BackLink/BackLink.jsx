import { Link } from "react-router-dom";

const BackLink = ({ to }) => {
  return <Link to={to}>Go back</Link>;
};

export default BackLink;