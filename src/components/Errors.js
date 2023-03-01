export function MissingValueError() {
    return (
        <p className="error">Please, submit required data</p>
    );
}

export function InvalidDataError() {
    return (
        <p className="error">Please, provide the data of indicated type</p>
    );
}
