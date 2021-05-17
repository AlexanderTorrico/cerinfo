import React from "react";

import { FormLabel } from '@material-ui/core';
import { Button } from '@material-ui/core';

export const MiLabel = (props) => {
  return (
    <div>
      <FormLabel {...props}></FormLabel>
    </div>
  );
};

export const MiBoton = (props) => {
  return (
    <div>
      <Button  variant="contained" color="primary" type="submit" {...props}></Button>
    </div>
  );
};

export const MiInput = (props) => {
  return (
    <>
      <input className="material-control tooltips-general" {...props}></input>
    </>
  );
};

export const MiSelect = (props) => {
  return (
    <>
      <select className="tooltips-general material-control" {...props}></select>
    </>
  );
};

export const MiColumnaSelect = (props) => {
  return (
    <>
      <div className="col-xs-12" {...props}></div>
    </>
  );
};
export const MiColumnaInput = (props) => {
  return (
    <>
      <div className="col-xs-12 col-sm-6" {...props}></div>
    </>
  );
};

export const MiGroup = (props) => {
  return (
    <>
      <div className="group-material" {...props}></div>
    </>
  );
};

export const MibarHigh = (props) => {
  return (
    <>
      <span className="highlight"></span>
      <span className="bar" {...props}></span>
    </>
  );
};
