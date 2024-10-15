import React from 'react'
import { ThreeDots } from 'react-loader-spinner';
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div>
      <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#000dff96"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass={css.loader}
      />
    </div>
  )
}

export default Loader