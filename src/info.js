export const endpoint = '../backend/requests.php'

export const specifics = {
    DVD: { 
        attributes: { size: "" },
        description: "Please, provide size",
        valueType: "MB"
    },
    Book: { 
        attributes: { weight: "" },
        description: "Please, provide weight",
        valueType: "KG"
    },
    Furniture: {
        attributes: { 
            height: "",
            width: "",
            length: ""
        },
        description: "Please, provide dimensions",
        valueType: "CM" 
    }
}
