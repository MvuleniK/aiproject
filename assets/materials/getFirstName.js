const getFirstName = (name) => {
    if (name != null) {
        const words = name.split(" ");
        const firstname = words[0]
        return firstname
    }
}

export default getFirstName