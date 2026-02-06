

const parseTags = (tags) => {
    if(tags == undefined){
        return [];
    }
    else if(Array.isArray(tags)){
        return tags;
    }
    else {
        return [tags]
    }
}

module.exports = {
    parseTags,
}