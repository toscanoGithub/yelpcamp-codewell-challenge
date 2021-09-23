import React from "react";
import { useField, ErrorMessage } from "formik";
import { makeStyles, Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    padding: 20,
    border: "none",
    backgroundColor: "#F7F7F7",
    outline: "none",
  },

  label: {
    width: "100%",
    margin: "2px auto",
  },

  errorMessage: {
    color: "#DE404F",
    width: "100%",
    margin: "5px auto 15px auto",
    fontSize: "0.7rem",
    textAlign: "left",
  },
}));
const TextInput = ({ label, ...props }) => {
  const classes = useStyles();
  const [field, meta] = useField(props);

  return (
    <div className={classes.textInput}>
      <div className={classes.inputErrorWrapper}>
        <label className={classes.label} htmlFor={label}>
          <Typography variant="subtitle2">{label}</Typography>
        </label>
        {props.mode === "textarea" ? (
          <textarea
            className={classes.input}
            value={props.value}
            {...field}
            {...props}
            placeholder={`${props.emoji} ${props.placeholder}`}
            autoComplete="off"
            rows={4}
          />
        ) : (
          <input
            className={classes.input}
            value={props.value}
            {...field}
            {...props}
            placeholder={`${props.emoji} ${props.placeholder}`}
            autoComplete="off"
          />
        )}

        <div className={classes.errorMessage}>
          <ErrorMessage name={field.name} />
        </div>
      </div>
    </div>
  );
};

export default TextInput;
