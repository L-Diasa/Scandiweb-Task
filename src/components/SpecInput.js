import { InvalidDataError, MissingValueError } from "./Errors";

export default function SpecInput({ 
    attribute, value, valueType, handleSpecsChange, 
    missingError, invalidError }) {
    return (
        <>
            <label htmlFor={attribute}>
                {attribute.charAt(0).toUpperCase() + attribute.slice(1)} {" "} ({valueType})
                <input 
                    type="number" 
                    onChange={handleSpecsChange}
                    name={attribute}
                    id={attribute}
                    value={value}
                    autoComplete="off"
                />
                {missingError && <MissingValueError />}
                {invalidError && <InvalidDataError />}
            </label>
        </>
    );
}
