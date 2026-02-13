const FormField = (props) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-base-content mb-2">
        {props.label}
      </h2>

      {props.type === "textarea" ? (
        <textarea
          name={props.name}
          value={props.inputValue}
          onChange={props.onChange}
          className="textarea textarea-bordered w-full min-h-[300px]"
          placeholder={props.placeholder}
          required={props.required}
        />
      ) : (
        <input
          type={props.type}
          name={props.name}
          value={props.inputValue}
          onChange={props.onChange}
          className="input input-bordered w-full"
          placeholder={props.placeholder}
          required={props.required}
        />
      )}
    </div>
  );
};

export default FormField;
