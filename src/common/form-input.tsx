import { FormEvent, useState } from "react";

interface IFormInputProps {
	type?: string;
	name: string;
	value: string;
	required: boolean;
	label: string;
	options?: IOptionsProps[];
	pattern?: string;
	validationMessage?: string;
}

interface IOptionsProps {
	value: string;
	label: string;
}

export default function FormInput({
	type,
	name,
	value,
	required,
	label,
	options,
	pattern,
	validationMessage,
}: IFormInputProps) {
	const [error, setError] = useState("");

	if (options && type) throw new Error("Cannot use both options and type");

	const handleValidity = (
		e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const input = e.target as
			| HTMLInputElement
			| HTMLTextAreaElement
			| HTMLSelectElement;

		console.log(input.validationMessage, e.type);
		setError(input.validationMessage ? (validationMessage ?? "") : "");

		// if (e.type === "change" && error === "") {
		//   return;
		// } else {
		//   setError(input.validationMessage);
		// }
	};

	const InputComponent = options ? "select" : "input";

	return (
		<label>
			<span>{label}</span>
			<InputComponent
				type={type} // 'type' is ignored for <select>
				name={name}
				defaultValue={value}
				required={required}
				onChange={handleValidity}
				onInvalid={handleValidity}
				pattern={pattern}
				placeholder={!options ? `Please Enter your ${label}` : undefined}
			>
				{options &&
					options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
			</InputComponent>
			{error && <span className="error-message">{error}</span>}
		</label>
	);
}
