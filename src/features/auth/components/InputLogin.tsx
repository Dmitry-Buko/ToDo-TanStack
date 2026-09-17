import type { InputHTMLAttributes } from "react";

const InputLogin = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input className="form-group__input" {...props} />;
};

export default InputLogin;
