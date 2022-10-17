module.exports = function (a1, a2) {
if(!a1) {
        return a2
    }
    if(!a2) {
        return a1
    }
    return a1.filter(i => !a2.includes(i))
        .concat(a2.filter(i => !a1.includes(i)))
}
